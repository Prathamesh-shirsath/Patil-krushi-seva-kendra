import { Request, Response } from "express";

import {
  OrderStatus,
} from "@prisma/client";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/order.service";

/*
|--------------------------------------------------------------------------
| CREATE ORDER
|--------------------------------------------------------------------------
*/

export const createOrderController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const order =
        await createOrder(
          req.body
        );

      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error(
        "Create order error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to create order",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL ORDERS
|--------------------------------------------------------------------------
*/

export const getAllOrdersController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const orders =
        await getAllOrders();

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error(
        "Get all orders error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch orders",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| GET SINGLE ORDER
|--------------------------------------------------------------------------
*/

export const getOrderByIdController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const order =
        await getOrderById(
          req.params.id as string
        );

      if (!order) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error(
        "Get order error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch order",
      });
    }
  };

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatusController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const orderId =
        req.params.id as string;

      const {
        status,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | Validate request body
      |--------------------------------------------------------------------------
      */

      if (!status) {
        return res.status(400).json({
          success: false,
          message:
            "Order status is required",
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Validate enum value
      |--------------------------------------------------------------------------
      */

      const validStatuses =
        Object.values(
          OrderStatus
        );

      if (
        !validStatuses.includes(
          status
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid order status",
          validStatuses,
        });
      }

      /*
      |--------------------------------------------------------------------------
      | Update
      |--------------------------------------------------------------------------
      */

      const order =
        await updateOrderStatus(
          orderId,
          status as OrderStatus
        );

      res.json({
        success: true,

        message:
          "Order status updated successfully",

        data: order,
      });
    } catch (error: any) {
      console.error(
        "Update order status error:",
        error
      );

      /*
      |--------------------------------------------------------------------------
      | Order not found / transition error
      |--------------------------------------------------------------------------
      */

      if (
        error?.message ===
        "Order not found"
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Order not found",
        });
      }

      if (
        error?.message?.includes(
          "cannot be changed"
        )
      ) {
        return res.status(409).json({
          success: false,
          message:
            error.message,
        });
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to update order status",
      });
    }
  };