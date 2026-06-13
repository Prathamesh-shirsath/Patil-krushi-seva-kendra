import { z } from "zod";
import { createProductSchema } from "../validators/product.validator";

export type CreateProductInput = z.infer<typeof createProductSchema>;