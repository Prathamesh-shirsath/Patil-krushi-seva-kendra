import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  getProductBySlugController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

import { upload } from "../middleware/upload.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all products
router.get("/", getAllProductsController);

// Get product by slug
router.get("/:slug", getProductBySlugController);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create product
router.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  createProductController
);

// Update product
router.put(
  "/:id",
  adminMiddleware,
  upload.single("image"),
  updateProductController
);

// Delete product
router.delete(
  "/:id",
  adminMiddleware,
  deleteProductController
);

export default router;