"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import BrandsTable from "@/components/tables/brands-table";

export default function BrandsPage() {
    return (
        <DashboardLayout>

            <div className="mx-auto max-w-[1500px] space-y-8">


                {/* Header */}
                <div className="rounded-3xl border border-green-100 bg-white/80 backdrop-blur-md p-6 shadow-sm flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">
                            Brands Management
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Manage all agricultural product brands
                        </p>

                    </div>

                </div>

                <BrandsTable />

            </div>

        </DashboardLayout>
    );
}