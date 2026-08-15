"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";

export interface Order {
  id: string;

  totalAmount: number | string;
  subTotal: number | string;
  deliveryCharge: number | string;
  discount: number | string;
  grandTotal: number | string;

  status: string;
  paymentStatus: string;
  paymentMethod: string;

  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
  } | null;

  OrderAddress: {
    id: string;
    orderId: string;
    fullName: string;
    phone: string;
    state: string;
    district: string;
    taluka: string | null;
    village: string;
    city: string | null;
    pincode: string;
    addressLine: string;
    landmark: string | null;
  } | null;

  payment: {
    id: string;
    method: string;
    status: string;
    amount: number | string;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
    razorpaySignature: string | null;
    transactionId: string | null;
    failureReason: string | null;
  } | null;

  items: Array<{
    id: string;
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number | string;

    product?: {
      id: string;
      name: string;
      image: string | null;
      price: number | string;
    } | null;
  }>;
}

interface UpdateOrderStatusResult {
  success: boolean;
  data?: Order;
  message?: string;
}

interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;

  refreshOrders: () => Promise<void>;

  updateOrderStatus: (
    orderId: string,
    status: string
  ) => Promise<UpdateOrderStatusResult>;
}

export function useOrders(): UseOrdersResult {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | GET ALL ORDERS
  |--------------------------------------------------------------------------
  */

  const fetchOrders =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await api.get("/orders");

        if (
          !response.data?.success
        ) {
          throw new Error(
            response.data?.message ||
            "Failed to fetch orders."
          );
        }

        setOrders(
          response.data.data ?? []
        );
      } catch (error: any) {
        console.error(
          "Orders fetch error:",
          error
        );

        const message =
          error?.response?.data
            ?.message ||
          error?.message ||
          "Failed to fetch orders.";

        setError(message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }, []);

  /*
  |--------------------------------------------------------------------------
  | UPDATE ORDER STATUS
  |--------------------------------------------------------------------------
  */

  const updateOrderStatus =
    useCallback(
      async (
        orderId: string,
        status: string
      ): Promise<UpdateOrderStatusResult> => {
        try {
          const response =
            await api.put(
              `/orders/${orderId}/status`,
              {
                status,
              }
            );

          if (
            !response.data?.success
          ) {
            throw new Error(
              response.data?.message ||
              "Failed to update order status."
            );
          }

          const updatedOrder =
            response.data.data;

          /*
          |--------------------------------------------------------------------------
          | Update local orders immediately
          |--------------------------------------------------------------------------
          */

          if (updatedOrder) {
            setOrders(
              (currentOrders) =>
                currentOrders.map(
                  (order) =>
                    order.id ===
                      updatedOrder.id
                      ? updatedOrder
                      : order
                )
            );
          }

          return {
            success: true,
            data: updatedOrder,
            message:
              response.data.message,
          };
        } catch (error: any) {
          console.error(
            "Order status update error:",
            error
          );

          return {
            success: false,
            message:
              error?.response?.data
                ?.message ||
              error?.message ||
              "Failed to update order status.",
          };
        }
      },
      []
    );

  /*
  |--------------------------------------------------------------------------
  | INITIAL FETCH
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders: fetchOrders,
    updateOrderStatus,
  };
}