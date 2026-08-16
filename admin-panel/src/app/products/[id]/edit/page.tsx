"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Package,
    IndianRupee,
    Boxes,
} from "lucide-react";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProductForm from "@/components/forms/product/product-form";
import { useProduct } from "@/hooks/use-products";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditProductPage({ params }: Props) {
    const router = useRouter();
    const { id } = use(params);

    const {
        data: product,
        isLoading,
        isError,
    } = useProduct(id);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
                        <p className="text-sm text-slate-500">
                            Loading product...
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (isError || !product) {
        return (
            <DashboardLayout>
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                    <p className="font-medium text-red-600">
                        Product not found
                    </p>
                    <button
                        onClick={() => router.push("/products")}
                        className="mt-4 text-sm font-medium text-red-700 underline"
                    >
                        Back to Products
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mx-auto w-full max-w-[1500px] space-y-6">

                {/* Back */}
                <button
                    type="button"
                    onClick={() => router.push("/products")}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-green-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </button>

                {/* Page Header */}
                <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="flex min-w-0 items-center gap-4">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-50">
                                <Package className="h-7 w-7 text-green-600" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
                                    Editing Product
                                </p>

                                <h1 className="mt-1 truncate text-2xl font-bold text-slate-900 sm:text-3xl">
                                    {product.name}
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    {product.brandName || "No Brand"}{" "}
                                    <span className="mx-1">•</span>
                                    {product.categoryName || "No Category"}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <div className="min-w-[110px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <IndianRupee className="h-3.5 w-3.5" />
                                    Price
                                </div>

                                <p className="mt-1 text-lg font-bold text-slate-900">
                                    ₹{Number(product.price).toLocaleString("en-IN")}
                                </p>
                            </div>

                            <div className="min-w-[110px] rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Boxes className="h-3.5 w-3.5" />
                                    Stock
                                </div>

                                <p className="mt-1 text-lg font-bold text-slate-900">
                                    {product.stock ?? 0}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Form */}
                <ProductForm
                    mode="edit"
                    product={product}
                    onSuccess={() => router.push("/products")}
                />

            </div>
        </DashboardLayout>
    );
}