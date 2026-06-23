"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import BrandsTable from "@/components/tables/brands-table";

export default function BrandsPage() {
    return (
        <DashboardLayout>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-950">
                    Brands
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage all product brands and their information.
                </p>
            </div>

            <BrandsTable />

        </DashboardLayout>
    );
}