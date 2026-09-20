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
    // =====================================================
    // 1. CUSTOMER / GENERAL JWT COOKIE
    //
    // IMPORTANT:
    // Admin authentication uses "admin_token"
    // and is handled by adminMiddleware.
    // =====================================================

    const cookieToken = req.cookies?.token;

    if (cookieToken) {
      try {
        const decoded = verifyToken(cookieToken);

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.userId,
          },
          select: {
            id: true,
            firebaseUid: true,
            role: true,
            phone: true,
            email: true,
            name: true,
          },
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found.",
          });
        }

        res.locals.user = {
          userId: user.id,
          firebaseUid: user.firebaseUid ?? decoded.firebaseUid,
          role: user.role,
          phone: user.phone,
          email: user.email,
          name: user.name,
        };

        return next();
      } catch {
        // Invalid/expired JWT.
        // Continue with Firebase authentication.
      }
    }

    // =====================================================
    // 2. FIREBASE BEARER TOKEN
    // =====================================================

    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const firebaseToken = authorization.substring(7);

    // =====================================================
    // 3. VERIFY FIREBASE TOKEN
    // =====================================================

    const decodedFirebase = await getAuth().verifyIdToken(
      firebaseToken
    );

    // =====================================================
    // 4. FIND DATABASE USER
    // =====================================================

    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: decodedFirebase.uid,
      },
      select: {
        id: true,
        firebaseUid: true,
        role: true,
        phone: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // =====================================================
    // 5. SET AUTHENTICATED USER
    // =====================================================

    res.locals.user = {
      userId: user.id,
      firebaseUid: user.firebaseUid ?? decodedFirebase.uid,
      role: user.role,
      phone: user.phone,
      email: user.email,
      name: user.name,
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