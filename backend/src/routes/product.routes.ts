import { Router } from "express";

import {
  createProductController,
  getAllProductsController,
  getProductBySlugController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

import { upload } from "../middleware/upload.middleware";

// Uncomment when admin auth is ready
// import { authenticate } from "../middleware/auth.middleware";
// import { authorize } from "../middleware/authorize.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", getAllProductsController);

router.get("/:slug", getProductBySlugController);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Enable authenticate & authorize middleware when Admin Authentication
| is completed.
|
*/

router.post(
  "/",
  // authenticate,
  // authorize("ADMIN"),
  upload.single("image"),
  createProductController
);

router.put(
  "/:id",
  // authenticate,
  // authorize("ADMIN"),
  upload.single("image"),
  updateProductController
);

router.delete(
  "/:id",
  // authenticate,
  // authorize("ADMIN"),
  deleteProductController
);

export default router;