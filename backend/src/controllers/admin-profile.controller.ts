import { Request, Response } from "express";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../services/admin-profile.service";

export const getAdminProfileController = async (
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

    const admin = await getAdminProfile(userId);

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Admin profile not found",
      });
    }

    console.error("Get admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get admin profile",
    });
  }
};

export const updateAdminProfileController = async (
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

    const { name, email, phone, image } = req.body;

    const updatedAdmin = await updateAdminProfile(userId, {
      name,
      email,
      phone,
      image,
    });

    return res.status(200).json({
      success: true,
      message: "Admin profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Admin profile not found",
      });
    }

    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    console.error("Update admin profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update admin profile",
    });
  }
};