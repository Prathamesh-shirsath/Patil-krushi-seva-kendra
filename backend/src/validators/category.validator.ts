import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),

  slug: z.string(),

  image: z.string().optional(),

  status: z.preprocess((val) => val === "true" || val === true, z.boolean()).optional(),

  parentId: z.string().optional(),
});