import { Router } from "express";

import {
  createStatisticController,
  deleteStatisticController,
  getAllStatisticsController,
  getPublicStatisticsController,
  getStatisticByIdController,
  updateStatisticController,
} from "../controllers/statistic.controller";

const router = Router();

router.get("/", getAllStatisticsController);

router.get("/public", getPublicStatisticsController);

router.get("/:id", getStatisticByIdController);

router.post("/", createStatisticController);

router.put("/:id", updateStatisticController);

router.delete("/:id", deleteStatisticController);

export default router;
