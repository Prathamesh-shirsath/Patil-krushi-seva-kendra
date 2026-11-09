import { Request, Response } from "express";
import crypto from "crypto";
import { verifyRazorpayWebhookSignature } from "../services/razorpay.service";
import { processRazorpayWebhook } from "../services/razorpay-webhook.service";

export const handleRazorpayWebhook = async (
  req: Request,
  res: Response
) => {
  const rawBody = Buffer.isBuffer(req.body)
    ? req.body
    : Buffer.from(JSON.stringify(req.body ?? {}));
  const signature = req.header("x-razorpay-signature");

  if (!verifyRazorpayWebhookSignature(rawBody, signature)) {
    return res.status(400).json({ success: false, message: "Invalid webhook signature." });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return res.status(400).json({ success: false, message: "Invalid JSON payload." });
  }

  try {
    const deliveryId = crypto.createHash("sha256").update(rawBody).digest("hex");
    const result = await processRazorpayWebhook(payload, deliveryId);
    return res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    console.error("Razorpay webhook processing error:", error?.message || error);
    return res.status(200).json({
      success: false,
      message: "Webhook received but could not be processed.",
    });
  }
};
