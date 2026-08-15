import {
  OrderStatus,
} from "@prisma/client";

import { prisma } from "../lib/prisma";

const orderInclude = {
  user: {
    select: {
      id: true,
      name: true,
      phone: true,
      email: true,
    },
  },

  items: {
    include: {
      product: true,
    },
  },

  OrderAddress: true,

  payment: true,
} as const;

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
*/

export const createOrder = async (
  data: any
) => {
  const products =
    await prisma.product.findMany({
      where: {
        id: {
          in: data.items.map(
            (item: any) =>
              item.productId
          ),
        },
      },
    });

  return prisma.order.create({
    data: {
      userId: data.userId,

      totalAmount:
        data.totalAmount,

      subTotal:
        data.totalAmount,

      grandTotal:
        data.totalAmount,

      deliveryCharge: 0,

      discount: 0,

      paymentMethod:
        data.paymentMethod ??
        "RAZORPAY",

      items: {
        create: data.items.map(
          (item: any) => {
            const product =
              products.find(
                (p) =>
                  p.id ===
                  item.productId
              );

            if (!product) {
              throw new Error(
                `Product not found: ${item.productId}`
              );
            }

            return {
              quantity:
                item.quantity,

              price:
                product.price,

              productName:
                product.name,

              product: {
                connect: {
                  id: product.id,
                },
              },
            };
          }
        ),
      },
    },

    include: orderInclude,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ORDERS
|--------------------------------------------------------------------------
*/

export const getAllOrders =
  async () => {
    return prisma.order.findMany({
      include: orderInclude,

      orderBy: {
        createdAt: "desc",
      },
    });
  };

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
*/

export const getOrderById = async (
  id: string
) => {
  return prisma.order.findUnique({
    where: {
      id,
    },

    include: orderInclude,
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatus =
  async (
    id: string,
    status: OrderStatus
  ) => {
    /*
    |--------------------------------------------------------------------------
    | Check whether order exists
    |--------------------------------------------------------------------------
    */

    const existingOrder =
      await prisma.order.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          status: true,
        },
      });

    if (!existingOrder) {
      throw new Error(
        "Order not found"
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Validate status transition
    |--------------------------------------------------------------------------
    */

    const currentStatus =
      existingOrder.status;

    /*
    | Delivered / Cancelled orders
    | should not be changed again.
    */

    if (
      currentStatus ===
      OrderStatus.DELIVERED ||
      currentStatus ===
      OrderStatus.CANCELLED
    ) {
      throw new Error(
        `Order is already ${currentStatus} and cannot be changed`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Update status
    |--------------------------------------------------------------------------
    */

    return prisma.order.update({
      where: {
        id,
      },

      data: {
        status,
      },

      include: orderInclude,
    });
  };