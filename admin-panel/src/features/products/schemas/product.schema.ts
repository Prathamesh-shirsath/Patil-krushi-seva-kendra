import { z } from "zod";


const variantSchema = z.object({

  packSize: z
    .string()
    .min(1, "Pack size is required"),


  price: z
    .number()
    .min(0, "Price cannot be negative"),


  stock: z
    .number()
    .min(0, "Stock cannot be negative"),


  status: z
    .boolean(),


});



export const productFormSchema = z.object({


  name: z
    .string()
    .min(2, "Product name required"),



  description: z
    .string()
    .min(10, "Description required"),



  categoryId: z
    .string()
    .min(1, "Category required"),



  brandId: z
    .string()
    .min(1, "Brand required"),



  packSize: z
    .string()
    .min(1, "Pack size required"),



  price: z
    .number()
    .min(0),



  stock: z
    .number()
    .min(0),



  image: z
    .any()
    .optional(),



  usedForCrops:

    z.array(
      z.string()
    )
      .default([]),



  status:

    z.boolean()
      .default(true),




  variants:

    z.array(
      variantSchema
    )
      .default([]),


});



export type ProductFormValues =
  z.infer<typeof productFormSchema>;