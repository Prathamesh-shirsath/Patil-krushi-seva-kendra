import { z } from "zod";
import { createCartItemSchema } from "../validators/cart.validator";

export type CreateCartItemInput = z.infer<
  typeof createCartItemSchema
>;