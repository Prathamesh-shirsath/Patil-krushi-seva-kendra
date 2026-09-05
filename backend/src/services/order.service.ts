import crypto from "crypto";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@prisma/client";
import { prisma } from "../lib/prisma";
import {
  createRazorpayOrder,
  verifyRazorpaySignature,
} from "./razorpay.service";
import { clearCart } from "./cart.service";

const orderInclude = {
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
    },
  },
  items: {
    include: {
      product: true,
    },
  },
  OrderAddress: true,
  payment: true,
} as const;

/*
|--------------------------------------------------------------------------
| CREATE ORDER (WITH RAZORPAY & ADDRESS SUPPORT)
|--------------------------------------------------------------------------
*/

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderAddressInput {
  fullName: string;
  phone: string;
  state: string;
  district: string;
  taluka?: string | null;
  village: string;
  city?: string | null;
  pincode: string;
  addressLine: string;
  landmark?: string | null;
}

export interface CreateOrderInput {
  userId: string;
  items: CreateOrderItemInput[];
  addressId?: string;
  address?: CreateOrderAddressInput;
  paymentMethod?: PaymentMethod;
}

export const createOrder = async (data: CreateOrderInput) => {
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    throw new Error("Order must contain at least one item.");
  }

  // 1. Fetch products from database to ensure authentic pricing
  const productIds = data.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products in your order are unavailable.");
  }

  // 2. Resolve Shipping Address
  let shippingAddress: CreateOrderAddressInput | null = null;

  if (data.addressId) {
    const savedAddress = await prisma.address.findUnique({
      where: { id: data.addressId },
    });
    if (savedAddress) {
      shippingAddress = {
        fullName: savedAddress.fullName,
        phone: savedAddress.phone,
        state: savedAddress.state,
        district: savedAddress.district,
        taluka: savedAddress.taluka,
        village: savedAddress.village,
        city: savedAddress.city,
        pincode: savedAddress.pincode,
        addressLine: savedAddress.addressLine,
        landmark: savedAddress.landmark,
      };
    }
  }

  if (!shippingAddress && data.address) {
    shippingAddress = data.address;
  }

  if (!shippingAddress) {
    throw new Error("Delivery address is required to place an order.");
  }

  // 3. Compute Totals
  let subTotal = 0;
  const orderItemsData = data.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const price = Number(product.price);
    subTotal += price * quantity;

    return {
      quantity,
      price: product.price,
      productName: product.name,
      product: {
        connect: { id: product.id },
      },
    };
  });

  // Free delivery for orders ₹499 and above, otherwise ₹50
  const deliveryCharge = subTotal >= 499 ? 0 : 50;
  const discount = 0;
  const grandTotal = subTotal + deliveryCharge - discount;
  const paymentMethod = data.paymentMethod ?? PaymentMethod.RAZORPAY;

  // 4. Create Order in Database
  const order = await prisma.order.create({
    data: {
      userId: data.userId,
      subTotal,
      deliveryCharge,
      discount,
      grandTotal,
      totalAmount: grandTotal,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      paymentMethod,
      items: {
        create: orderItemsData,
      },
      OrderAddress: {
        create: {
          id: crypto.randomUUID(),
          fullName: shippingAddress.fullName,
          phone: shippingAddress.phone,
          state: shippingAddress.state,
          district: shippingAddress.district,
          taluka: shippingAddress.taluka ?? null,
          village: shippingAddress.village,
          city: shippingAddress.city ?? null,
          pincode: shippingAddress.pincode,
          addressLine: shippingAddress.addressLine,
          landmark: shippingAddress.landmark ?? null,
        },
      },
      payment: {
        create: {
          amount: grandTotal,
          status: PaymentStatus.PENDING,
        },
      },
    },
    include: orderInclude,
  });

  // 5. Handle Payment Method Specific Workflow
  if (paymentMethod === PaymentMethod.RAZORPAY) {
    try {
      const razorpayOrder = await createRazorpayOrder({
        amountInRupees: grandTotal,
        receiptId: order.id,
        notes: {
          orderId: order.id,
          userId: order.userId,
        },
      });

      // Update payment record with razorpay order ID
      await prisma.payment.update({
        where: { orderId: order.id },
        data: {
          razorpayOrderId: razorpayOrder.id,
        },
      });

      return {
        order,
        razorpayOrder,
        keyId: process.env.RAZORPAY_KEY_ID,
      };
    } catch (error: any) {
      console.error("Razorpay order creation failed:", error);
      throw new Error(
        error?.message || "Failed to initialize Razorpay payment."
      );
    }
  }

  // If Cash on Delivery (COD), order is confirmed and cart cleared
  if (paymentMethod === PaymentMethod.COD) {
    await clearCart(data.userId);

    return {
      order,
      isCod: true,
    };
  }

  return { order };
};

/*
|--------------------------------------------------------------------------
| VERIFY RAZORPAY PAYMENT
|--------------------------------------------------------------------------
*/

export const verifyOrderPayment = async ({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) => {
  const isValid = verifyRazorpaySignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  if (!isValid) {
    await prisma.payment.updateMany({
      where: { orderId },
      data: {
        status: PaymentStatus.FAILED,
        failureReason: "Signature verification failed",
      },
    });

    throw new Error("Invalid Razorpay payment signature.");
  }

  // Update Payment record
  await prisma.payment.upsert({
    where: { orderId },
    update: {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      transactionId: razorpayPaymentId,
      status: PaymentStatus.SUCCESS,
    },
    create: {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      transactionId: razorpayPaymentId,
      amount: 0,
      status: PaymentStatus.SUCCESS,
    },
  });

  // Update Order to CONFIRMED & Payment SUCCESS
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: PaymentStatus.SUCCESS,
      status: OrderStatus.CONFIRMED,
    },
    include: orderInclude,
  });

  // Clear user's shopping cart
  if (updatedOrder.userId) {
    await clearCart(updatedOrder.userId);
  }

  return updatedOrder;
};

/*
|--------------------------------------------------------------------------
| CUSTOMER - GET USER'S ORDERS
|--------------------------------------------------------------------------
*/

export const getUserOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: orderInclude,
    orderBy: { createdAt: "desc" },
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ORDERS
|--------------------------------------------------------------------------
*/

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: orderInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
};

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
*/

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: orderInclude,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
) => {
  const existingOrder = await prisma.order.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
    },
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  const currentStatus = existingOrder.status;

  if (
    currentStatus === OrderStatus.DELIVERED ||
    currentStatus === OrderStatus.CANCELLED
  ) {
    throw new Error(`Order is already ${currentStatus} and cannot be changed`);
  }

  return prisma.order.update({
    where: { id },
    data: { status },
    include: orderInclude,
  });
};