"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import ProductStatsCard from "@/components/cards/product-stats-card";
import ProductsTable from "@/components/tables/products-table";
import AddProductDialog from "@/components/dialogs/add-product-dialog";

import { Button } from "@/components/ui/button";

import {
    Download,
    Package,
    CheckCircle2,
    PauseCircle,
    Tags,
} from "lucide-react";

export default function ProductsPage() {
    return (
        <DashboardLayout>

            <div className="space-y-8">

                {/* Header */}

                <div
                    className="
                        rounded-3xl
                        border
                        border-green-100
                        bg-white
                        p-6
                        shadow-sm
                        flex
                        flex-col
                        gap-5
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">

                            Products Management

                        </h1>

                        <p className="mt-1 text-slate-500">

                            Manage all agricultural products, pricing,
                            stock and availability.

                        </p>

                    </div>

                    <div className="flex flex-wrap items-center gap-3">

                        <AddProductDialog />

                        <Button
                            variant="outline"
                            className="
                                rounded-2xl
                                border-slate-200
                                px-6
                            "
                        >

                            <Download
                                className="mr-2 h-4 w-4"
                            />

                            Export

                        </Button>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                    <ProductStatsCard
                        title="Total Products"
                        value={120}
                        subtitle="All products"
                        icon={
                            <Package
                                size={24}
                                className="text-green-600"
                            />
                        }
                        iconBg="bg-green-100"
                    />

                    <ProductStatsCard
                        title="Active Products"
                        value={98}
                        subtitle="Published"
                        icon={
                            <CheckCircle2
                                size={24}
                                className="text-emerald-600"
                            />
                        }
                        iconBg="bg-emerald-100"
                    />

                    <ProductStatsCard
                        title="Inactive Products"
                        value={22}
                        subtitle="Hidden"
                        icon={
                            <PauseCircle
                                size={24}
                                className="text-orange-500"
                            />
                        }
                        iconBg="bg-orange-100"
                    />

                    <ProductStatsCard
                        title="Low Stock"
                        value={15}
                        subtitle="Need restocking"
                        icon={
                            <Tags
                                size={24}
                                className="text-violet-600"
                            />
                        }
                        iconBg="bg-violet-100"
                    />

                </div>

                {/* Table */}

                <ProductsTable />

            </div>

        </DashboardLayout>
    );
}