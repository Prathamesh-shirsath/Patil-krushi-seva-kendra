import { Router } from "express";
import {
  addToCartController,
  getCartController,
  removeCartItemController,
} from "../controllers/cart.controller";

const router = Router();

router.post("/", addToCartController);

router.get("/:userId", getCartController);

router.delete("/:id", removeCartItemController);

export default router;