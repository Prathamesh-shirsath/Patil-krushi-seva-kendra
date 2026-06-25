import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  getProductBySlugController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/",
  upload.single("image"),
  createProductController
);

router.get("/", getAllProductsController);

router.get("/:slug", getProductBySlugController);

router.put("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;