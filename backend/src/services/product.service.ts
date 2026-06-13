import { prisma } from "../lib/prisma";
import { CreateProductInput } from "../types/product.types";

export const createProduct = async (data: CreateProductInput) => {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });

  return product;
};

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search?: string,
  brand?: string,
  categoryId?: string
) => {
  return prisma.product.findMany({
    where: {
      isActive: true,

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),

      ...(brand && {
        brand,
      }),

      ...(categoryId && {
        categoryId,
      }),
    },

    include: {
      category: true,
    },

    skip: (page - 1) * limit,

    take: limit,

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
      reviews: true,
    },
  });
};





export const updateProduct = async (
  id: string,
  data: CreateProductInput
) => {
  return prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};