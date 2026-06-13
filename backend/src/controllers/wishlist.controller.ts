import { Request, Response } from "express";
import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../services/wishlist.service";

export const addToWishlistController = async (
  req: Request,
  res: Response
) => {
  try {
    const item = await addToWishlist(
      req.body.userId,
      req.body.productId
    );

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to add wishlist item",
    });
  }
};

export const getWishlistController = async (
  req: Request,
  res: Response
) => {
  try {
    const items = await getWishlist(req.params.userId as string);

    res.json({
      success: true,
      data: items,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
    });
  }
};

export const removeWishlistItemController = async (
  req: Request,
  res: Response
) => {
  try {
    await removeWishlistItem(req.params.id as string);

    res.json({
      success: true,
      message: "Wishlist item removed",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to remove wishlist item",
    });
  }
};