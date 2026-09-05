import { Router } from "express";

import {
  getAdminProfileController,
  updateAdminProfileController,
} from "../controllers/admin-profile.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", adminMiddleware, getAdminProfileController);

router.put("/", adminMiddleware, updateAdminProfileController);

export default router;