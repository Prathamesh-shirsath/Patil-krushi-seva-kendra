import { z } from "zod";

export const productIdParamSchema = z.object({
    productId: z
        .string({
            required_error: "Product ID is required",
        })
        .cuid("Invalid Product ID"),
});

export type ProductIdParamInput = z.infer<
    typeof productIdParamSchema
>;