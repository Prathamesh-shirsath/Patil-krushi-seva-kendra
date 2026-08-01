import { z } from "zod";

export const createCartItemSchema = z.object({
  userId: z.string().min(1, "User ID is required"),

  productId: z.string().min(1, "Product ID is required"),

  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1"),
});

export const updateCartItemSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1"),
});