import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string(),

  totalAmount: z.number().positive(),

  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })
  ),
});