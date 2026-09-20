import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

import "../config/firebase-admin";
import { generateToken } from "../utils/jwt";

// =====================================================
// ADMIN LOGIN
// Firebase Email + Password
// =====================================================

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required.",
      });
    }

    // =====================================================
    // VERIFY FIREBASE ID TOKEN
    // =====================================================

    const decodedToken = await getAuth().verifyIdToken(idToken);

    if (!decodedToken.uid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Firebase authentication.",
      });
    }

    // =====================================================
    // EMAIL + PASSWORD = ADMIN
    // =====================================================

    // Firebase Email/Password accounts are used only
    // for Admin Panel authentication in this project.
    //
    // Customer authentication continues to use
    // Firebase Phone OTP separately.

    if (!decodedToken.email) {
      return res.status(403).json({
        success: false,
        message: "Admin email account required.",
      });
    }

    // =====================================================
    // CHECK FIREBASE PROVIDER
    // =====================================================

    const firebaseUser = await getAuth().getUser(
      decodedToken.uid
    );

    const passwordProvider = firebaseUser.providerData.some(
      (provider) => provider.providerId === "password"
    );

    if (!passwordProvider) {
      return res.status(403).json({
        success: false,
        message: "Admin Email + Password account required.",
      });
    }

    // =====================================================
    // CREATE APPLICATION SESSION JWT
    // =====================================================

    const token = generateToken({
      userId: firebaseUser.uid,
      firebaseUid: firebaseUser.uid,
      role: "ADMIN",
    });

    // =====================================================
    // ADMIN COOKIE
    // =====================================================

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      user: {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName ?? "",
        email: firebaseUser.email ?? "",
        role: "ADMIN",
        image: firebaseUser.photoURL ?? null,
      },
    });
  } catch (error) {
    console.error("Firebase admin login error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired Firebase authentication.",
    });
  }
};

// =====================================================
// CURRENT ADMIN
// =====================================================

export const adminMe = async (_req: Request, res: Response) => {
  try {
    const admin = res.locals.user;

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // =====================================================
    // GET CURRENT FIREBASE ADMIN
    // =====================================================

    const firebaseUser = await getAuth().getUser(
      admin.firebaseUid
    );

    // =====================================================
    // VERIFY EMAIL + PASSWORD PROVIDER
    // =====================================================

    if (!firebaseUser.email) {
      return res.status(403).json({
        success: false,
        message: "Admin email account required.",
      });
    }

    const passwordProvider = firebaseUser.providerData.some(
      (provider) => provider.providerId === "password"
    );

    if (!passwordProvider) {
      return res.status(403).json({
        success: false,
        message: "Admin Email + Password account required.",
      });
    }

    // =====================================================
    // CURRENT ADMIN RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      user: {
        firebaseUid: firebaseUser.uid,
        name: firebaseUser.displayName ?? "",
        email: firebaseUser.email ?? "",
        phone: firebaseUser.phoneNumber ?? null,
        image: firebaseUser.photoURL ?? null,
        role: "ADMIN",
        disabled: firebaseUser.disabled,
        createdAt:
          firebaseUser.metadata.creationTime ?? null,
        lastLoginAt:
          firebaseUser.metadata.lastSignInTime ?? null,
      },
    });
  } catch (error) {
    console.error("Admin me error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin information.",
    });
  }
};

// =====================================================
// ADMIN LOGOUT
// =====================================================

export const adminLogout = async (_req: Request, res: Response) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};