import { Request, Response } from "express";
import { z } from "zod";
import {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview,
} from "../services/review.service";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validators/review.validator";

export const createReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = createReviewSchema.parse(req.body);

    const review = await createReview(data, userId);

    return res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid review data",
        errors: error.issues,
      });
    }

    if (
      error instanceof Error &&
      error.message === "PRODUCT_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "REVIEW_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    return res.status(500).json({
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

    return res.json({
      success: true,
      data: reviews,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const updateReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = updateReviewSchema.parse(req.body);

    const review = await updateReview(
      req.params.id as string,
      userId,
      data
    );

    return res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid review data",
        errors: error.issues,
      });
    }

    if (
      error instanceof Error &&
      error.message === "REVIEW_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own review",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};

export const deleteReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await deleteReview(
      req.params.id as string,
      userId
    );

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "REVIEW_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own review",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};