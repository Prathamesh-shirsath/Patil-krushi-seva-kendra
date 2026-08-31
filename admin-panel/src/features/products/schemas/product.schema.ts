import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const numberField = (
  fieldName: string,
  minMessage: string
) =>
  z.coerce
    .number({
      message: `${fieldName} is required`,
    })
    .min(0, minMessage);


/*
|--------------------------------------------------------------------------
| Variant Schema
|--------------------------------------------------------------------------
*/

const variantSchema = z.object({

  packSize: z
    .string()
    .trim()
    .min(1, "Variant pack size is required"),

  price: z.coerce
    .number({
      message: "Variant price is required",
    })
    .min(
      0,
      "Variant price cannot be negative"
    ),

  /*
   * Currently optional because backend
   * variant model only saves packSize + price.
   */
  stock: z.coerce
    .number()
    .min(
      0,
      "Variant stock cannot be negative"
    )
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
    .min(
      2,
      "Product name is required"
    ),

  description: z
    .string()
    .trim()
    .min(
      10,
      "Description must be at least 10 characters"
    ),

  categoryId: z
    .string()
    .min(
      1,
      "Category is required"
    ),

  brandId: z
    .string()
    .min(
      1,
      "Brand is required"
    ),

  packSize: z
    .string()
    .trim()
    .min(
      1,
      "Pack size is required"
    ),

  price: numberField(
    "Price",
    "Price cannot be negative"
  ),

  stock: numberField(
    "Stock",
    "Stock cannot be negative"
  ),

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