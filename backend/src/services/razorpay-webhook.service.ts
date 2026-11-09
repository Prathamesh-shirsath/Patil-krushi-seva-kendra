import { OrderStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { clearCart } from "./cart.service";

const amountInPaise = (amount: unknown) =>
  Math.round(Number(amount) * 100);

export const validateWebhookPayment = ({
  paymentEntity,
  order,
  expectedOrderId,
}: {
  paymentEntity: any;
  order: { id: string; grandTotal: any; payment: any };
  expectedOrderId?: string;
}) => {
  const razorpayOrderId = String(paymentEntity.order_id || "");
  if (!razorpayOrderId || order.payment?.razorpayOrderId !== razorpayOrderId) {
    throw new Error("Razorpay order ID does not match the internal order.");
  }
  if (expectedOrderId && expectedOrderId !== order.id) {
    throw new Error("Razorpay payment does not match the internal order.");
  }
  if (String(paymentEntity.currency || "") !== "INR") {
    throw new Error("Invalid payment currency.");
  }
  const expectedAmount = amountInPaise(order.grandTotal);
  if (!Number.isInteger(paymentEntity.amount) || paymentEntity.amount !== expectedAmount) {
    throw new Error("Invalid payment amount.");
  }
};

export const processRazorpayWebhook = async (payload: any, deliveryId?: string) => {
  const eventId = deliveryId || String(payload?.event_id || payload?.payload?.payment?.entity?.id || "");
  const eventType = String(payload?.event || "");
  if (!eventId || !eventType) {
    throw new Error("Webhook event ID and event type are required.");
  }

  try {
    await prisma.webhookEvent.create({
      data: { eventId, eventType },
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return { duplicate: true };
    }
    throw error;
  }

  try {
    let confirmedUserId: string | undefined;
    if (eventType === "payment.captured") {
      const paymentEntity = payload?.payload?.payment?.entity;
      const paymentId = String(paymentEntity?.id || "");
      const razorpayOrderId = String(paymentEntity?.order_id || "");
      const internalOrderId = String(paymentEntity?.notes?.orderId || "");
      if (!paymentId || !razorpayOrderId) throw new Error("Missing payment identifiers.");

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: {
            id: internalOrderId || undefined,
            payment: { razorpayOrderId },
          },
          include: { payment: true },
        });
        if (!order) throw new Error("Matching internal order not found.");
        validateWebhookPayment({ paymentEntity, order, expectedOrderId: internalOrderId || undefined });

        await tx.payment.update({
          where: { orderId: order.id },
          data: {
            razorpayOrderId,
            razorpayPaymentId: paymentId,
            transactionId: paymentId,
            status: PaymentStatus.SUCCESS,
            amount: order.grandTotal,
            failureReason: null,
          },
        });
        await tx.order.update({
          where: { id: order.id },
          data: { paymentStatus: PaymentStatus.SUCCESS, status: OrderStatus.CONFIRMED },
        });
        confirmedUserId = order.userId;
      });
    } else if (eventType === "payment.failed") {
      const paymentEntity = payload?.payload?.payment?.entity;
      const paymentId = String(paymentEntity?.id || "");
      const razorpayOrderId = String(paymentEntity?.order_id || "");
      const reason = String(paymentEntity?.error_description || "Payment failed");
      if (!paymentId || !razorpayOrderId) throw new Error("Missing payment identifiers.");

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: { payment: { razorpayOrderId } },
          include: { payment: true },
        });
        if (!order) throw new Error("Matching internal order not found.");
        if (order.paymentStatus !== PaymentStatus.SUCCESS) {
          await tx.payment.update({
            where: { orderId: order.id },
            data: { razorpayPaymentId: paymentId, transactionId: paymentId, status: PaymentStatus.FAILED, failureReason: reason },
          });
          await tx.order.update({
            where: { id: order.id },
            data: { paymentStatus: PaymentStatus.FAILED },
          });
        }
      });
    } else if (eventType === "order.paid") {
      const paymentEntity = payload?.payload?.payment?.entity;
      const orderEntity = payload?.payload?.order?.entity;
      const razorpayOrderId = String(orderEntity?.id || paymentEntity?.order_id || "");
      const internalOrderId = String(orderEntity?.notes?.orderId || paymentEntity?.notes?.orderId || "");
      if (!razorpayOrderId || !internalOrderId) throw new Error("Missing order identifiers.");

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.findFirst({
          where: { id: internalOrderId, payment: { razorpayOrderId } },
          include: { payment: true },
        });
        if (!order) throw new Error("Matching internal order not found.");
        if (String(orderEntity?.currency || paymentEntity?.currency || "") !== "INR") {
          throw new Error("Invalid payment currency.");
        }
        const amount = Number(orderEntity?.amount ?? paymentEntity?.amount);
        if (!Number.isInteger(amount) || amount !== amountInPaise(order.grandTotal)) {
          throw new Error("Invalid payment amount.");
        }
        const paymentId = String(paymentEntity?.id || "");
        await tx.payment.update({
          where: { orderId: order.id },
          data: {
            razorpayOrderId,
            razorpayPaymentId: paymentId || null,
            transactionId: paymentId || null,
            status: PaymentStatus.SUCCESS,
            amount: order.grandTotal,
            failureReason: null,
          },
        });
        await tx.order.update({
          where: { id: order.id },
          data: { paymentStatus: PaymentStatus.SUCCESS, status: OrderStatus.CONFIRMED },
        });
        confirmedUserId = order.userId;
      });
    } else {
      return { duplicate: false, ignored: true };
    }

    if (confirmedUserId) {
      await clearCart(confirmedUserId);
    }
    return { duplicate: false, processed: true };
  } catch (error) {
    await prisma.webhookEvent.delete({ where: { eventId } }).catch(() => undefined);
    throw error;
  }
};
