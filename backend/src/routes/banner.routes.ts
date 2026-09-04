import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";

import {
  createBannerController,
  deleteBannerController,
  getAllBannersController,
  getBannerByIdController,
  getPublicBannersController,
  updateBannerController,
} from "../controllers/banner.controller";

import { bannerUpload } from "../middleware/upload.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// =====================================================
// PUBLIC
// =====================================================

// Public banners for website
router.get("/public", getPublicBannersController);

// =====================================================
// ADMIN ONLY
// =====================================================

// Get all banners
router.get("/", adminMiddleware, getAllBannersController);

// Get banner by ID
router.get("/:id", adminMiddleware, getBannerByIdController);

// Create banner
router.post(
  "/",
  adminMiddleware,
  bannerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  createBannerController
);

// Update banner
router.put(
  "/:id",
  adminMiddleware,
  bannerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  updateBannerController
);

// Delete banner
router.delete(
  "/:id",
  adminMiddleware,
  deleteBannerController
);

// =====================================================
// UPLOAD ERROR HANDLER
// =====================================================

router.use(
  (
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof multer.MulterError) {
      const message =
        error.code === "LIMIT_FILE_SIZE"
          ? "Banner image must be smaller than 5 MB."
          : "Invalid banner image upload.";

      return res.status(400).json({
        success: false,
        message,
      });
    }

    if (
      error instanceof Error &&
      error.message ===
        "Only JPEG, PNG, and WebP images are allowed."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
);

export default router;