"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import ProductForm from "@/components/forms/product/product-form";
import { useProduct } from "@/hooks/use-products";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function EditProductPage({
    params,
}: Props) {
    const router = useRouter();

    const { id } = use(params);

    const {
        data: product,
        isLoading,
        isError,
    } = useProduct(id);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-green-600" />

                    <p className="text-sm text-slate-500">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                <h2 className="font-semibold">
                    Product not found
                </h2>

                <p className="mt-1 text-sm">
                    The requested product could not be loaded.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                    Edit Product
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Update product details, pricing and inventory.
                </p>
            </div>

            <ProductForm
                mode="edit"
                product={product}
                onSuccess={() => {
                    router.push("/products");
                }}
            />

        </div>
    );
}