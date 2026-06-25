import { z } from "zod";

export const createBrandSchema = z.object({
    name: z.string().min(2),

    slug: z.string(),

    logo: z.string().optional(),

    description: z.string().optional(),

    status: z.boolean().default(true),
});