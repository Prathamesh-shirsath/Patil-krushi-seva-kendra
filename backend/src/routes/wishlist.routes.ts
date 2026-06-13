import { Router } from "express";
import {
  addToWishlistController,
  getWishlistController,
  removeWishlistItemController,
} from "../controllers/wishlist.controller";

const router = Router();

router.post("/", addToWishlistController);

router.get("/:userId", getWishlistController);

router.delete("/:id", removeWishlistItemController);

export default router;