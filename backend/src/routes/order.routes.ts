import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  getUserOrdersController,
  updateOrderStatusController,
  verifyPaymentController,
} from "../controllers/order.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| CUSTOMER ROUTES
|--------------------------------------------------------------------------
*/

// Create order & initialize Razorpay or COD
router.post("/", authenticate, createOrderController);

// Verify Razorpay payment signature
router.post("/verify-payment", authenticate, verifyPaymentController);

// Get current logged-in user's orders
router.get("/user/my-orders", authenticate, getUserOrdersController);

// Get single order by ID
router.get("/:id", getOrderByIdController);

/*
|--------------------------------------------------------------------------
| ADMIN ROUTES
|--------------------------------------------------------------------------
*/

// Get all orders (Admin)
router.get("/", getAllOrdersController);

// Update order status (Admin)
router.put("/:id/status", updateOrderStatusController);

export default router;