import { z } from "zod";
import { createOrderSchema } from "../validators/order.validator";

export type CreateOrderInput = z.infer<
  typeof createOrderSchema
>;