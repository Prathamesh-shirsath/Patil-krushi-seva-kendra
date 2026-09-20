import { Router } from "express";

import {
  adminLogin,
  adminLogout,
  adminMe,
} from "../controllers/admin-auth.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.post("/login", adminLogin);

router.get("/me", adminMiddleware, adminMe);

router.post("/logout", adminMiddleware, adminLogout);

export default router;