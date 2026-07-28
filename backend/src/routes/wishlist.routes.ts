import { Router } from "express";
import * as wishlistController from "../controllers/wishlist.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authenticate, wishlistController.getWishlist);

router.post(
  "/:productId",
  authenticate,
  wishlistController.addToWishlist
);

router.delete(
  "/:productId",
  authenticate,
  wishlistController.removeFromWishlist
);

export default router;