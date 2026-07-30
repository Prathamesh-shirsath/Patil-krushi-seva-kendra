"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductForm from "@/components/forms/product/product-form";

export default function AddProductPage() {
    const router = useRouter();

    return (
        <div className="space-y-6">
            <div className="sticky top-0 z-20 flex items-center justify-between rounded-xl border bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div>
                    <Link
                        href="/products"
                        className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </Link>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Add New Product
                    </h1>

                    <p className="text-muted-foreground">
                        Fill all product information carefully before saving.
                    </p>
                </div>
            </div>

            <Card className="rounded-2xl shadow-sm">
                <CardContent className="p-6">
                    <ProductForm
                        onSuccess={() => router.push("/products")}
                    />
                </CardContent>
            </Card>
        </div>
    );
}