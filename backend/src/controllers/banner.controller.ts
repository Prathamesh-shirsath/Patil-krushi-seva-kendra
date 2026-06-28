import { Request, Response } from "express";
import { BannerPlacement } from "@prisma/client";
import { ZodError } from "zod";

import {
  createBanner,
  deleteBanner,
  getAllBanners,
  getBannerById,
  getPublicBanners,
  updateBanner,
} from "../services/banner.service";
import {
  createBannerSchema,
  updateBannerSchema,
} from "../validators/banner.validator";

function handleBannerError(
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

export const createBannerController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createBannerSchema.parse(req.body);
    const banner = await createBanner(data);

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    handleBannerError(res, error, "Failed to create banner");
  }
};

export const getAllBannersController = async (
  req: Request,
  res: Response
) => {
  try {
    const banners = await getAllBanners();

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
};

export const getPublicBannersController = async (
  req: Request,
  res: Response
) => {
  try {
    const placementQuery = req.query.placement;
    const placement =
      typeof placementQuery === "string"
        ? placementQuery
        : BannerPlacement.HOME_HERO;

    if (!Object.values(BannerPlacement).includes(placement as BannerPlacement)) {
      return res.status(400).json({
        success: false,
        message: "Invalid banner placement",
      });
    }

    const banners = await getPublicBanners(placement as BannerPlacement);

    res.json({
      success: true,
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch public banners",
    });
  }
};

export const getBannerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const banner = await getBannerById(req.params.id as string);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch banner",
    });
  }
};

export const updateBannerController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = updateBannerSchema.parse(req.body);
    const banner = await updateBanner(req.params.id as string, data);

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    handleBannerError(res, error, "Failed to update banner");
  }
};

export const deleteBannerController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteBanner(req.params.id as string);

    res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};
