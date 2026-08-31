"use client";

import Link from "next/link";

import {
    Download,
    Package,
    CheckCircle2,
    PauseCircle,
    AlertTriangle,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import ProductStatsCard from "@/components/cards/product-stats-card";
import ProductsTable from "@/components/tables/products-table";

import { useProducts } from "@/hooks/use-products";

import DashboardLayout from "@/components/layout/dashboard-layout";

export default function ProductsPage() {
    const { data, isLoading } = useProducts({
        page: 1,
        limit: 1000,
        includeInactive: true,
    });

    const products = data?.data ?? [];

    const totalProducts = products.length;

    const activeProducts = products.filter(
        (product) => product.status === true
    ).length;

    const inactiveProducts = products.filter(
        (product) => product.status === false
    ).length;

    const lowStockProducts = products.filter(
        (product) => Number(product.stock ?? 0) < 10
    ).length;

    return (
        <DashboardLayout>
            <div className="w-full min-w-0 space-y-5 sm:space-y-6">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div
                    className="
                        w-full
                        rounded-3xl
                        border
                        border-emerald-100
                        bg-white
                        p-4
                        shadow-sm
                        sm:p-5
                        md:p-6
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-5
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        {/* TITLE */}

                        <div className="min-w-0">

                            <h1
                                className="
                                    text-2xl
                                    font-bold
                                    tracking-tight
                                    text-slate-800
                                    sm:text-3xl
                                "
                            >
                                Products Management
                            </h1>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                    sm:text-[15px]
                                "
                            >
                                Manage all agricultural products
                            </p>

                        </div>


                        {/* ACTIONS */}

                        <div
                            className="
                                flex
                                w-full
                                flex-col
                                gap-2
                                sm:w-auto
                                sm:flex-row
                            "
                        >

                            <Button
                                type="button"
                                variant="outline"
                                className="
                                    h-11
                                    w-full
                                    rounded-2xl
                                    border-slate-200
                                    bg-white
                                    px-5
                                    shadow-sm
                                    hover:bg-slate-50
                                    sm:w-auto
                                "
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>


                            <Button
                                asChild
                                className="
                                    h-11
                                    w-full
                                    rounded-2xl
                                    bg-emerald-600
                                    px-5
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    hover:bg-emerald-700
                                    sm:w-auto
                                "
                            >
                                <Link href="/products/new">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add Product
                                </Link>
                            </Button>

                        </div>

                    </div>
                </div>


                {/* =====================================================
                    STATS
                ===================================================== */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    <ProductStatsCard
                        title="Total Products"
                        value={isLoading ? 0 : totalProducts}
                        subtitle="All Products"
                        icon={
                            <Package className="h-6 w-6 text-white" />
                        }
                        iconBg="bg-emerald-600"
                    />


                    <ProductStatsCard
                        title="Active Products"
                        value={isLoading ? 0 : activeProducts}
                        subtitle="Visible Products"
                        icon={
                            <CheckCircle2 className="h-6 w-6 text-white" />
                        }
                        iconBg="bg-emerald-600"
                    />


                    <ProductStatsCard
                        title="Inactive Products"
                        value={isLoading ? 0 : inactiveProducts}
                        subtitle="Hidden Products"
                        icon={
                            <PauseCircle className="h-6 w-6 text-white" />
                        }
                        iconBg="bg-orange-500"
                    />


                    <ProductStatsCard
                        title="Low Stock"
                        value={isLoading ? 0 : lowStockProducts}
                        subtitle="Need Restocking"
                        icon={
                            <AlertTriangle className="h-6 w-6 text-white" />
                        }
                        iconBg="bg-red-500"
                    />

                </div>


                {/* =====================================================
                    PRODUCT MANAGEMENT
                ===================================================== */}

                <div
                    className="
                        w-full
                        min-w-0
                        rounded-3xl
                        border
                        border-emerald-100
                        bg-white
                        p-3
                        shadow-sm
                        sm:p-4
                        md:p-5
                        lg:p-6
                    "
                >
                    <ProductsTable />
                </div>

            </div>
        </DashboardLayout>
    );
}