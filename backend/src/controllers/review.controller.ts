import { Request, Response } from "express";
import {
  createReview,
  getReviewsByProduct,
  deleteReview,
} from "../services/review.service";

export const createReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const review = await createReview(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create review",
    });
  }
};

export const getReviewsByProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await getReviewsByProduct(
      req.params.productId as string
    );

    res.json({
      success: true,
      data: reviews,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const deleteReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteReview(req.params.id as string);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};