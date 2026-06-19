import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2),

    categoryId: z.string(),

    brandId: z.string(),

    description: z.string(),

    usedForCrops: z.array(z.string()).optional(),

    packSize: z.string(),

    price: z.number(),

    image: z.string().optional(),

    status: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;