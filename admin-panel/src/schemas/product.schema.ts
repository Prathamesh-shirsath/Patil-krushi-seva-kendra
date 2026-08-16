import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Variant Schema
|--------------------------------------------------------------------------
*/

const variantSchema = z.object({
    packSize: z
        .string()
        .min(1, "Pack size is required"),

    price: z
        .number({
            message: "Price is required",
        })
        .min(0, "Price cannot be negative"),

    /*
     * Optional because backend currently stores
     * only packSize and price for variants.
     */
    stock: z
        .number()
        .min(0, "Stock cannot be negative")
        .optional(),

    status: z
        .boolean()
        .optional(),
});

/*
|--------------------------------------------------------------------------
| Product Schema
|--------------------------------------------------------------------------
*/

export const productFormSchema = z.object({

    name: z
        .string()
        .trim()
        .min(2, "Product name is required"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters"),

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

    price: z
        .number({
            message: "Price is required",
        })
        .min(0, "Price cannot be negative"),

    stock: z
        .number({
            message: "Stock is required",
        })
        .min(0, "Stock cannot be negative"),

    image: z
        .any()
        .optional(),

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

export type ProductFormValues =
    z.infer<typeof productFormSchema>;