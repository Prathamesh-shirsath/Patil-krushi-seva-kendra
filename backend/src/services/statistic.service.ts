import { StatisticPlacement } from "@prisma/client";
import { z } from "zod";

import { prisma } from "../lib/prisma";
import {
  createStatisticSchema,
  updateStatisticSchema,
} from "../validators/statistic.validator";

type CreateStatisticInput = z.infer<typeof createStatisticSchema>;
type UpdateStatisticInput = z.infer<typeof updateStatisticSchema>;

export const createStatistic = async (
  data: CreateStatisticInput
) => {
  return prisma.statistic.create({
    data,
  });
};

export const getAllStatistics = async () => {
  return prisma.statistic.findMany({
    orderBy: [
      {
        displayOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

export const getPublicStatistics = async (
  placement?: StatisticPlacement
) => {
  return prisma.statistic.findMany({
    where: {
      status: true,
      ...(placement ? { placement } : {}),
    },
    orderBy: [
      {
        displayOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
};

export const getStatisticById = async (
  id: string
) => {
  return prisma.statistic.findUnique({
    where: {
      id,
    },
  });
};

export const updateStatistic = async (
  id: string,
  data: UpdateStatisticInput
) => {
  return prisma.statistic.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteStatistic = async (
  id: string
) => {
  return prisma.statistic.delete({
    where: {
      id,
    },
  });
};
