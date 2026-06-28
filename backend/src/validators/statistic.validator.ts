import { z } from "zod";

const statisticPlacementSchema = z.enum([
  "HOME",
  "ABOUT",
  "FOOTER",
]);

const statisticBaseSchema = z.object({
  title: z.string().min(2),
  value: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  placement: statisticPlacementSchema,
  displayOrder: z.number().int().min(0),
  status: z.boolean(),
});

export const createStatisticSchema = statisticBaseSchema;

export const updateStatisticSchema = statisticBaseSchema.partial();
