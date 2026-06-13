import { prisma } from "../lib/prisma";
import { CreateReviewInput } from "../types/review.types";

export const createReview = async (
  data: CreateReviewInput
) => {
  return prisma.review.create({
    data,
  });
};

export const getReviewsByProduct = async (
  productId: string
) => {
  return prisma.review.findMany({
    where: {
      productId,
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteReview = async (id: string) => {
  return prisma.review.delete({
    where: {
      id,
    },
  });
};