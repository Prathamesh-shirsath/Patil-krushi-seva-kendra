"use client";

import {
    useMemo,
} from "react";

import {
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    Boxes,
    CheckCircle2,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    Package,
    RefreshCw,
    ShoppingBag,
    ShoppingCart,
    Tag,
    TrendingUp,
    Truck,
    Users,
    XCircle,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

import DashboardLayout from "@/components/layout/dashboard-layout";

import { useDashboard } from "@/hooks/use-dashboard";

import {
    Button,
} from "@/components/ui/button";

import {
    Card,
} from "@/components/ui/card";

interface DashboardData {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;

    totalProducts: number;
    activeProducts: number;
    lowStockCount: number;

    totalCategories: number;
    totalBrands: number;

    averageOrderValue: number;

    salesGrowthPercent: number;
    ordersGrowthPercent: number;

    salesTrend: {
        date: string;
        label: string;
        sales: number;
        orders: number;
    }[];

    orderStatus: {
        name: string;
        value: number;
    }[];

    recentOrders: {
        id: string;
        customerName: string;
        customerPhone: string | null;
        amount: number;
        status: string;
        createdAt: string;
    }[];

    topProducts: {
        id: string;
        name: string;
        image: string | null;
        sold: number;
        revenue: number;
    }[];

    categorySales: {
        name: string;
        sales: number;
        revenue: number;
    }[];

    lowStockProducts: {
        id: string;
        name: string;
        image: string | null;
        stock: number;
        price: number;
    }[];
}

export default function DashboardPage() {
    const {
        data,
        isLoading,
        isError,
        refetch,
        isFetching,
    } = useDashboard();

    const dashboard =
        data as
        | DashboardData
        | undefined;

    /* ========================================================= */
    /* TOTAL ORDER STATUS */
    /* ========================================================= */

    const totalStatusOrders =
        useMemo(() => {
            return (
                dashboard?.orderStatus?.reduce(
                    (total, item) =>
                        total +
                        item.value,
                    0
                ) ?? 0
            );
        }, [
            dashboard?.orderStatus,
        ]);

    /* ========================================================= */
    /* LOADING */
    /* ========================================================= */

    if (isLoading) {
        return (
            <DashboardLayout>
                <DashboardSkeleton />
            </DashboardLayout>
        );
    }

    /* ========================================================= */
    /* ERROR */
    /* ========================================================= */

    if (isError || !dashboard) {
        return (
            <DashboardLayout>
                <div className="flex min-h-[65vh] items-center justify-center">
                    <Card className="w-full max-w-md rounded-3xl border-red-100 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <AlertTriangle className="h-7 w-7" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Dashboard unavailable
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            We could not load the latest
                            dashboard information.
                            Please try again.
                        </p>

                        <Button
                            type="button"
                            onClick={() =>
                                refetch()
                            }
                            className="mt-6 rounded-xl bg-emerald-600 px-6 hover:bg-emerald-700"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>

                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="min-w-0 space-y-5 sm:space-y-6">

                {/* ================================================= */}
                {/* HERO */}
                {/* ================================================= */}

                <section
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-emerald-100
                        bg-gradient-to-br
                        from-[#063d28]
                        via-[#075c3b]
                        to-[#009b63]
                        p-5
                        text-white
                        shadow-lg

                        sm:p-7
                        lg:p-8
                    "
                >

                    {/* decorative circles */}

                    <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-300/10 blur-2xl" />

                    <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="min-w-0">

                            <div className="mb-3 flex items-center gap-2">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
                                    <BarChart3 className="h-5 w-5" />
                                </div>

                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100">
                                    Admin Overview
                                </span>

                            </div>

                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                Welcome back, Admin
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/80 sm:text-base">
                                Monitor your Krushi Seva Kendra
                                sales, orders, customers and
                                inventory from one place.
                            </p>

                        </div>

                        <div className="flex shrink-0 items-center gap-2">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    refetch()
                                }
                                disabled={
                                    isFetching
                                }
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/20
                                    bg-white/10
                                    text-white
                                    hover:bg-white/20
                                    hover:text-white
                                "
                            >
                                <RefreshCw
                                    className={`mr-2 h-4 w-4 ${isFetching
                                            ? "animate-spin"
                                            : ""
                                        }`}
                                />
                                Refresh
                            </Button>

                        </div>

                    </div>

                </section>

                {/* ================================================= */}
                {/* STATS */}
                {/* ================================================= */}

                <section className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">

                    <DashboardStat
                        title="Total Sales"
                        value={`₹${formatNumber(
                            dashboard.totalSales
                        )}`}
                        subtitle="Confirmed, shipped & delivered"
                        icon={
                            CircleDollarSign
                        }
                        iconClass="bg-emerald-50 text-emerald-600"
                        trend={
                            dashboard.salesGrowthPercent
                        }
                    />

                    <DashboardStat
                        title="Total Orders"
                        value={formatNumber(
                            dashboard.totalOrders
                        )}
                        subtitle="All customer orders"
                        icon={
                            ShoppingBag
                        }
                        iconClass="bg-blue-50 text-blue-600"
                        trend={
                            dashboard.ordersGrowthPercent
                        }
                    />

                    <DashboardStat
                        title="Customers"
                        value={formatNumber(
                            dashboard.totalCustomers
                        )}
                        subtitle="Registered customers"
                        icon={Users}
                        iconClass="bg-violet-50 text-violet-600"
                    />

                    <DashboardStat
                        title="Average Order"
                        value={`₹${formatNumber(
                            dashboard.averageOrderValue
                        )}`}
                        subtitle="Average completed order"
                        icon={
                            ShoppingCart
                        }
                        iconClass="bg-orange-50 text-orange-600"
                    />

                </section>

                {/* ================================================= */}
                {/* SECONDARY STATS */}
                {/* ================================================= */}

                <section className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <MiniStat
                        title="Products"
                        value={
                            dashboard.totalProducts
                        }
                        detail={`${dashboard.activeProducts} active`}
                        icon={Package}
                    />

                    <MiniStat
                        title="Categories"
                        value={
                            dashboard.totalCategories
                        }
                        detail={`${dashboard.totalBrands} brands`}
                        icon={Tag}
                    />

                    <MiniStat
                        title="Low Stock"
                        value={
                            dashboard.lowStockCount
                        }
                        detail="Need attention"
                        icon={AlertTriangle}
                        danger={
                            dashboard.lowStockCount >
                            0
                        }
                    />

                    <MiniStat
                        title="Orders Today"
                        value={
                            dashboard.salesTrend?.[
                                dashboard.salesTrend
                                    .length - 1
                            ]?.orders ?? 0
                        }
                        detail="Latest activity"
                        icon={TrendingUp}
                    />

                </section>

                {/* ================================================= */}
                {/* CHARTS */}
                {/* ================================================= */}

                <section className="grid min-w-0 gap-5 lg:grid-cols-3">

                    {/* SALES */}

                    <Card className="min-w-0 overflow-hidden rounded-3xl border-slate-200 shadow-sm lg:col-span-2">

                        <div className="border-b border-slate-100 p-5 sm:p-6">

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <TrendingUp className="h-4 w-4" />
                                        </div>

                                        <h2 className="font-bold text-slate-900">
                                            Sales Overview
                                        </h2>

                                    </div>

                                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                        Last 7 days performance
                                    </p>

                                </div>

                                <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right">

                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                                        7 Day Growth
                                    </p>

                                    <p
                                        className={`text-sm font-bold ${dashboard.salesGrowthPercent >=
                                                0
                                                ? "text-emerald-700"
                                                : "text-red-600"
                                            }`}
                                    >
                                        {dashboard.salesGrowthPercent >=
                                            0
                                            ? "+"
                                            : ""}
                                        {
                                            dashboard.salesGrowthPercent
                                        }
                                        %
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="h-[280px] w-full p-3 sm:h-[340px] sm:p-5">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={
                                        dashboard.salesTrend
                                    }
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -15,
                                        bottom: 0,
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#e2e8f0"
                                    />

                                    <XAxis
                                        dataKey="label"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748b",
                                            fontSize: 11,
                                        }}
                                    />

                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fill: "#64748b",
                                            fontSize: 10,
                                        }}
                                        tickFormatter={
                                            formatCompact
                                        }
                                    />

                                    <Tooltip
                                        contentStyle={{
                                            borderRadius:
                                                14,
                                            border:
                                                "1px solid #e2e8f0",
                                            boxShadow:
                                                "0 10px 30px rgba(15,23,42,.10)",
                                        }}
                                        formatter={(
                                            value,
                                            name
                                        ) => [
                                                name ===
                                                    "sales"
                                                    ? `₹${formatNumber(
                                                        Number(
                                                            value
                                                        )
                                                    )}`
                                                    : value,
                                                name ===
                                                    "sales"
                                                    ? "Sales"
                                                    : "Orders",
                                            ]}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#059669"
                                        strokeWidth={3}
                                        dot={{
                                            r: 4,
                                            fill: "#059669",
                                            strokeWidth: 2,
                                            stroke: "#fff",
                                        }}
                                        activeDot={{
                                            r: 6,
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </Card>

                    {/* ORDER STATUS */}

                    <Card className="min-w-0 overflow-hidden rounded-3xl border-slate-200 shadow-sm">

                        <div className="border-b border-slate-100 p-5 sm:p-6">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Boxes className="h-4 w-4" />
                                </div>

                                <div>

                                    <h2 className="font-bold text-slate-900">
                                        Order Status
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Current order distribution
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="relative h-[300px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={
                                            dashboard.orderStatus
                                        }
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius="58%"
                                        outerRadius="78%"
                                        paddingAngle={3}
                                        strokeWidth={0}
                                    >

                                        {dashboard.orderStatus.map(
                                            (
                                                entry,
                                                index
                                            ) => (
                                                <Cell
                                                    key={
                                                        entry.name
                                                    }
                                                    fill={
                                                        ORDER_COLORS[
                                                        index %
                                                        ORDER_COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                    </Pie>

                                    <Tooltip />

                                    <Legend
                                        verticalAlign="bottom"
                                        height={45}
                                        iconType="circle"
                                        wrapperStyle={{
                                            fontSize:
                                                11,
                                        }}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                            <div className="pointer-events-none absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 text-center">

                                <p className="text-2xl font-bold text-slate-900">
                                    {formatNumber(
                                        totalStatusOrders
                                    )}
                                </p>

                                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                                    Orders
                                </p>

                            </div>

                        </div>

                    </Card>

                </section>

                {/* ================================================= */}
                {/* RECENT ORDERS */}
                {/* ================================================= */}

                <Card className="overflow-hidden rounded-3xl border-slate-200 shadow-sm">

                    <SectionHeader
                        icon={ShoppingBag}
                        title="Recent Orders"
                        subtitle="Latest customer activity"
                        href="/orders"
                    />

                    {/* DESKTOP */}

                    <div className="hidden overflow-x-auto md:block">

                        <table className="w-full min-w-[720px]">

                            <thead>

                                <tr className="border-y border-slate-100 bg-slate-50/70">

                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Order
                                    </th>

                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Customer
                                    </th>

                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Amount
                                    </th>

                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {dashboard.recentOrders.map(
                                    (order) => (
                                        <tr
                                            key={
                                                order.id
                                            }
                                            className="border-b border-slate-100 transition hover:bg-emerald-50/30 last:border-0"
                                        >

                                            <td className="px-5 py-4">

                                                <span className="font-mono text-xs font-semibold text-slate-700">
                                                    #
                                                    {order.id.slice(
                                                        -8
                                                    ).toUpperCase()}
                                                </span>

                                            </td>

                                            <td className="px-5 py-4">

                                                <div>

                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {
                                                            order.customerName
                                                        }
                                                    </p>

                                                    {order.customerPhone && (
                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            {
                                                                order.customerPhone
                                                            }
                                                        </p>
                                                    )}

                                                </div>

                                            </td>

                                            <td className="px-5 py-4 text-right">

                                                <span className="font-semibold text-slate-900">
                                                    ₹
                                                    {formatNumber(
                                                        order.amount
                                                    )}
                                                </span>

                                            </td>

                                            <td className="px-5 py-4 text-center">

                                                <OrderStatusBadge
                                                    status={
                                                        order.status
                                                    }
                                                />

                                            </td>

                                            <td className="px-5 py-4 text-right text-xs text-slate-500">

                                                {formatDate(
                                                    order.createdAt
                                                )}

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* MOBILE */}

                    <div className="divide-y divide-slate-100 md:hidden">

                        {dashboard.recentOrders.map(
                            (order) => (
                                <div
                                    key={
                                        order.id
                                    }
                                    className="p-4"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="min-w-0">

                                            <p className="font-mono text-xs font-bold text-slate-700">
                                                #
                                                {order.id
                                                    .slice(
                                                        -8
                                                    )
                                                    .toUpperCase()}
                                            </p>

                                            <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                                                {
                                                    order.customerName
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {formatDate(
                                                    order.createdAt
                                                )}
                                            </p>

                                        </div>

                                        <div className="shrink-0 text-right">

                                            <p className="font-bold text-slate-900">
                                                ₹
                                                {formatNumber(
                                                    order.amount
                                                )}
                                            </p>

                                            <div className="mt-2">
                                                <OrderStatusBadge
                                                    status={
                                                        order.status
                                                    }
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </Card>

                {/* ================================================= */}
                {/* TOP PRODUCTS + CATEGORY */}
                {/* ================================================= */}

                <section className="grid min-w-0 gap-5 lg:grid-cols-2">

                    {/* TOP PRODUCTS */}

                    <Card className="overflow-hidden rounded-3xl border-slate-200 shadow-sm">

                        <SectionHeader
                            icon={TrendingUp}
                            title="Top Selling Products"
                            subtitle="Best performing products"
                            href="/products"
                        />

                        <div className="divide-y divide-slate-100">

                            {dashboard.topProducts.length ===
                                0 ? (
                                <EmptyState
                                    icon={Package}
                                    text="No sales data available yet."
                                />
                            ) : (
                                dashboard.topProducts.map(
                                    (
                                        product,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                product.id
                                            }
                                            className="flex items-center gap-3 p-4 transition hover:bg-slate-50"
                                        >

                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                                                {index +
                                                    1}
                                            </span>

                                            <ProductImage
                                                src={
                                                    product.image
                                                }
                                                name={
                                                    product.name
                                                }
                                            />

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {
                                                        product.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {
                                                        product.sold
                                                    }{" "}
                                                    units sold
                                                </p>

                                            </div>

                                            <div className="shrink-0 text-right">

                                                <p className="text-sm font-bold text-emerald-600">
                                                    ₹
                                                    {formatNumber(
                                                        product.revenue
                                                    )}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                    Revenue
                                                </p>

                                            </div>

                                        </div>
                                    )
                                )
                            )}

                        </div>

                    </Card>

                    {/* CATEGORY SALES */}

                    <Card className="overflow-hidden rounded-3xl border-slate-200 shadow-sm">

                        <SectionHeader
                            icon={BarChart3}
                            title="Sales By Category"
                            subtitle="Revenue contribution"
                            href="/categories"
                        />

                        <div className="space-y-5 p-5 sm:p-6">

                            {dashboard.categorySales.length ===
                                0 ? (
                                <EmptyState
                                    icon={Tag}
                                    text="No category sales data yet."
                                />
                            ) : (
                                dashboard.categorySales.map(
                                    (
                                        category,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                category.name
                                            }
                                        >

                                            <div className="mb-2 flex items-center justify-between gap-3">

                                                <div className="flex min-w-0 items-center gap-2">

                                                    <span
                                                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                CATEGORY_COLORS[
                                                                index %
                                                                CATEGORY_COLORS.length
                                                                ],
                                                        }}
                                                    />

                                                    <span className="truncate text-sm font-semibold text-slate-700">
                                                        {
                                                            category.name
                                                        }
                                                    </span>

                                                </div>

                                                <div className="shrink-0 text-right">

                                                    <span className="text-sm font-bold text-slate-800">
                                                        {
                                                            category.sales
                                                        }
                                                        %
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{
                                                        width: `${Math.min(
                                                            category.sales,
                                                            100
                                                        )}%`,

                                                        backgroundColor:
                                                            CATEGORY_COLORS[
                                                            index %
                                                            CATEGORY_COLORS.length
                                                            ],
                                                    }}
                                                />

                                            </div>

                                            <p className="mt-1.5 text-xs text-slate-400">
                                                ₹
                                                {formatNumber(
                                                    category.revenue
                                                )}{" "}
                                                revenue
                                            </p>

                                        </div>
                                    )
                                )
                            )}

                        </div>

                    </Card>

                </section>

                {/* ================================================= */}
                {/* LOW STOCK */}
                {/* ================================================= */}

                <Card className="overflow-hidden rounded-3xl border-red-100 shadow-sm">

                    <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>

                            <div>

                                <h2 className="font-bold text-slate-900">
                                    Low Stock Alerts
                                </h2>

                                <p className="text-xs text-slate-500 sm:text-sm">
                                    Products with 10 or fewer units
                                </p>

                            </div>

                        </div>

                        <a
                            href="/products"
                            className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            Manage Inventory
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </a>

                    </div>

                    {dashboard.lowStockProducts.length ===
                        0 ? (
                        <div className="p-8 text-center">

                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>

                            <p className="mt-3 font-semibold text-slate-900">
                                Inventory looks healthy
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                No products are currently low in stock.
                            </p>

                        </div>
                    ) : (
                        <>
                            {/* DESKTOP */}

                            <div className="hidden overflow-x-auto md:block">

                                <table className="w-full min-w-[650px]">

                                    <thead>

                                        <tr className="border-b border-slate-100 bg-slate-50/70">

                                            <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Product
                                            </th>

                                            <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Price
                                            </th>

                                            <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Stock
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {dashboard.lowStockProducts.map(
                                            (
                                                product
                                            ) => (
                                                <tr
                                                    key={
                                                        product.id
                                                    }
                                                    className="border-b border-slate-100 last:border-0"
                                                >

                                                    <td className="px-5 py-4">

                                                        <div className="flex items-center gap-3">

                                                            <ProductImage
                                                                src={
                                                                    product.image
                                                                }
                                                                name={
                                                                    product.name
                                                                }
                                                            />

                                                            <span className="font-semibold text-slate-800">
                                                                {
                                                                    product.name
                                                                }
                                                            </span>

                                                        </div>

                                                    </td>

                                                    <td className="px-5 py-4 text-right font-medium text-slate-700">
                                                        ₹
                                                        {formatNumber(
                                                            product.price
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4 text-right">

                                                        <StockBadge
                                                            stock={
                                                                product.stock
                                                            }
                                                        />

                                                    </td>

                                                </tr>
                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* MOBILE */}

                            <div className="divide-y divide-slate-100 md:hidden">

                                {dashboard.lowStockProducts.map(
                                    (
                                        product
                                    ) => (
                                        <div
                                            key={
                                                product.id
                                            }
                                            className="flex items-center gap-3 p-4"
                                        >

                                            <ProductImage
                                                src={
                                                    product.image
                                                }
                                                name={
                                                    product.name
                                                }
                                            />

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-semibold text-slate-900">
                                                    {
                                                        product.name
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    ₹
                                                    {formatNumber(
                                                        product.price
                                                    )}
                                                </p>

                                            </div>

                                            <StockBadge
                                                stock={
                                                    product.stock
                                                }
                                            />

                                        </div>
                                    )
                                )}

                            </div>
                        </>
                    )}

                </Card>

            </div>

        </DashboardLayout>
    );
}

/* =============================================================
   STAT CARD
============================================================= */

function DashboardStat({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClass,
    trend,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    iconClass: string;
    trend?: number;
}) {
    const hasTrend =
        trend !== undefined;

    const positive =
        (trend ?? 0) >= 0;

    return (
        <Card className="group min-w-0 overflow-hidden rounded-3xl border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">

                    <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {title}
                    </p>

                    <p className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        {value}
                    </p>

                    <p className="mt-1.5 truncate text-[11px] text-slate-400">
                        {subtitle}
                    </p>

                    {hasTrend && (
                        <div className="mt-3">

                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${positive
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-red-50 text-red-600"
                                    }`}
                            >
                                {positive ? (
                                    <ArrowUpRight className="h-3 w-3" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3" />
                                )}

                                {positive
                                    ? "+"
                                    : ""}
                                {trend}%
                            </span>

                            <span className="ml-1.5 text-[10px] text-slate-400">
                                vs previous 7 days
                            </span>

                        </div>
                    )}

                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClass} transition duration-300 group-hover:scale-105 sm:h-12 sm:w-12`}
                >
                    <Icon className="h-5 w-5" />
                </div>

            </div>

        </Card>
    );
}

/* =============================================================
   MINI STAT
============================================================= */

function MiniStat({
    title,
    value,
    detail,
    icon: Icon,
    danger = false,
}: {
    title: string;
    value: number;
    detail: string;
    icon: React.ElementType;
    danger?: boolean;
}) {
    return (
        <Card className="flex min-w-0 items-center gap-3 rounded-2xl border-slate-200 p-4 shadow-sm">

            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${danger
                        ? "bg-red-50 text-red-500"
                        : "bg-slate-100 text-slate-600"
                    }`}
            >
                <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">

                <p className="text-xs font-medium text-slate-400">
                    {title}
                </p>

                <div className="mt-0.5 flex items-baseline gap-2">

                    <p
                        className={`text-xl font-bold ${danger
                                ? "text-red-600"
                                : "text-slate-900"
                            }`}
                    >
                        {formatNumber(
                            value
                        )}
                    </p>

                    <p className="truncate text-[10px] text-slate-400">
                        {detail}
                    </p>

                </div>

            </div>

        </Card>
    );
}

/* =============================================================
   SECTION HEADER
============================================================= */

function SectionHeader({
    icon: Icon,
    title,
    subtitle,
    href,
}: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    href: string;
}) {
    return (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">

            <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0">

                    <h2 className="truncate font-bold text-slate-900">
                        {title}
                    </h2>

                    <p className="truncate text-xs text-slate-500">
                        {subtitle}
                    </p>

                </div>

            </div>

            <a
                href={href}
                className="inline-flex shrink-0 items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 sm:text-sm"
            >
                View All
                <ChevronRight className="ml-0.5 h-4 w-4" />
            </a>

        </div>
    );
}

/* =============================================================
   PRODUCT IMAGE
============================================================= */

function ProductImage({
    src,
    name,
}: {
    src: string | null;
    name: string;
}) {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 bg-white object-cover"
            />
        );
    }

    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold uppercase text-emerald-700">
            {name
                .slice(0, 2)
                .toUpperCase()}
        </div>
    );
}

/* =============================================================
   ORDER STATUS BADGE
============================================================= */

function OrderStatusBadge({
    status,
}: {
    status: string;
}) {
    const normalized =
        status.toUpperCase();

    let className =
        "bg-slate-100 text-slate-600 border-slate-200";

    if (
        normalized === "DELIVERED"
    ) {
        className =
            "bg-emerald-50 text-emerald-700 border-emerald-200";
    } else if (
        normalized === "CONFIRMED"
    ) {
        className =
            "bg-blue-50 text-blue-700 border-blue-200";
    } else if (
        normalized === "SHIPPED"
    ) {
        className =
            "bg-violet-50 text-violet-700 border-violet-200";
    } else if (
        normalized === "PENDING"
    ) {
        className =
            "bg-amber-50 text-amber-700 border-amber-200";
    } else if (
        normalized === "CANCELLED"
    ) {
        className =
            "bg-red-50 text-red-600 border-red-200";
    }

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold ${className}`}
        >
            {normalized ===
                "DELIVERED" && (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                )}

            {normalized ===
                "SHIPPED" && (
                    <Truck className="mr-1 h-3 w-3" />
                )}

            {normalized ===
                "PENDING" && (
                    <Clock3 className="mr-1 h-3 w-3" />
                )}

            {normalized ===
                "CANCELLED" && (
                    <XCircle className="mr-1 h-3 w-3" />
                )}

            {capitalize(
                normalized
            )}
        </span>
    );
}

/* =============================================================
   STOCK BADGE
============================================================= */

function StockBadge({
    stock,
}: {
    stock: number;
}) {
    const critical =
        stock <= 3;

    return (
        <span
            className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${critical
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}
        >
            {stock} left
        </span>
    );
}

/* =============================================================
   EMPTY
============================================================= */

function EmptyState({
    icon: Icon,
    text,
}: {
    icon: React.ElementType;
    text: string;
}) {
    return (
        <div className="flex min-h-[180px] flex-col items-center justify-center p-6 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-3 text-sm text-slate-500">
                {text}
            </p>

        </div>
    );
}

/* =============================================================
   LOADING
============================================================= */

function DashboardSkeleton() {
    return (
        <div className="space-y-5 sm:space-y-6">

            <div className="h-48 animate-pulse rounded-3xl bg-slate-200 sm:h-52" />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

                {Array.from({
                    length: 4,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-36 animate-pulse rounded-3xl bg-slate-200"
                    />
                ))}

            </div>

            <div className="grid gap-5 lg:grid-cols-3">

                <div className="h-[360px] animate-pulse rounded-3xl bg-slate-200 lg:col-span-2" />

                <div className="h-[360px] animate-pulse rounded-3xl bg-slate-200" />

            </div>

            <div className="h-80 animate-pulse rounded-3xl bg-slate-200" />

        </div>
    );
}

/* =============================================================
   FORMATTERS
============================================================= */

function formatNumber(
    value: number
) {
    return new Intl.NumberFormat(
        "en-IN",
        {
            maximumFractionDigits: 0,
        }
    ).format(value || 0);
}

function formatCompact(
    value: number
) {
    if (value >= 100000) {
        return `₹${(
            value / 100000
        ).toFixed(1)}L`;
    }

    if (value >= 1000) {
        return `₹${(
            value / 1000
        ).toFixed(0)}K`;
    }

    return `₹${value}`;
}

function formatDate(
    value: string
) {
    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone:
                "Asia/Kolkata",
        }
    ).format(
        new Date(value)
    );
}

function capitalize(
    value: string
) {
    return (
        value.charAt(0) +
        value
            .slice(1)
            .toLowerCase()
    );
}

/* =============================================================
   COLORS
============================================================= */

const ORDER_COLORS = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
];

const CATEGORY_COLORS = [
    "#059669",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
];