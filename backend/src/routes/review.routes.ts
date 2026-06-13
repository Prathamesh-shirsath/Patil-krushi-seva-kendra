import { Router } from "express";
import {
  createReviewController,
  getReviewsByProductController,
  deleteReviewController,
} from "../controllers/review.controller";

const router = Router();

router.post("/", createReviewController);

router.get("/:productId", getReviewsByProductController);

router.delete("/:id", deleteReviewController);

export default router;