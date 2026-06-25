import { z } from "zod";

export const brandFormSchema = z.object({
    name: z
        .string()
        .min(2, "Brand name is required"),

    logo: z.string().optional(),

    description: z.string().optional(),

    status: z.boolean().default(true),
});

export type BrandFormValues =
    z.infer<typeof brandFormSchema>;