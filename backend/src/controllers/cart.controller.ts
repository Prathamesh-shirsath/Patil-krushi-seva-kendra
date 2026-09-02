import { Request, Response } from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartCount,
} from "../services/cart.service";

// =====================================================
// ADD TO CART
// POST /api/cart
// =====================================================

export const addToCartController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const parsedQuantity = Number(quantity ?? 1);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be a valid number greater than 0.",
      });
    }

    const item = await addToCart({
      userId,
      productId: String(productId),
      quantity: parsedQuantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully.",
      data: item,
    });
  } catch (error: any) {
    console.error(
      "Add to cart error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to add item to cart.",
    });
  }
};

// =====================================================
// GET CART
// GET /api/cart
// =====================================================

export const getCartController = async (
  _req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const cart = await getCart(userId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    console.error(
      "Get cart error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to get cart.",
    });
  }
};

// =====================================================
// UPDATE CART ITEM
// PATCH /api/cart/:itemId
// =====================================================

export const updateCartItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const itemId = String(
      req.params.itemId
    );

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Cart item ID is required.",
      });
    }

    const { quantity } = req.body;

    const item = await updateCartItem(
      itemId,
      {
        quantity: Number(quantity),
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Cart updated successfully.",
      data: item,
    });
  } catch (error: any) {
    console.error(
      "Update cart error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to update cart.",
    });
  }
};

// =====================================================
// REMOVE CART ITEM
// DELETE /api/cart/:itemId
// =====================================================

export const removeCartItemController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const itemId = String(
      req.params.itemId
    );

    if (!itemId) {
      return res.status(400).json({
        success: false,
        message: "Cart item ID is required.",
      });
    }

    await removeCartItem(itemId);

    return res.status(200).json({
      success: true,
      message:
        "Item removed from cart successfully.",
    });
  } catch (error: any) {
    console.error(
      "Remove cart item error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to remove cart item.",
    });
  }
};

// =====================================================
// CLEAR CART
// DELETE /api/cart
// =====================================================

export const clearCartController = async (
  _req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    await clearCart(userId);

    return res.status(200).json({
      success: true,
      message:
        "Cart cleared successfully.",
    });
  } catch (error: any) {
    console.error(
      "Clear cart error:",
      error
    );

    return res.status(400).json({
      success: false,
      message:
        error?.message ||
        "Failed to clear cart.",
    });
  }
};

// =====================================================
// GET CART COUNT
// GET /api/cart/count
// =====================================================

export const getCartCountController = async (
  _req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    const count = await getCartCount(
      userId
    );

    return res.status(200).json({
      success: true,
      data: {
        count,
      },
    });
  } catch (error: any) {
    console.error(
      "Get cart count error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to get cart count.",
    });
  }
};