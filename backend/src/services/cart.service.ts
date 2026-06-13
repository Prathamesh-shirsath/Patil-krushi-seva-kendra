import { prisma } from "../lib/prisma";
import { CreateCartItemInput } from "../types/cart.types";

export const addToCart = async (
  data: CreateCartItemInput
) => {
  let cart = await prisma.cart.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId: data.userId,
      },
    });
  }

  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: data.productId,
      },
    },

    update: {
      quantity: data.quantity,
    },

    create: {
      cartId: cart.id,
      productId: data.productId,
      quantity: data.quantity,
    },
  });
};

export const getCart = async (userId: string) => {
  return prisma.cart.findUnique({
    where: {
      userId,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const removeCartItem = async (id: string) => {
  return prisma.cartItem.delete({
    where: {
      id,
    },
  });
};