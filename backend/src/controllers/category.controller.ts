import { Request, Response } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

import { uploadImage } from "../services/upload.service";

import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator";

export const createCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    let imageUrl: string | undefined;

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const data = {
      ...req.body,
      image: imageUrl,
      parentId: req.body.parentId || null,
    };

    const validated = createCategorySchema.parse(data);

    const category = await createCategory(validated);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategories();

    return res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

export const updateCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const data: any = {
      ...req.body,
    };

    if (req.file) {
      data.image = await uploadImage(req.file);
    }

    if (data.parentId === "") {
      data.parentId = null;
    }

    const validated = updateCategorySchema.parse(data);

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const category = await updateCategory(
      id,
      validated
    );

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteCategory(id);

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};