import { Router } from "express";

import {
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from "../controllers/admin-management.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// =====================================================
// ALL ADMIN MANAGEMENT ROUTES REQUIRE ADMIN LOGIN
// =====================================================

router.get("/", adminMiddleware, getAdmins);

router.post("/", adminMiddleware, createAdmin);

router.patch("/:uid", adminMiddleware, updateAdmin);

router.delete("/:uid", adminMiddleware, deleteAdmin);

export default router;