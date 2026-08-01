import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeCartItemController,
  clearCartController,
  getCartCountController,
} from "../controllers/cart.controller";

const router = Router();

router.use(authenticate);

router.post("/", addToCartController);
router.get("/", getCartController);
router.get("/count", getCartCountController);
router.patch("/:itemId", updateCartItemController);
router.delete("/:itemId", removeCartItemController);
router.delete("/", clearCartController);

export default router;