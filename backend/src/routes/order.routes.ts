import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
} from "../controllers/order.controller";

const router = Router();

router.post("/", createOrderController);

router.get("/", getAllOrdersController);

router.get("/:id", getOrderByIdController);

export default router;