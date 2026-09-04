import { prisma } from "../lib/prisma";

export const getAllAdminReviews = async () => {
  return prisma.review.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAdminReviewById = async (id: string) => {
  return prisma.review.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
        },
      },
    },
  });
};

export const updateAdminReview = async (
  id: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  return prisma.review.update({
    where: { id },
    data,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          slug: true,
          image: true,
        },
      },
    },
  });
};

export const deleteAdminReview = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  return prisma.review.delete({
    where: { id },
  });
};