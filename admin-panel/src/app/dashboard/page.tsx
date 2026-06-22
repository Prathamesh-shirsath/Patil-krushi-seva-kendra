"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
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

    if (isLoading) {
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-950">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of sales, orders, customers and inventory.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatsCard
                    title="Total Sales"
                    value={data.totalSales}
                    prefix="₹"
                    percentage={18.6}
                    icon={<DollarSign className="text-green-700" size={24} />}
                    iconBg="bg-green-50"
                />

                <StatsCard
                    title="Total Orders"
                    value={data.totalOrders}
                    percentage={12.4}
                    icon={<ShoppingBag className="text-emerald-700" size={24} />}
                    iconBg="bg-emerald-50"
                />

                <StatsCard
                    title="Total Customers"
                    value={data.totalCustomers}
                    percentage={15.8}
                    icon={<Users className="text-violet-700" size={24} />}
                    iconBg="bg-violet-50"
                />

                <StatsCard
                    title="Average Order Value"
                    value={data.averageOrderValue}
                    prefix="₹"
                    percentage={8.3}
                    icon={<ShoppingCart className="text-orange-700" size={24} />}
                    iconBg="bg-orange-50"
                />
            </div>

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