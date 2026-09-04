import { Router } from "express";

import {
  createStatisticController,
  deleteStatisticController,
  getAllStatisticsController,
  getPublicStatisticsController,
  getStatisticByIdController,
  updateStatisticController,
} from "../controllers/statistic.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Public
router.get("/public", getPublicStatisticsController);

// Admin only
router.get("/", adminMiddleware, getAllStatisticsController);

router.get("/:id", adminMiddleware, getStatisticByIdController);

router.post("/", adminMiddleware, createStatisticController);

router.put("/:id", adminMiddleware, updateStatisticController);

router.delete("/:id", adminMiddleware, deleteStatisticController);

export default router;