import { z } from "zod";
import { createCategorySchema } from "../validators/category.validator";

export type CreateCategoryInput = z.infer<
  typeof createCategorySchema
>;