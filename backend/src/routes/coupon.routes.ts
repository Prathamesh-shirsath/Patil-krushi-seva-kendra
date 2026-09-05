import { Router } from "express";

import {
  createCouponController,
  getAllCouponsController,
  deleteCouponController,
} from "../controllers/coupon.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin only
router.post(
  "/",
  adminMiddleware,
  createCouponController
);

router.get(
  "/",
  adminMiddleware,
  getAllCouponsController
);

router.delete(
  "/:id",
  adminMiddleware,
  deleteCouponController
);

export default router;