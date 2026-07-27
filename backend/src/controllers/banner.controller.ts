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
  validateBannerReferences,
  BannerReferenceError,
} from "../services/banner.service";
import {
  createBannerSchema,
  updateBannerSchema,
} from "../validators/banner.validator";
import { deleteImage, uploadImage } from "../services/upload.service";

type BannerUploadFiles = {
  image?: Express.Multer.File[];
  mobileImage?: Express.Multer.File[];
};

async function getBannerRequestData(req: Request) {
  const files = req.files as BannerUploadFiles | undefined;
  const data: Record<string, unknown> = {
    ...req.body,
  };
  const uploadedImageUrls: string[] = [];

  if (typeof data.status === "string") {
    data.status = data.status === "true";
  }

  if (typeof data.displayOrder === "string") {
    data.displayOrder = Number(data.displayOrder);
  }

  if (data.scopeSlug === "") {
    data.scopeSlug = null;
  }

  try {
    if (files?.image?.[0]) {
      const imageUrl = await uploadImage(files.image[0], "banners");
      data.image = imageUrl;
      uploadedImageUrls.push(imageUrl);
    }

    if (files?.mobileImage?.[0]) {
      const imageUrl = await uploadImage(files.mobileImage[0], "banners");
      data.mobileImage = imageUrl;
      uploadedImageUrls.push(imageUrl);
    }
  } catch (error) {
    await cleanupUploadedImages(uploadedImageUrls);
    throw error;
  }

  return { data, uploadedImageUrls };
}

async function cleanupUploadedImages(imageUrls: string[]) {
  await Promise.all(
    imageUrls.map(async (imageUrl) => {
      try {
        await deleteImage(imageUrl);
      } catch (error) {
        console.error("Failed to clean up newly uploaded banner image", error);
      }
    })
  );
}

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

  if (error instanceof BannerReferenceError) {
    return res.status(400).json({
      success: false,
      message: error.message,
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
  let uploadedImageUrls: string[] = [];

  try {
    const preparedRequest = await getBannerRequestData(req);
    uploadedImageUrls = preparedRequest.uploadedImageUrls;
    const data = createBannerSchema.parse(preparedRequest.data);
    await validateBannerReferences(data);
    const banner = await createBanner(data);

    res.status(201).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    await cleanupUploadedImages(uploadedImageUrls);
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

    const scopeSlugQuery = req.query.scopeSlug;
    const scopeSlug = typeof scopeSlugQuery === "string" ? scopeSlugQuery : undefined;
    const isScopedPlacement =
      placement === BannerPlacement.CATEGORY_PAGE ||
      placement === BannerPlacement.BRAND_PAGE;

    if (isScopedPlacement && !scopeSlug) {
      return res.status(400).json({
        success: false,
        message: "scopeSlug is required for scoped banner placements",
      });
    }

    if (!isScopedPlacement && scopeSlug) {
      return res.status(400).json({
        success: false,
        message: "scopeSlug is only valid for scoped banner placements",
      });
    }

    const banners = await getPublicBanners(
      placement as BannerPlacement,
      scopeSlug
    );

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
  let uploadedImageUrls: string[] = [];

  try {
    const existingBanner = await getBannerById(req.params.id as string);

    if (!existingBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const preparedRequest = await getBannerRequestData(req);
    uploadedImageUrls = preparedRequest.uploadedImageUrls;
    const data = updateBannerSchema.parse(preparedRequest.data);
    await validateBannerReferences(data);
    const banner = await updateBanner(req.params.id as string, data);

    const oldImagesToDelete = [
      typeof data.image === "string" && data.image !== existingBanner.image
        ? existingBanner.image
        : null,
      typeof data.mobileImage === "string" && data.mobileImage !== existingBanner.mobileImage
        ? existingBanner.mobileImage
        : null,
    ].filter((imageUrl): imageUrl is string => Boolean(imageUrl));

    await Promise.all(
      oldImagesToDelete.map(async (imageUrl) => {
        try {
          await deleteImage(imageUrl);
        } catch (error) {
          console.error("Failed to clean up replaced banner image", error);
        }
      })
    );

    res.json({
      success: true,
      data: banner,
    });
  } catch (error) {
    await cleanupUploadedImages(uploadedImageUrls);
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
