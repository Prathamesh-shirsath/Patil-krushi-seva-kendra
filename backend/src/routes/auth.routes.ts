import { Router } from "express";

import * as authController from "../controllers/auth.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// =====================================================
// CUSTOMER AUTHENTICATION
// =====================================================

// Existing login
router.post("/login", authController.login);

// =====================================================
// MOBILE + PASSWORD AUTHENTICATION
// =====================================================

// Register with mobile + password
router.post(
  "/register",
  authController.register
);

// Login with mobile + password
router.post(
  "/phone-login",
  authController.phoneLogin
);

// =====================================================
// EMAIL AUTHENTICATION
// =====================================================

// Keep this if admin/old users still need email login
router.post(
  "/email-login",
  authController.phoneLogin
);

// =====================================================
// CURRENT USER
// =====================================================

router.get(
  "/me",
  authenticate,
  authController.me
);

// =====================================================
// LOGOUT
// =====================================================

router.post(
  "/logout",
  authenticate,
  authController.logout
);

export default router;