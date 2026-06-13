import { z } from "zod";
import { createCouponSchema } from "../validators/coupon.validator";

export type CreateCouponInput = z.infer<
  typeof createCouponSchema
>;