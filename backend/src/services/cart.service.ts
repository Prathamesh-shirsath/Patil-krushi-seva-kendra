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
      quantity: {
        increment: data.quantity,
      },
    },

    create: {
      cartId: cart.id,
      productId: data.productId,
      quantity: data.quantity,
    },
  });
};

export const getCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              brand: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      summary: {
        totalItems: 0,
        subTotal: 0,
        deliveryCharge: 0,
        discount: 0,
        grandTotal: 0,
      },
    };
  }

  const items = cart.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    createdAt: item.createdAt,
    product: {
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      image: item.product.image,
      price: Number(item.product.price),
      packSize: item.product.packSize,
      stock: item.product.stock,
      brand: {
        id: item.product.brand.id,
        name: item.product.brand.name,
      },
    },
  }));

  const subTotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const deliveryCharge = subTotal >= 499 ? 0 : 50;
  const discount = 0;

  return {
    items,
    summary: {
      totalItems,
      subTotal,
      deliveryCharge,
      discount,
      grandTotal: subTotal + deliveryCharge - discount,
    },
  };
};

export const updateCartItem = async (
  id: string,
  data: {
    quantity: number;
  }
) => {
  return prisma.cartItem.update({
    where: {
      id,
    },

    data: {
      quantity: data.quantity,
    },
  });
};

export const removeCartItem = async (
  id: string
) => {
  return prisma.cartItem.delete({
    where: {
      id,
    },
  });
};

export const clearCart = async (
  userId: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) return;

  return prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });
};

export const getCartCount = async (
  userId: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) return 0;

  const result = await prisma.cartItem.aggregate({
    where: {
      cartId: cart.id,
    },

    _sum: {
      quantity: true,
    },
  });

  return result._sum.quantity ?? 0;
};