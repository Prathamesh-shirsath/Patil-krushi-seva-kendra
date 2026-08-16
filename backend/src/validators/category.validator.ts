import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),

  image: z.string().optional(),

  parentId: z.string().nullable().optional(),

  // "true"/"false" string ला boolean मध्ये convert करेल
  status: z.preprocess(
    (value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return value;
    },
    z.boolean().default(true)
  ),
});

export const updateCategorySchema =
  createCategorySchema.partial();

export type CreateCategoryInput =
  z.infer<typeof createCategorySchema>;

export type UpdateCategoryInput =
  z.infer<typeof updateCategorySchema>;