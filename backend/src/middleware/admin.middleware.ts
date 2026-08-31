import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Admin authentication required.",
      });
    }

    // Verify JWT
    const decoded = verifyToken(token);

    // Check admin role
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    // Store authenticated admin
    res.locals.user = decoded;

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin session.",
    });
  }
};