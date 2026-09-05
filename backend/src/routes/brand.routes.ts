import { Router } from "express";

import {
  createBrandController,
  getAllBrandsController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brand.controller";

import { upload } from "../middleware/upload.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Public
router.get("/", getAllBrandsController);

// Admin only
router.post(
  "/",
  adminMiddleware,
  upload.single("logo"),
  createBrandController
);

router.put(
  "/:id",
  adminMiddleware,
  upload.single("logo"),
  updateBrandController
);

router.delete(
  "/:id",
  adminMiddleware,
  deleteBrandController
);

export default router;