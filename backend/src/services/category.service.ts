import fs from "fs";
import path from "path";
import { CreateCategoryInput } from "../types/category.types";

const filePath = path.join(__dirname, "../data/categories.json");

function readCategories(): any[] {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to read categories from file:", error);
    return [];
  }
}

function writeCategories(categories: any[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write categories to file:", error);
  }
}

export const createCategory = async (
  data: any
) => {
  const categories = readCategories();
  const newCategory = {
    id: data.id || Math.random().toString(36).substr(2, 9),
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    productsCount: data.productsCount || "0+",
    brandsCount: data.brandsCount || "0+",
    status: data.status === undefined ? true : data.status,
    image: data.image || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  categories.push(newCategory);
  writeCategories(categories);
  return newCategory;
};

export const getAllCategories = async () => {
  return readCategories();
};

export const getCategoryById = async (id: string) => {
  const categories = readCategories();
  return categories.find((c) => c.id === id || c.slug === id) || null;
};

export const updateCategory = async (
  id: string,
  data: any
) => {
  const categories = readCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error("Category not found");
  }

  const updatedCategory = {
    ...categories[index],
    ...data,
    updatedAt: new Date().toISOString()
  };

  categories[index] = updatedCategory;
  writeCategories(categories);
  return updatedCategory;
};

export const deleteCategory = async (id: string) => {
  const categories = readCategories();
  const filtered = categories.filter((c) => c.id !== id);
  writeCategories(filtered);
  return { id };
};