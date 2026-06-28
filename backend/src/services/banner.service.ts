import { BannerPlacement } from "@prisma/client";

import { prisma } from "../lib/prisma";
import {
  createBannerSchema,
  updateBannerSchema,
} from "../validators/banner.validator";
import { z } from "zod";

type CreateBannerInput = z.infer<typeof createBannerSchema>;
type UpdateBannerInput = z.infer<typeof updateBannerSchema>;

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
  placement: BannerPlacement = BannerPlacement.HOME_HERO
) => {
  const now = new Date();

  return prisma.banner.findMany({
    where: {
      status: true,
      placement,
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
