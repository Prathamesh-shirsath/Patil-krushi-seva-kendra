import { Request, Response } from "express";


import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../services/product.service";



export const createProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
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

    const search = req.query.search as string | undefined;

    const brand = req.query.brand as string | undefined;

    const categoryId = req.query.categoryId as string | undefined;

    const products = await getAllProducts(
      page,
      limit,
      search,
      brand,
      categoryId
    );

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
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
    const product = await getProductBySlug(req.params.slug as string);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
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
    const product = await updateProduct(
      req.params.id as string,
      req.body
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteProduct(req.params.id as string);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};