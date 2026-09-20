"use client";

import { useCallback, useEffect, useState } from "react";

export interface OrderAddress {
  id: string;
  orderId: string;
  fullName: string;
  phone: string;
  state: string;
  district: string;
  taluka?: string;
  village: string;
  city?: string;
  pincode: string;
  addressLine: string;
  landmark?: string;
}

export interface Order {
  grandTotal(grandTotal: any): import("react").ReactNode;
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;

  user: {
    email: string;
    name: string;
    phone?: string;
  };

  payment: any;
  items: any[];

  OrderAddress?: OrderAddress;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const contentType = res.headers.get("content-type");

      let json: any = {};

      if (contentType?.includes("application/json")) {
        json = await res.json();
      } else {
        const text = await res.text();
        throw new Error(
          `Server returned an invalid response (${res.status}): ${text.slice(0, 100)}`
        );
      }

      if (!res.ok) {
        throw new Error(
          json?.message ||
            `Failed to fetch orders (${res.status})`
        );
      }

      setOrders(
        Array.isArray(json?.data)
          ? json.data
          : []
      );
    } catch (err: any) {
      console.error("Load orders error:", err);

      setError(
        err?.message ||
          "Failed to fetch orders. Please check backend server."
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