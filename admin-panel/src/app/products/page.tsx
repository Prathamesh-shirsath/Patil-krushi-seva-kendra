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

export default function ProductsPage() {

    const { data } = useProducts({
        page: 1,
        limit: 1000,
    });

    const products = data?.data ?? [];

    const totalProducts = products.length;

    const activeProducts =
        products.filter((p: { status: any; }) => p.status).length;

    const inactiveProducts =
        products.filter((p: { status: any; }) => !p.status).length;

    const lowStockProducts =
        products.filter((p: { stock: number; }) => p.stock < 10).length;

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h1 className="text-3xl font-bold tracking-tight">

                        Products

                    </h1>

                    <p className="text-muted-foreground">

                        Manage all agricultural products.

                    </p>

                </div>

                <div className="flex gap-3">

                    <Button
                        variant="outline"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>

                    <Button asChild>

                        <Link href="/products/new">

                            <Plus className="mr-2 h-4 w-4" />

                            Add Product

                        </Link>

                    </Button>

                </div>

            </div>

            {/* Stats */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <ProductStatsCard
                    title="Total Products"
                    value={totalProducts}
                    subtitle="All Products"
                    icon={
                        <Package className="h-6 w-6 text-green-600" />
                    }
                    iconBg="bg-green-100"
                />

                <ProductStatsCard
                    title="Active"
                    value={activeProducts}
                    subtitle="Visible Products"
                    icon={
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    }
                    iconBg="bg-emerald-100"
                />

                <ProductStatsCard
                    title="Inactive"
                    value={inactiveProducts}
                    subtitle="Hidden Products"
                    icon={
                        <PauseCircle className="h-6 w-6 text-orange-500" />
                    }
                    iconBg="bg-orange-100"
                />

                <ProductStatsCard
                    title="Low Stock"
                    value={lowStockProducts}
                    subtitle="Need Restocking"
                    icon={
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    }
                    iconBg="bg-red-100"
                />

            </div>

            {/* Table */}

            <ProductsTable />

        </div>

    );

}