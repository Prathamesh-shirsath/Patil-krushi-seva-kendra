"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import OrdersHeader from "@/components/orders/orders-header";
import OrdersOverview from "@/components/orders/orders-overview";
import OrdersFilters from "@/components/orders/orders-filters";
import OrdersTable from "@/components/orders/orders-table";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <OrdersHeader />

        {/* Overview Cards */}
        <OrdersOverview />

        {/* Filters */}
        <OrdersFilters />

        {/* Orders Table */}
        <OrdersTable />

      </div>
    </DashboardLayout>
  );
}