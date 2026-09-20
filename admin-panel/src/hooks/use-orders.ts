"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";

export interface OrderAddress {
  id: string;
  orderId: string;
  fullName: string;
  phone: string;
  state: string;
  district: string;
  taluka?: string | null;
  village: string;
  city?: string | null;
  pincode: string;
  addressLine: string;
  landmark?: string | null;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number | string;
  productName?: string;
  product?: {
    id: string;
    name: string;
    image?: string | null;
  } | null;
}

export interface OrderPayment {
  id?: string;
  amount?: number | string;
  status?: string;
  razorpayOrderId?: string | null;
  razorpayPaymentId?: string | null;
  transactionId?: string | null;
  failureReason?: string | null;
}

export interface Order {
  id: string;

  subTotal: number | string;
  deliveryCharge: number | string;
  discount: number | string;

  grandTotal: number | string;
  totalAmount: number | string;

  status: string;
  paymentStatus: string;
  paymentMethod?: string;

  createdAt: string;
  updatedAt?: string;

  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    phone?: string | null;
  } | null;

  payment?: OrderPayment | null;

  items: OrderItem[];

  OrderAddress?: OrderAddress | null;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/orders", {
        params: {
          _t: Date.now(),
        },
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
          "Failed to fetch orders."
        );
      }

      setOrders(
        Array.isArray(response.data?.data)
          ? response.data.data
          : []
      );
    } catch (error: any) {
      console.error("Load orders error:", error);

      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    refreshOrders: loadOrders,
  };
}