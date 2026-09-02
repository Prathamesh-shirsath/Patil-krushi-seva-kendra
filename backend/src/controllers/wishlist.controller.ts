import { Request, Response } from "express";
import * as wishlistService from "../services/wishlist.service";

// ========================================
// GET USER WISHLIST
// ========================================
export const getWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;

    const wishlist = await wishlistService.getWishlist(userId);

    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error: any) {
    console.error("Get wishlist error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to get wishlist",
    });
  }
};

// ========================================
// ADD PRODUCT TO WISHLIST
// ========================================
export const addToWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.params.productId as string;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const wishlist = await wishlistService.addToWishlist(
      userId,
      productId
    );

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist.",
      data: wishlist,
    });
  } catch (error: any) {
    console.error("Add wishlist error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to add product to wishlist",
    });
  }
};

// ========================================
// REMOVE PRODUCT FROM WISHLIST
// ========================================
export const removeFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.params.productId as string;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    await wishlistService.removeFromWishlist(
      userId,
      productId
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
    });
  } catch (error: any) {
    console.error("Remove wishlist error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to remove product from wishlist",
    });
  }
};

// ========================================
// CHECK PRODUCT IN WISHLIST
// ========================================
export const checkWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.params.productId as string;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const isWishlisted =
      await wishlistService.checkWishlist(
        userId,
        productId
      );

    return res.status(200).json({
      success: true,
      isWishlisted,
    });
  } catch (error: any) {
    console.error("Check wishlist error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to check wishlist",
    });
  }
};