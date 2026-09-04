import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

router.get("/", adminMiddleware, getDashboard);

export default router;