import { Request, Response } from "express";
import * as wishlistService from "../services/wishlist.service";

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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.params.productId as string;

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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.params.productId as string;

    await wishlistService.removeFromWishlist(
      userId,
      productId
    );

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};