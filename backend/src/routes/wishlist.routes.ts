import { Router } from "express";

import * as wishlistController from "../controllers/wishlist.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Get user's wishlist
router.get(
  "/",
  authenticate,
  wishlistController.getWishlist
);

// Check if product is in wishlist
router.get(
  "/:productId",
  authenticate,
  wishlistController.checkWishlist
);

// Add product to wishlist
router.post(
  "/:productId",
  authenticate,
  wishlistController.addToWishlist
);

// Remove product from wishlist
router.delete(
  "/:productId",
  authenticate,
  wishlistController.removeFromWishlist
);

export default router;