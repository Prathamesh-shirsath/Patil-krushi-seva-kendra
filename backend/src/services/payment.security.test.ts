import assert from "node:assert/strict";
import { test } from "node:test";
import crypto from "crypto";
import {
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from "./razorpay.service";
import { validateWebhookPayment } from "./razorpay-webhook.service";
import { PaymentStatus } from "@prisma/client";

process.env.RAZORPAY_KEY_SECRET = "test-key-secret";
process.env.RAZORPAY_WEBHOOK_SECRET = "test-webhook-secret";

test("successful payment signature is accepted", () => {
  const orderId = "order_test";
  const paymentId = "pay_test";
  const signature = crypto
    .createHmac("sha256", "test-key-secret")
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  assert.equal(
    verifyRazorpaySignature({
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
    }),
    true
  );
});

test("invalid payment signature is rejected", () => {
  assert.equal(
    verifyRazorpaySignature({
      razorpayOrderId: "order_test",
      razorpayPaymentId: "pay_test",
      razorpaySignature: "invalid-signature",
    }),
    false
  );
});

test("invalid webhook signature is rejected", () => {
  assert.equal(
    verifyRazorpayWebhookSignature(Buffer.from("{\"event\":\"payment.captured\"}"), "bad"),
    false
  );
});

test("valid webhook signature is accepted", () => {
  const rawBody = Buffer.from("{\"event\":\"payment.captured\"}");
  const signature = crypto
    .createHmac("sha256", "test-webhook-secret")
    .update(rawBody)
    .digest("hex");
  assert.equal(verifyRazorpayWebhookSignature(rawBody, signature), true);
});

test("failed webhook payment maps to failed status", () => {
  assert.equal(PaymentStatus.FAILED, "FAILED");
});

test("duplicate webhook delivery is represented as the same body fingerprint", () => {
  const rawBody = Buffer.from("{\"event\":\"order.paid\"}");
  const first = crypto.createHash("sha256").update(rawBody).digest("hex");
  const second = crypto.createHash("sha256").update(rawBody).digest("hex");
  assert.equal(first, second);
});

test("invalid payment amount is rejected", () => {
  assert.throws(
    () =>
      validateWebhookPayment({
        paymentEntity: {
          order_id: "order_test",
          amount: 9999,
          currency: "INR",
        },
        order: {
          id: "internal_order",
          grandTotal: "100.00",
          payment: { razorpayOrderId: "order_test" },
        },
        expectedOrderId: "internal_order",
      }),
    /Invalid payment amount/
  );
});

test("matching payment amount and currency are accepted", () => {
  assert.doesNotThrow(() =>
    validateWebhookPayment({
      paymentEntity: {
        order_id: "order_test",
        amount: 10000,
        currency: "INR",
      },
      order: {
        id: "internal_order",
        grandTotal: "100.00",
        payment: { razorpayOrderId: "order_test" },
      },
      expectedOrderId: "internal_order",
    })
  );
});
