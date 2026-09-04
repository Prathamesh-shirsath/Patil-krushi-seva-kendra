import { Router } from "express";

import {
  getAllAdminReviewsController,
  getAdminReviewByIdController,
  updateAdminReviewController,
  deleteAdminReviewController,
} from "../controllers/admin-review.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin only - Get all reviews
router.get("/", adminMiddleware, getAllAdminReviewsController);

// Admin only - Get single review
router.get("/:id", adminMiddleware, getAdminReviewByIdController);

// Admin only - Update review
router.put("/:id", adminMiddleware, updateAdminReviewController);

// Admin only - Delete review
router.delete("/:id", adminMiddleware, deleteAdminReviewController);

export default router;