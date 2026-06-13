import { z } from "zod";

export const createCouponSchema = z.object({
  code: z.string(),

  type: z.enum(["PERCENTAGE", "FIXED"]),

  value: z.number().positive(),

  minOrderAmount: z.number().positive().optional(),

  expiresAt: z.string().optional(),

  isActive: z.boolean().optional(),
});