import { Router } from "express";

import {
  getAllCustomersController,
  getCustomerByIdController,
  getCustomerStatsController,
  updateCustomerController,
  deleteCustomerController,
} from "../controllers/admin-customer.controller";

import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin only - Customer statistics
router.get("/stats", adminMiddleware, getCustomerStatsController);

// Admin only - Get all customers
router.get("/", adminMiddleware, getAllCustomersController);

// Admin only - Get single customer
router.get("/:id", adminMiddleware, getCustomerByIdController);

// Admin only - Update customer
router.put("/:id", adminMiddleware, updateCustomerController);

// Admin only - Delete customer
router.delete("/:id", adminMiddleware, deleteCustomerController);

export default router;