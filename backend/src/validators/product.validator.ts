import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3),

  slug: z.string(),

  brand: z.string().min(2),

  image: z.string(),

  images: z.array(z.string()).optional(),

  price: z.number().positive(),

  discountedPrice: z.number().positive().optional(),

  description: z.string().min(10),

  uses: z.string().min(3),

  features: z.string().optional(),

  cropRecommendation: z.string().optional(),

  stock: z.number().int().nonnegative(),

  isActive: z.boolean().optional(),

  categoryId: z.string(),
});