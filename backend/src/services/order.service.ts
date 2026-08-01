import { prisma } from "../lib/prisma";
import { CreateOrderInput } from "../types/order.types";

export const createOrder = async (data: CreateOrderInput) => {
  // Fetch all ordered products
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: data.items.map((item) => item.productId),
      },
    },
  });

  return prisma.order.create({
    data: {
      userId: data.userId,

      totalAmount: data.totalAmount,
      subTotal: data.totalAmount,
      grandTotal: data.totalAmount,
      deliveryCharge: 0,
      discount: 0,

      items: {
        create: data.items.map((item) => {
          const product = products.find(
            (p) => p.id === item.productId
          );

          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }

          return {
            quantity: item.quantity,

            price: product.price,

            productName: product.name,

            product: {
              connect: {
                id: product.id,
              },
            },
          };
        }),
      },
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
      user: true,
      address: true,
    },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
      user: true,
      address: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
      user: true,
      address: true,
    },
  });
};