import { Router } from "express";
import {
  createCouponController,
  getAllCouponsController,
  deleteCouponController,
} from "../controllers/coupon.controller";

const router = Router();

router.post("/", createCouponController);

router.get("/", getAllCouponsController);

router.delete("/:id", deleteCouponController);

export default router;