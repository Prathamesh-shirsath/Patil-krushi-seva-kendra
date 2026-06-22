"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProductStatsCard from "@/components/cards/product-stats-card";
import ProductsTable from "@/components/tables/products-table";
import AddProductDialog from "@/components/dialogs/add-product-dialog";

import { Button } from "@/components/ui/button";

import {
    Plus,
    Download,
    Package,
    CheckCircle2,
    PauseCircle,
    Tags,
} from "lucide-react";

export default function ProductsPage() {
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-[1500px] space-y-8">

                {/* Header */}
                <div className="flex items-start justify-between">

                    <div>
                        <h1 className="text-4xl font-bold text-slate-900">
                            Products
                        </h1>

                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                            <span>Home</span>
                            <span>›</span>
                            <span className="text-slate-900">Products</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <AddProductDialog />

                        <Button
                            variant="outline"
                            className="h-12 rounded-2xl border-slate-200 px-6"
                        >
                            <Download className="mr-2 h-5 w-5" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <ProductStatsCard
                        title="Total Products"
                        value={120}
                        subtitle="All products in store"
                        icon={<Package className="text-green-600" size={24} />}
                        iconBg="bg-green-100"
                    />

                    <ProductStatsCard
                        title="Active Products"
                        value={98}
                        subtitle="Published products"
                        icon={<CheckCircle2 className="text-emerald-600" size={24} />}
                        iconBg="bg-emerald-100"
                    />

                    <ProductStatsCard
                        title="Inactive Products"
                        value={22}
                        subtitle="Unpublished products"
                        icon={<PauseCircle className="text-orange-500" size={24} />}
                        iconBg="bg-orange-100"
                    />

                    <ProductStatsCard
                        title="Low Stock"
                        value={15}
                        subtitle="Products with low stock"
                        icon={<Tags className="text-violet-600" size={24} />}
                        iconBg="bg-violet-100"
                    />

                </div>

                {/* Products Table */}
                <ProductsTable />
            </div>
        </DashboardLayout>
    );
}
