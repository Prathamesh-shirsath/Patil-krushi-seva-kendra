import { Request, Response } from "express";
import { StatisticPlacement } from "@prisma/client";
import { ZodError } from "zod";

import {
  createStatistic,
  deleteStatistic,
  getAllStatistics,
  getPublicStatistics,
  getStatisticById,
  updateStatistic,
} from "../services/statistic.service";
import {
  createStatisticSchema,
  updateStatisticSchema,
} from "../validators/statistic.validator";

function handleStatisticError(
  res: Response,
  error: unknown,
  message: string
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
  }

  return res.status(500).json({
    success: false,
    message,
  });
}

function getPlacementFromQuery(
  placementQuery: unknown
) {
  if (placementQuery === undefined) {
    return undefined;
  }

  if (
    typeof placementQuery !== "string" ||
    !Object.values(StatisticPlacement).includes(
      placementQuery as StatisticPlacement
    )
  ) {
    return null;
  }

  return placementQuery as StatisticPlacement;
}

export const createStatisticController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createStatisticSchema.parse(req.body);
    const statistic = await createStatistic(data);

    res.status(201).json({
      success: true,
      data: statistic,
    });
  } catch (error) {
    handleStatisticError(res, error, "Failed to create statistic");
  }
};

export const getAllStatisticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const statistics = await getAllStatistics();

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};

export const getPublicStatisticsController = async (
  req: Request,
  res: Response
) => {
  try {
    const placement = getPlacementFromQuery(req.query.placement);

    if (placement === null) {
      return res.status(400).json({
        success: false,
        message: "Invalid statistic placement",
      });
    }

    const statistics = await getPublicStatistics(placement);

    res.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch public statistics",
    });
  }
};

export const getStatisticByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const statistic = await getStatisticById(req.params.id as string);

    if (!statistic) {
      return res.status(404).json({
        success: false,
        message: "Statistic not found",
      });
    }

    res.json({
      success: true,
      data: statistic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistic",
    });
  }
};

export const updateStatisticController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = updateStatisticSchema.parse(req.body);
    const statistic = await updateStatistic(req.params.id as string, data);

    res.json({
      success: true,
      data: statistic,
    });
  } catch (error) {
    handleStatisticError(res, error, "Failed to update statistic");
  }
};

export const deleteStatisticController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteStatistic(req.params.id as string);

    res.json({
      success: true,
      message: "Statistic deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete statistic",
    });
  }
};
