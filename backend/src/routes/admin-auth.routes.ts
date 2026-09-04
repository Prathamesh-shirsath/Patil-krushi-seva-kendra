import { Router } from "express";

import {
  adminLogin,
  adminLogout,
  adminMe,
} from "../controllers/admin-auth.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin Login - Public
router.post("/login", adminLogin);

// Current Admin - Protected
router.get("/me", adminMiddleware, adminMe);

// Admin Logout - Protected
router.post("/logout", adminMiddleware, adminLogout);

export default router;