import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/category.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/", upload.single("image"), createCategoryController);

router.get("/", getAllCategoriesController);

router.get("/:id", getCategoryByIdController);

router.put("/:id", upload.single("image"), updateCategoryController);

router.delete("/:id", deleteCategoryController);

export default router;