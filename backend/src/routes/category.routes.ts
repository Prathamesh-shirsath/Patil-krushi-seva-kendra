import { Router } from "express";

import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller";

import { upload } from "../middleware/upload.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Public
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);

// Admin only
router.post(
  "/",
  adminMiddleware,
  upload.single("image"),
  createCategoryController
);

router.put(
  "/:id",
  adminMiddleware,
  upload.single("image"),
  updateCategoryController
);

router.delete(
  "/:id",
  adminMiddleware,
  deleteCategoryController
);

export default router;