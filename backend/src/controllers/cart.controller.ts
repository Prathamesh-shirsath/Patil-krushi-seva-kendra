import { Request, Response } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartCount,
} from "../services/cart.service";

export const addToCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;

    const item = await addToCart({
      userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart.",
      data: item,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCartController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;

    const cart = await getCart(userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const item = await updateCartItem(
      String(req.params.itemId),
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully.",
      data: item,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItemController = async (
  req: Request,
  res: Response
) => {
  try {
    await removeCartItem(String(req.params.itemId));

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCartController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;

    await clearCart(userId);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCartCountController = async (
  _req: Request,
  res: Response
) => {
  try {
    const { userId } = res.locals.user;

    const count = await getCartCount(userId);

    return res.status(200).json({
      success: true,
      data: {
        count,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};