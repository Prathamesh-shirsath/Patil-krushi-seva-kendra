import { Router } from "express";

import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/order.controller";

import { authenticate } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Customer - Create Order
router.post("/", authenticate, createOrderController);

// Admin - Get All Orders
router.get("/", adminMiddleware, getAllOrdersController);

// Admin/Customer - Get Single Order
router.get("/:id", authenticate, getOrderByIdController);

// Admin - Update Order Status
router.put(
  "/:id/status",
  adminMiddleware,
  updateOrderStatusController
);

export default router;