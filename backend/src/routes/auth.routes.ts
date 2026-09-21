import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import {
    authenticate,
} from "../middleware/auth.middleware";

const router = Router();

// Existing Firebase phone authentication
router.post("/login", authController.login);

// Email authentication
router.post("/register", authController.register);
router.post("/email-login", authController.emailLogin);

// Current user
router.get("/me", authenticate, authController.me);

// Logout
router.post("/logout", authenticate, authController.logout);

export default router;