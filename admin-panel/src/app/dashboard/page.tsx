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
    TrendingUp,
    Activity,
} from "lucide-react";

export default function DashboardPage() {
    const { data, isLoading } = useDashboard();

    if (isLoading || !data) {
        return (
            <DashboardLayout>
                <div className="flex h-[70vh] items-center justify-center">
                    <div className="space-y-4 text-center">
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
                        <p className="text-slate-500">
                            Loading dashboard...
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            {/* Header */}

            <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                    <p className="text-sm font-medium uppercase tracking-widest text-green-600">
                        Dashboard Overview
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-slate-900">
                        Welcome Back 👋
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Monitor sales, orders, inventory and customer activity.
                    </p>

                </div>

                <div className="flex gap-3">

                    <div className="rounded-2xl border bg-white px-6 py-4 shadow-sm">
                        <p className="text-xs uppercase text-slate-500">
                            Today
                        </p>

                        <p className="mt-1 text-xl font-bold text-slate-900">
                            ₹{Number(data.totalSales ?? 0).toLocaleString("en-IN")}
                        </p>
                    </div>

                    <div className="rounded-2xl border bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white shadow-lg">

                        <div className="flex items-center gap-2">

                            <TrendingUp size={18} />

                            <span className="text-sm">
                                Growth
                            </span>

                        </div>

                        <p className="mt-2 text-2xl font-bold">
                            +18.6%
                        </p>

                    </div>

                </div>

            </div>

            {/* KPI Cards */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatsCard
                    title="Revenue"
                    value={data.totalSales ?? 0}
                    prefix="₹"
                    percentage={18.6}
                    icon={<DollarSign className="text-green-700" size={26} />}
                    iconBg="bg-green-100"
                />

                <StatsCard
                    title="Orders"
                    value={data.totalOrders ?? 0}
                    percentage={12.3}
                    icon={<ShoppingBag className="text-blue-700" size={26} />}
                    iconBg="bg-blue-100"
                />

                <StatsCard
                    title="Customers"
                    value={data.totalCustomers ?? 0}
                    percentage={9.4}
                    icon={<Users className="text-violet-700" size={26} />}
                    iconBg="bg-violet-100"
                />

                <StatsCard
                    title="Average Order"
                    value={data.averageOrderValue ?? 0}
                    prefix="₹"
                    percentage={7.9}
                    icon={<ShoppingCart className="text-orange-700" size={26} />}
                    iconBg="bg-orange-100"
                />

            </div>

            {/* Charts */}

            <div className="mt-8 grid gap-6 xl:grid-cols-3">

                <div className="rounded-3xl border bg-white p-6 shadow-sm xl:col-span-2">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold">
                                Revenue Analytics
                            </h2>

                            <p className="text-sm text-slate-500">
                                Monthly revenue performance
                            </p>

                        </div>

                        <Activity className="text-green-600" />

                    </div>

                    <SalesChart />

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold">
                            Orders
                        </h2>

                        <p className="text-sm text-slate-500">
                            Monthly order trend
                        </p>

                    </div>

                    <OrdersChart />

                </div>

            </div>

            {/* Tables */}

            <div className="mt-8 grid gap-6 xl:grid-cols-3">

                <div className="rounded-3xl border bg-white p-6 shadow-sm xl:col-span-2">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold">
                            Recent Orders
                        </h2>

                        <p className="text-sm text-slate-500">
                            Latest customer purchases
                        </p>

                    </div>

                    <RecentOrdersTable />

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold">
                            Category Sales
                        </h2>

                        <p className="text-sm text-slate-500">
                            Revenue distribution
                        </p>

                    </div>

                    <SalesCategoryCard />

                </div>

            </div>

            {/* Bottom */}

            <div className="mt-8 grid gap-6 xl:grid-cols-2">

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold">
                            Top Products
                        </h2>

                        <p className="text-sm text-slate-500">
                            Best performing products
                        </p>

                    </div>

                    <TopProductsTable />

                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold">
                            Low Stock Alert
                        </h2>

                        <p className="text-sm text-slate-500">
                            Products requiring attention
                        </p>

                    </div>

                    <LowStockCard />

                </div>

            </div>

        </DashboardLayout>
    );
}