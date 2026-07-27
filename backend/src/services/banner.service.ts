import { BannerPlacement, BannerScopeType } from "@prisma/client";

import { prisma } from "../lib/prisma";
import {
  createBannerSchema,
  updateBannerSchema,
} from "../validators/banner.validator";
import { z } from "zod";

type CreateBannerInput = z.infer<typeof createBannerSchema>;
type UpdateBannerInput = z.infer<typeof updateBannerSchema>;

export class BannerReferenceError extends Error {}

export const validateBannerReferences = async (
  data: CreateBannerInput | UpdateBannerInput
) => {
  if (data.targetType === "PRODUCT" && data.targetSlug) {
    const product = await prisma.product.findUnique({
      where: { slug: data.targetSlug },
      select: { id: true },
    });

    if (!product) throw new BannerReferenceError("Target product not found");
  }

  if (data.targetType === "BRAND" && data.targetSlug) {
    const brand = await prisma.brand.findUnique({
      where: { slug: data.targetSlug },
      select: { id: true },
    });

    if (!brand) throw new BannerReferenceError("Target brand not found");
  }

  if (data.scopeType === "BRAND" && data.scopeSlug) {
    const brand = await prisma.brand.findUnique({
      where: { slug: data.scopeSlug },
      select: { id: true },
    });

    if (!brand) throw new BannerReferenceError("Display-scope brand not found");
  }
};

export const createBanner = async (
  data: CreateBannerInput
) => {
  return prisma.banner.create({
    data,
  });
};

export const getAllBanners = async () => {
  return prisma.banner.findMany({
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

export const getPublicBanners = async (
  placement: BannerPlacement = BannerPlacement.HOME_HERO,
  scopeSlug?: string
) => {
  const now = new Date();
  const scopeType = placement === BannerPlacement.CATEGORY_PAGE
    ? BannerScopeType.CATEGORY
    : placement === BannerPlacement.BRAND_PAGE
      ? BannerScopeType.BRAND
      : BannerScopeType.GLOBAL;

  return prisma.banner.findMany({
    where: {
      status: true,
      placement,
      scopeType,
      ...(scopeSlug ? { scopeSlug } : { scopeSlug: null }),
      AND: [
        {
          OR: [
            {
              startsAt: null,
            },
            {
              startsAt: {
                lte: now,
              },
            },
          ],
        },
        {
          OR: [
            {
              endsAt: null,
            },
            {
              endsAt: {
                gte: now,
              },
            },
          ],
        },
      ],
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

export const getBannerById = async (
  id: string
) => {
  return prisma.banner.findUnique({
    where: {
      id,
    },
  });
};

export const updateBanner = async (
  id: string,
  data: UpdateBannerInput
) => {
  return prisma.banner.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteBanner = async (
  id: string
) => {
  return prisma.banner.delete({
    where: {
      id,
    },
  });
};
