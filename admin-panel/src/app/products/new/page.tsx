"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import ProductForm from "@/components/forms/product/product-form";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function AddProductPage() {
    const router = useRouter();

    return (
        <DashboardLayout>

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4">

                    <Button
                        variant="ghost"
                        asChild
                        className="w-fit -ml-3"
                    >
                        <Link href="/products">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Products
                        </Link>
                    </Button>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                            Add New Product
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Fill all product information carefully before saving.
                        </p>
                    </div>

                </div>

                {/* Form */}
                <Card className="rounded-3xl border border-slate-200 shadow-sm">
                    <CardContent className="p-4 sm:p-6 lg:p-8">

                        <ProductForm
                            onSuccess={() => {
                                router.push("/products");
                            }}
                        />

                    </CardContent>
                </Card>

            </div>

        </DashboardLayout>
    );
}