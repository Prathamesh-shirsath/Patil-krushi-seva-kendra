import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const adminMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // =====================================================
    // ADMIN SESSION COOKIE
    // =====================================================

    const adminToken = _req.cookies?.admin_token;

    if (!adminToken) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    // =====================================================
    // VERIFY APPLICATION SESSION
    //
    // This JWT is created only AFTER Firebase
    // authentication succeeds.
    // =====================================================

    const decoded = verifyToken(adminToken);

    if (
      !decoded.userId ||
      !decoded.firebaseUid ||
      decoded.role !== "ADMIN"
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // =====================================================
    // STORE ADMIN SESSION
    // =====================================================

    res.locals.user = {
      userId: decoded.userId,
      id: decoded.userId,
      firebaseUid: decoded.firebaseUid,
      role: "ADMIN",
    };

    return next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin authentication.",
    });
  }
};