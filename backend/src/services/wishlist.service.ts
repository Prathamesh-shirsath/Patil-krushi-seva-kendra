import { prisma } from "../lib/prisma";

export const getWishlist = async (userId: string) => {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },
    include: {
      product: {
        include: {
          brand: true,
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const addToWishlist = async (
  userId: string,
  productId: string
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const exists = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (exists) {
    throw new Error("Product already exists in wishlist");
  }

  return prisma.wishlist.create({
    data: {
      userId,
      productId,
    },
    include: {
      product: {
        include: {
          brand: true,
          category: true,
        },
      },
    },
  });
};

export const removeFromWishlist = async (
  userId: string,
  productId: string
) => {
  const exists = await prisma.wishlist.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!exists) {
    throw new Error("Wishlist item not found");
  }

  await prisma.wishlist.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  return;
};