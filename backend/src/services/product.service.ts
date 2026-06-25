import { prisma } from "../lib/prisma";
import { CreateProductInput } from "../types/product.types";

export const createProduct = async (data: CreateProductInput) => {
  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,

      categoryId: data.categoryId,
      brandId: data.brandId,

      packSize: data.packSize,
      price: data.price,

      image: data.image,

      usedForCrops: data.usedForCrops,

      status: data.status,

      variants: data.variants?.length
        ? {
          create: data.variants.map((v) => ({
            packSize: v.packSize,
            price: v.price,
          })),
        }
        : undefined,
    },

    include: {
      category: true,
      brand: true,
      variants: true,
    },
  });
};

export const getAllProducts = async (
  page = 1,
  limit = 10,
  search?: string,
  brandId?: string,
  categoryId?: string
) => {
  return prisma.product.findMany({
    where: {
      status: true,

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
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),

      ...(brandId && {
        brandId,
      }),

      ...(categoryId && {
        categoryId,
      }),
    },

    include: {
      category: true,
      brand: true,
      variants: true,
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
      brand: true,
      variants: true,
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

    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,

      categoryId: data.categoryId,
      brandId: data.brandId,

      packSize: data.packSize,
      price: data.price,

      image: data.image,

      usedForCrops: data.usedForCrops,

      status: data.status,
    },

    include: {
      category: true,
      brand: true,
      variants: true,
    },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};