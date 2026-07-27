import { Router } from "express";

import {
  createBannerController,
  deleteBannerController,
  getAllBannersController,
  getBannerByIdController,
  getPublicBannersController,
  updateBannerController,
} from "../controllers/banner.controller";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.get("/", getAllBannersController);

router.get("/public", getPublicBannersController);

router.get("/:id", getBannerByIdController);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  createBannerController
);

router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  updateBannerController
);

router.delete("/:id", deleteBannerController);

export default router;
