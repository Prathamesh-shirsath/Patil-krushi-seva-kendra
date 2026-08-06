"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import PageHeader from "@/components/common/page-header";
import StatsGrid from "@/components/common/stats-grid";

import StatsCard from "@/components/cards/stats-card";
import SalesChart from "@/components/charts/sales-chart";
import OrdersChart from "@/components/charts/orders-chart";
import RecentOrdersTable from "@/components/tables/recent-orders-table";
import TopProductsTable from "@/components/tables/top-products-table";
import SalesCategoryCard from "@/components/common/sales-category-card";
import LowStockCard from "@/components/common/low-stock-card";

import { useDashboard } from "@/hooks/use-dashboard";

import {
  DollarSign,
  ShoppingBag,
  Users,
  ShoppingCart,
} from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center text-sm text-gray-500">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* Header */}

      <PageHeader
        title="Dashboard"
        description="Overview of sales, orders, customers and inventory."
      />

      {/* Stats Cards */}

      <StatsGrid>

        <StatsCard
          title="Total Sales"
          value={data.totalSales ?? 0}
          prefix="₹"
          percentage={18.6}
          icon={<DollarSign className="text-green-700" size={24} />}
          iconBg="bg-green-50"
        />

        <StatsCard
          title="Total Orders"
          value={data.totalOrders ?? 0}
          percentage={12.4}
          icon={<ShoppingBag className="text-emerald-700" size={24} />}
          iconBg="bg-emerald-50"
        />

        <StatsCard
          title="Total Customers"
          value={data.totalCustomers ?? 0}
          percentage={15.8}
          icon={<Users className="text-violet-700" size={24} />}
          iconBg="bg-violet-50"
        />

        <StatsCard
          title="Average Order Value"
          value={data.averageOrderValue ?? 0}
          prefix="₹"
          percentage={8.3}
          icon={<ShoppingCart className="text-orange-700" size={24} />}
          iconBg="bg-orange-50"
        />

      </StatsGrid>

      {/* Charts */}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
          <SalesChart />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <OrdersChart />
        </div>

      </div>

      {/* Recent Orders */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <RecentOrdersTable />
      </div>

      {/* Bottom Cards */}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <TopProductsTable />
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <SalesCategoryCard />
        </div>

      </div>

      {/* Low Stock */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <LowStockCard />
      </div>

    </DashboardLayout>
  );
}