import { Request, Response } from "express";
import {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} from "../services/coupon.service";

export const createCouponController = async (
  req: Request,
  res: Response
) => {
  try {
    const coupon = await createCoupon(req.body);

    res.status(201).json({
      success: true,
      data: coupon,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to create coupon",
    });
  }
};

export const getAllCouponsController = async (
  req: Request,
  res: Response
) => {
  try {
    const coupons = await getAllCoupons();

    res.json({
      success: true,
      data: coupons,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
    });
  }
};

export const deleteCouponController = async (
  req: Request,
  res: Response
) => {
  try {
    await deleteCoupon(req.params.id as string);

    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to delete coupon",
    });
  }
};