import { z } from "zod";
import { createReviewSchema } from "../validators/review.validator";

export type CreateReviewInput = z.infer<
  typeof createReviewSchema
>;