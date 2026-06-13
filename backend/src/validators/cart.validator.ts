import { z } from "zod";

export const createCartItemSchema = z.object({
  userId: z.string(),

  productId: z.string(),

  quantity: z.number().int().positive(),
});