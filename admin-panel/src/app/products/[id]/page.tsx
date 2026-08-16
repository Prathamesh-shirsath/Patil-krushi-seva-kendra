"use client";

import { use } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Pencil,
  Package,
  IndianRupee,
  Boxes,
  CheckCircle2,
  XCircle,
  Wheat,
} from "lucide-react";

import { useProduct } from "@/hooks/use-products";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import DashboardLayout from "@/components/layout/dashboard-layout";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({
  params,
}: Props) {
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
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-green-600" />

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
        <div className="space-y-6">

          <Button
            variant="ghost"
            asChild
            className="-ml-3"
          >
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
            <h2 className="font-semibold">
              Product not found
            </h2>

            <p className="mt-1 text-sm">
              The requested product could not be loaded.
            </p>
          </div>

        </div>
      </DashboardLayout>
    );
  }

  const price = Number(product.price ?? 0);
  const stock = Number(product.stock ?? 0);

  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <Button
              variant="ghost"
              asChild
              className="-ml-3 mb-3"
            >
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-3">

              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                {product.name}
              </h1>

              {product.status ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              ) : (
                <Badge variant="secondary">
                  Inactive
                </Badge>
              )}

            </div>

            <p className="mt-2 text-sm text-slate-500">
              View detailed product specifications.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Button
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <Link href={`/products/${product.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-xl bg-green-600 hover:bg-green-700"
            >
              <Link href="/products/new">
                Add New Product
              </Link>
            </Button>

          </div>

        </div>

        {/* Product Information */}
        <div className="grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Package className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Product Information
                </h2>

                <p className="text-sm text-slate-500">
                  Basic product details
                </p>
              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-[220px_1fr]">

              {/* Image */}
              <div className="flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full max-h-[260px] w-full object-contain p-5"
                  />
                ) : (
                  <Package className="h-16 w-16 text-slate-300" />
                )}

              </div>

              {/* Details */}
              <div className="grid gap-5 sm:grid-cols-2">

                <DetailItem
                  label="Product Name"
                  value={product.name}
                />

                <DetailItem
                  label="Brand"
                  value={product.brandName || "-"}
                />

                <DetailItem
                  label="Category"
                  value={product.categoryName || "-"}
                />

                <DetailItem
                  label="Pack Size"
                  value={product.packSize || "-"}
                />

                <DetailItem
                  label="Price"
                  value={`₹${price.toLocaleString("en-IN")}`}
                  icon={
                    <IndianRupee className="h-4 w-4" />
                  }
                />

                <DetailItem
                  label="Stock"
                  value={stock.toLocaleString("en-IN")}
                  icon={
                    <Boxes className="h-4 w-4" />
                  }
                />

                <div className="sm:col-span-2">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Slug
                  </p>

                  <p className="break-all text-sm font-medium text-slate-700">
                    {product.slug}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Status */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                {product.status ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>

              <div>
                <h2 className="font-semibold">
                  Product Status
                </h2>

                <p className="text-sm text-slate-500">
                  Customer visibility
                </p>
              </div>

            </div>

            {product.status ? (
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="font-semibold text-green-700">
                  Active
                </p>

                <p className="mt-1 text-sm text-green-600">
                  This product is visible to customers.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl bg-red-50 p-4">
                <p className="font-semibold text-red-700">
                  Inactive
                </p>

                <p className="mt-1 text-sm text-red-600">
                  This product is hidden from customers.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Description */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
              <Wheat className="h-5 w-5 text-yellow-600" />
            </div>

            <div>
              <h2 className="font-semibold">
                Description
              </h2>

              <p className="text-sm text-slate-500">
                Product information
              </p>
            </div>

          </div>

          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
            {product.description || "No description available."}
          </p>

        </div>

        {/* Crops */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-4 font-semibold">
            Suitable For Crops
          </h2>

          {product.usedForCrops?.length ? (
            <div className="flex flex-wrap gap-2">

              {product.usedForCrops.map((crop) => (
                <Badge
                  key={crop}
                  variant="secondary"
                  className="rounded-full px-4 py-2"
                >
                  {crop}
                </Badge>
              ))}

            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No crops specified.
            </p>
          )}

        </div>

        {/* Variants */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">
            <h2 className="font-semibold">
              Product Variants
            </h2>

            <p className="text-sm text-slate-500">
              Available pack sizes and prices.
            </p>
          </div>

          {!product.variants?.length ? (
            <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
              No variants added.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <p className="font-medium">
                    {variant.packSize}
                  </p>

                  <p className="mt-2 text-lg font-bold text-green-700">
                    ₹
                    {Number(
                      variant.price
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>

      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">

        {icon}

        <span className="break-words">
          {value}
        </span>

      </div>

    </div>
  );
}