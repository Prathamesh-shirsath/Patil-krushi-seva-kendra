import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  adminMe,
} from "../controllers/admin-auth.controller";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin Login
router.post("/login", adminLogin);

// Get Current Admin
router.get("/me", adminMiddleware, adminMe);

// Admin Logout
router.post("/logout", adminLogout);

export default router;