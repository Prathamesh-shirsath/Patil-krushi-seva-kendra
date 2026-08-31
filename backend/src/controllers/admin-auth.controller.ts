import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";

// =====================================================
// ADMIN LOGIN
// =====================================================

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Only ADMIN can access admin panel
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken({
      userId: user.id,
      firebaseUid: user.firebaseUid ?? "",
      role: user.role,
    });

    // Store JWT in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// =====================================================
// CURRENT ADMIN
// =====================================================

export const adminMe = async (_req: Request, res: Response) => {
  try {
    const admin = res.locals.user;

    // Middleware se authenticated admin nahi mila
    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // Database se latest admin information
    const user = await prisma.user.findUnique({
      where: {
        id: admin.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Admin me error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// =====================================================
// ADMIN LOGOUT
// =====================================================

export const adminLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};