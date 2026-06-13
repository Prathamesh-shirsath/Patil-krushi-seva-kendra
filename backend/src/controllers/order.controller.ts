import { Request, Response } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../services/order.service";

export const createOrderController = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await createOrder(req.body);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

export const getAllOrdersController = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await getAllOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await getOrderById(req.params.id as string);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};