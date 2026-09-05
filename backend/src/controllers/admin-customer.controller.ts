import { Request, Response } from "express";

import {
  getAllCustomers,
  getCustomerById,
  getCustomerStats,
  updateCustomer,
  deleteCustomer,
} from "../services/admin-customer.service";

/**
 * GET /api/admin/customers
 * Get all customers
 */
export const getAllCustomersController = async (
  _req: Request,
  res: Response
) => {
  try {
    const customers = await getAllCustomers();

    return res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.error("Get all customers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers.",
    });
  }
};


/**
 * GET /api/admin/customers/stats
 * Get customer statistics
 */
export const getCustomerStatsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const stats = await getCustomerStats();

    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error("Get customer stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer statistics.",
    });
  }
};


/**
 * GET /api/admin/customers/:id
 * Get customer by ID
 */
export const getCustomerByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const customer = await getCustomerById(id);

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    console.error("Get customer by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer.",
    });
  }
};


/**
 * PUT /api/admin/customers/:id
 * Update customer
 */
export const updateCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { name, email, phone, image } = req.body;

    const customer = await updateCustomer(id, {
      name,
      email,
      phone,
      image,
    });

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      customer,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use.",
      });
    }

    console.error("Update customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update customer.",
    });
  }
};


/**
 * DELETE /api/admin/customers/:id
 * Delete customer
 */
export const deleteCustomerController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const result = await deleteCustomer(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CUSTOMER_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    console.error("Delete customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
    });
  }
};