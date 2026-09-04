import { prisma } from "../lib/prisma";
import { CreateReviewInput } from "../types/review.types";

export const createReview = async (
  data: CreateReviewInput,
  userId: string
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: data.productId,
    },
  });

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: data.productId,
      },
    },
  });

  if (existingReview) {
    throw new Error("REVIEW_ALREADY_EXISTS");
  }

  return prisma.review.create({
    data: {
      userId,
      productId: data.productId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

export const getReviewsByProduct = async (
  productId: string
) => {
  return prisma.review.findMany({
    where: {
      productId,
    },

    select: {
      id: true,
      productId: true,
      rating: true,
      comment: true,
      createdAt: true,
      updatedAt: true,

      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateReview = async (
  id: string,
  userId: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  if (review.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return prisma.review.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteReview = async (
  id: string,
  userId: string
) => {
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  if (review.userId !== userId) {
    throw new Error("FORBIDDEN");
  }

  return prisma.review.delete({
    where: {
      id,
    },
  });
};