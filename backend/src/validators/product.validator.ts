import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),

  slug: z.string().min(2),

  description: z.string(),

  categoryId: z.string(),

  brandId: z.string(),

  packSize: z.string(),

  price: z.number(),

  image: z.string().optional(),

  usedForCrops: z.array(z.string()),

  status: z.boolean().default(true),

  variants: z
    .array(
      z.object({
        packSize: z.string(),
        price: z.number(),
      })
    )
    .optional(),
});