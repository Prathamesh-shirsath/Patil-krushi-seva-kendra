import { Request, Response } from "express";

import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../services/product.service";

import { uploadImage } from "../services/upload.service";

import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator";

export const createProductController = async (
  req: Request,
  res: Response
) => {
  try {
    let imageUrl: string | undefined = req.body.image;

    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const data: any = {
      ...req.body,
      image: imageUrl,
    };

    // Parse JSON strings coming from FormData
    if (typeof data.usedForCrops === "string") {
      try {
        data.usedForCrops = JSON.parse(data.usedForCrops);
      } catch {
        data.usedForCrops = [];
      }
    }

    if (typeof data.variants === "string") {
      try {
        data.variants = JSON.parse(data.variants);
      } catch {
        data.variants = [];
      }
    }

    const validatedData = createProductSchema.parse(data);

    const product = await createProduct(validatedData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

export const getAllProductsController = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const brandId =
      typeof req.query.brandId === "string"
        ? req.query.brandId
        : undefined;

    const categoryId =
      typeof req.query.categoryId === "string"
        ? req.query.categoryId
        : undefined;

    const result = await getAllProducts(
      page,
      limit,
      search,
      brandId,
      categoryId
    );

    return res.status(200).json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProductBySlugController = async (
  req: Request,
  res: Response
) => {
  try {
    const slug = Array.isArray(req.params.slug)
      ? req.params.slug[0]
      : req.params.slug;

    const product = await getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const updateProductController = async (
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

    // Parse JSON strings coming from FormData
    if (typeof data.usedForCrops === "string") {
      try {
        data.usedForCrops = JSON.parse(data.usedForCrops);
      } catch {
        data.usedForCrops = [];
      }
    }

    if (typeof data.variants === "string") {
      try {
        data.variants = JSON.parse(data.variants);
      } catch {
        data.variants = [];
      }
    }

    const validatedData = updateProductSchema.parse(data);

    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const product = await updateProduct(
      id,
      validatedData
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update product",
    });
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await deleteProduct(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};