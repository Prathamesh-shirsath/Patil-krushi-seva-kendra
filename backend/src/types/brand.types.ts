import { z } from "zod";
import { createBrandSchema } from "../validators/brand.validator";

export type CreateBrandInput =
    z.infer<typeof createBrandSchema>;