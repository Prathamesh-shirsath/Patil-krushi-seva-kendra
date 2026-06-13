import { prisma } from "../lib/prisma";
import { CreateCategoryInput } from "../types/category.types";

export const createCategory = async (
  data: CreateCategoryInput
) => {
  return prisma.category.create({
    data,
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      children: true,
      products: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      children: true,
      products: true,
    },
  });
};

export const updateCategory = async (
  id: string,
  data: CreateCategoryInput
) => {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};