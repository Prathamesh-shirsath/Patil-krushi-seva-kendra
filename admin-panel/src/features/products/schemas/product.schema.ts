import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),

  brand: z.string().min(1, "Brand is required"),

  categoryId: z.string().min(1, "Category is required"),

  image: z.string().min(1, "Main image is required"),

  images: z.array(z.string()).optional(),

  price: z.coerce.number().positive(),

  discountedPrice: z.coerce.number().optional(),

  description: z.string().min(10),

  uses: z.string().min(3),

  features: z.string().optional(),

  cropRecommendation: z.string().optional(),

  stock: z.coerce.number().min(0),

  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;