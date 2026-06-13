import { prisma } from "../lib/prisma";

export const addToWishlist = async (
  userId: string,
  productId: string
) => {
  return prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
  });
};

export const getWishlist = async (userId: string) => {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },

    include: {
      product: true,
    },
  });
};

export const removeWishlistItem = async (id: string) => {
  return prisma.wishlist.delete({
    where: {
      id,
    },
  });
};