"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/dashboard-layout";

import OrdersHeader from "@/components/orders/orders-header";
import OrdersOverview from "@/components/orders/orders-overview";
import OrdersFilters from "@/components/orders/orders-filters";
import OrdersTable from "@/components/orders/orders-table";

import { useOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const {
    orders,
    loading,
    error,
    refreshOrders,
  } = useOrders();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [payment, setPayment] =
    useState("ALL");

  /*
  |--------------------------------------------------------------------------
  | FILTER ORDERS
  |--------------------------------------------------------------------------
  */

  const filteredOrders = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return orders.filter((order) => {
      /*
      |--------------------------------------------------------------------------
      | Search
      |--------------------------------------------------------------------------
      */

      const orderId =
        order.id.toLowerCase();

      const shortOrderId =
        order.id
          .slice(-8)
          .toLowerCase();

      const customerName =
        (
          order.user?.name ||
          order.OrderAddress
            ?.fullName ||
          ""
        ).toLowerCase();

      const phone =
        (
          order.user?.phone ||
          order.OrderAddress
            ?.phone ||
          ""
        ).toLowerCase();

      const matchesSearch =
        searchValue === "" ||
        orderId.includes(
          searchValue
        ) ||
        shortOrderId.includes(
          searchValue
        ) ||
        customerName.includes(
          searchValue
        ) ||
        phone.includes(
          searchValue
        );

      /*
      |--------------------------------------------------------------------------
      | Status
      |--------------------------------------------------------------------------
      */

      const matchesStatus =
        status === "ALL" ||
        order.status === status;

      /*
      |--------------------------------------------------------------------------
      | Payment
      |--------------------------------------------------------------------------
      */

      const matchesPayment =
        payment === "ALL" ||
        order.paymentStatus ===
        payment;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });
  }, [
    orders,
    search,
    status,
    payment,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Clear Filters
  |--------------------------------------------------------------------------
  */

  const clearFilters = () => {
    setSearch("");
    setStatus("ALL");
    setPayment("ALL");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}

        <OrdersHeader
          onRefresh={refreshOrders}
          loading={loading}
        />

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Overview */}

        <OrdersOverview
          orders={orders}
        />

        {/* Filters */}

        <OrdersFilters
          search={search}
          status={status}
          payment={payment}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPaymentChange={setPayment}
          onClear={clearFilters}
        />

        {/* Result Count */}

        {!loading && (
          <div className="flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {orders.length}
              </span>{" "}
              orders
            </p>

          </div>
        )}

        {/* Table */}

        <OrdersTable
          orders={filteredOrders}
          loading={loading}
          onOrdersUpdated={refreshOrders}
        />

      </div>
    </DashboardLayout>
  );
}