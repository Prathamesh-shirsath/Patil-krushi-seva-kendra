import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  verifyOrderPayment,
} from "../services/order.service";

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
| POST /api/orders
*/

export const createOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please sign in to complete your checkout.",
      });
    }

    const { items, addressId, address, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty. Please add products before checking out.",
      });
    }

    const result = await createOrder({
      userId,
      items,
      addressId,
      address,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Create order error:", error);

    return res.status(400).json({
      success: false,
      message: error?.message || "Failed to create order.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| VERIFY RAZORPAY PAYMENT
|--------------------------------------------------------------------------
| POST /api/orders/verify-payment
*/

export const verifyPaymentController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification parameters.",
      });
    }

    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const updatedOrder = await verifyOrderPayment({
      userId,
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      data: updatedOrder,
    });
  } catch (error: any) {
    console.error("Verify payment error:", error);

    if (error?.message === "Order not found.") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(400).json({
      success: false,
      message: error?.message || "Payment verification failed.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| CUSTOMER - GET LOGGED IN USER ORDERS
|--------------------------------------------------------------------------
| GET /api/orders/user/my-orders
*/

export const getUserOrdersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const orders = await getUserOrders(userId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Get user orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ORDERS
|--------------------------------------------------------------------------
| GET /api/orders
*/

export const getAllOrdersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const orders = await getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
| GET /api/orders/:id
*/

export const getOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = res.locals.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const order = await getOrderById(req.params.id as string, userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ORDER STATUS
|--------------------------------------------------------------------------
| PUT /api/orders/:id/status
*/

export const updateOrderStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = req.params.id as string;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Order status is required.",
      });
    }

    const validStatuses = Object.values(OrderStatus);

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
        validStatuses,
      });
    }

    const order = await updateOrderStatus(orderId, status as OrderStatus);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      data: order,
    });
  } catch (error: any) {
    console.error("Update order status error:", error);

    if (error?.message === "Order not found") {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (error?.message?.includes("cannot be changed")) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};
