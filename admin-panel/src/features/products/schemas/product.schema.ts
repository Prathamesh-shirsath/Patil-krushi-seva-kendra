import { z } from "zod";

export const variantSchema = z.object({
  packSize: z
    .string()
    .min(1, "Pack size is required"),

  price: z.coerce
    .number()
    .positive("Variant price is required"),
});

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  categoryId: z
    .string()
    .min(1, "Category is required"),

  brandId: z
    .string()
    .min(1, "Brand is required"),

  packSize: z
    .string()
    .min(1, "Pack size is required"),

  price: z.coerce
    .number()
    .positive("Price is required"),

  stock: z.coerce
    .number()
    .min(0, "Stock cannot be negative"),

  image: z.any().optional(),

  usedForCrops: z
    .array(z.string())
    .default([]),

  status: z
    .boolean()
    .default(true),

  variants: z
    .array(variantSchema)
    .default([]),
});

export type ProductFormValues = z.infer<
  typeof productFormSchema
>;