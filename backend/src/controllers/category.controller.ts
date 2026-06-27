import { Request, Response } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";
import { uploadImage } from "../services/upload.service";

export const createCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    let imageUrl = req.body.image || "";

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const name = req.body.name;
    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const status = req.body.status === undefined ? true : (req.body.status === "true" || req.body.status === true);

    const category = await createCategory({
      name,
      slug,
      image: imageUrl,
      status,
      parentId: req.body.parentId || undefined,
    } as any);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  try {
    const categories = await getAllCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
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
    const category = await getCategoryById(req.params.id as string);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
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
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const name = req.body.name;
    const slug = req.body.slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined);
    
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (imageUrl !== undefined) updateData.image = imageUrl;
    if (req.body.status !== undefined) {
      updateData.status = req.body.status === "true" || req.body.status === true;
    }
    if (req.body.parentId !== undefined) {
      updateData.parentId = req.body.parentId || null;
    }

    const category = await updateCategory(
      req.params.id as string,
      updateData as any
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

export const deleteCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteCategory(req.params.id as string);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};