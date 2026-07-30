import { z } from "zod";

const variantSchema = z.object({
  packSize: z
    .string()
    .trim()
    .min(1, "Pack size is required"),

  price: z.coerce
    .number()
    .positive("Variant price must be greater than 0"),
});

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(200),

  description: z
    .string()
    .trim()
    .min(10, "Description is too short"),

  categoryId: z
    .string()
    .min(1, "Category is required"),

  brandId: z
    .string()
    .min(1, "Brand is required"),

  packSize: z
    .string()
    .trim()
    .min(1, "Pack size is required"),

  price: z.coerce
    .number()
    .positive("Price must be greater than 0"),

  stock: z.coerce
    .number()
    .min(0, "Stock cannot be negative")
    .default(0),

  image: z
    .string()
    .url()
    .optional()
    .nullable(),

  usedForCrops: z
    .array(z.string())
    .default([]),

  status: z.coerce
    .boolean()
    .default(true),

  variants: z
    .array(variantSchema)
    .optional(),
});

export const updateProductSchema =
  createProductSchema.partial();

export type CreateProductValidator =
  z.infer<typeof createProductSchema>;

export type UpdateProductValidator =
  z.infer<typeof updateProductSchema>;