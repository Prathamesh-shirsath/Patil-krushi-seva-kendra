import { Request, Response } from "express";
import { ZodError } from "zod";

import {
  getAllAdminReviews,
  getAdminReviewById,
  updateAdminReview,
  deleteAdminReview,
} from "../services/admin-review.service";

import { updateAdminReviewSchema } from "../validators/admin-review.validator";

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL REVIEWS
|--------------------------------------------------------------------------
| GET /api/admin/reviews
|--------------------------------------------------------------------------
*/

export const getAllAdminReviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await getAllAdminReviews();

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error("Get all admin reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET SINGLE REVIEW
|--------------------------------------------------------------------------
| GET /api/admin/reviews/:id
|--------------------------------------------------------------------------
*/

export const getAdminReviewByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewId = req.params.id as string;

    const review = await getAdminReviewById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error("Get admin review error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch review",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE REVIEW
|--------------------------------------------------------------------------
| PUT /api/admin/reviews/:id
|--------------------------------------------------------------------------
*/

export const updateAdminReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewId = req.params.id as string;

    const validatedData = updateAdminReviewSchema.parse(req.body);

    if (
      validatedData.rating === undefined &&
      validatedData.comment === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const review = await updateAdminReview(
      reviewId,
      validatedData
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("Update admin review error:", error);

    if (error instanceof ZodError) {
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

    return res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - DELETE REVIEW
|--------------------------------------------------------------------------
| DELETE /api/admin/reviews/:id
|--------------------------------------------------------------------------
*/

export const deleteAdminReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const reviewId = req.params.id as string;

    await deleteAdminReview(reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin review error:", error);

    if (
      error instanceof Error &&
      error.message === "REVIEW_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};