import { prisma } from "../lib/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../validators/category.validator";

export const createCategory = async (
  data: CreateCategoryInput
) => {
  return prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      image: data.image,
      parentId: data.parentId ?? null,
      status: data.status ?? true,
    },
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCategoryById = async (
  id: string
) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
};

export const updateCategory = async (
  id: string,
  data: UpdateCategoryInput
) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      ...data,
      parentId:
        data.parentId === undefined
          ? undefined
          : data.parentId,
    },
    include: {
      parent: true,
      children: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
};

export const deleteCategory = async (
  id: string
) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};