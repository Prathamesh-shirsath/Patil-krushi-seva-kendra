import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  brand: z.string().min(2, "Brand is required"),
  categoryId: z.string().min(1, "Please select a category"),
  image: z.string().url("Enter a valid image URL"),
  images: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  discountedPrice: z.coerce.number().positive().optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
  uses: z.string().min(3, "Uses must be at least 3 characters"),
  features: z.string().optional(),
  cropRecommendation: z.string().optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
