import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

import "../config/firebase-admin";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Check custom JWT cookie
    const cookieToken = req.cookies?.token;

    if (cookieToken) {
      try {
        const decoded = verifyToken(cookieToken);

        res.locals.user = decoded;

        return next();
      } catch {
        // Cookie JWT invalid/expired.
        // Try Firebase token below.
      }
    }

    // 2. Check Firebase Bearer token
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const firebaseToken = authorization.substring(7);

    // 3. Verify Firebase token
    const decodedFirebase = await getAuth().verifyIdToken(
      firebaseToken
    );

    // 4. Find our database user
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: decodedFirebase.uid,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // 5. Set authenticated user
    res.locals.user = {
      userId: user.id,
      firebaseUid: user.firebaseUid ?? decodedFirebase.uid,
      role: user.role,
    };

    return next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};