import { prisma } from "../lib/prisma";
import { CreateOrderInput } from "../types/order.types";

export const createOrder = async (
  data: CreateOrderInput
) => {
  return prisma.order.create({
    data: {
      userId: data.userId,

      totalAmount: data.totalAmount,

      items: {
        create: data.items,
      },
    },

    include: {
      items: true,
    },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: true,
      payment: true,
      user: true,
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
      items: true,
      payment: true,
      user: true,
    },
  });
};