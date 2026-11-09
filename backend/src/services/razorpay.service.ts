import crypto from "crypto";
import Razorpay from "razorpay";

export interface CreateRazorpayOrderOptions {
  amountInRupees: number;
  receiptId: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export const createRazorpayOrder = async ({
  amountInRupees,
  receiptId,
  notes = {},
}: CreateRazorpayOrderOptions): Promise<RazorpayOrderResponse> => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw Object.assign(
      new Error(
        "Razorpay credentials missing. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
      ),
      { statusCode: 500 }
    );
  }

  const amountInPaise = Math.round(amountInRupees * 100);
  if (!Number.isFinite(amountInPaise) || amountInPaise < 100) {
    throw Object.assign(
      new Error("Razorpay amount must be at least 100 paise."),
      { statusCode: 400 }
    );
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const data = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId.slice(0, 40),
      notes,
    });

    return data as RazorpayOrderResponse;
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);

    const description =
      error?.error?.description ||
      error?.message ||
      "Failed to create Razorpay order.";
    const statusCode =
      error?.statusCode === 401 ||
      /authentication failed/i.test(description)
        ? 401
        : error?.statusCode || 500;

    throw Object.assign(new Error(description), { statusCode });
  }
};

export const verifyRazorpaySignature = ({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}): boolean => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("RAZORPAY_KEY_SECRET is not configured.");
  }

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const providedBuffer = Buffer.from(razorpaySignature, "hex");

  return (
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer)
  );
};

export const verifyRazorpayWebhookSignature = (
  rawBody: Buffer,
  signature: string | undefined
): boolean => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret || !signature) return false;

  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const providedBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === providedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, providedBuffer)
  );
};

export interface FetchedRazorpayPayment {
  id: string;
  order_id?: string;
  amount: number;
  currency: string;
  status: string;
}

export const fetchRazorpayPayment = async (
  paymentId: string
): Promise<FetchedRazorpayPayment> => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw Object.assign(new Error("Razorpay credentials are not configured."), {
      statusCode: 500,
    });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return (await razorpay.payments.fetch(paymentId)) as FetchedRazorpayPayment;
};
