import { Router } from "express";
import {
  createReviewController,
  getReviewsByProductController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/review.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Create review - Login required
router.post("/", authenticate, createReviewController);

// Get product reviews - Public
router.get("/:productId", getReviewsByProductController);

// Update review - Login required
router.put("/:id", authenticate, updateReviewController);

// Delete review - Login required
router.delete("/:id", authenticate, deleteReviewController);

export default router;