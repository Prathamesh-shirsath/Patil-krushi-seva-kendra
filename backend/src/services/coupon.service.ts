import { prisma } from "../lib/prisma";
import { CreateCouponInput } from "../types/coupon.types";

export const createCoupon = async (
  data: CreateCouponInput
) => {
  return prisma.coupon.create({
    data,
  });
};

export const getAllCoupons = async () => {
  return prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteCoupon = async (id: string) => {
  return prisma.coupon.delete({
    where: {
      id,
    },
  });
};