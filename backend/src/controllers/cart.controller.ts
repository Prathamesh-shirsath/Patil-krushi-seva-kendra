import { Request, Response } from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
} from "../services/cart.service";

export const addToCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const item = await addToCart(req.body);

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to add item",
    });
  }
};

export const getCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const cart = await getCart(req.params.userId as string);

    res.json({
      success: true,
      data: cart,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
    });
  }
};

export const removeCartItemController = async (
  req: Request,
  res: Response
) => {
  try {
    await removeCartItem(req.params.id as string);

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to remove item",
    });
  }
};