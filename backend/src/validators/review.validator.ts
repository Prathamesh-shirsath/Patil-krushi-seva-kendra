import { z } from "zod";

export const createReviewSchema = z.object({
  userId: z.string(),

  productId: z.string(),

  rating: z.number().int().min(1).max(5),

  comment: z.string().optional(),
});