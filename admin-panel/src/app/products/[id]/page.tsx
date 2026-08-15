"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Package,
  Tag,
  Layers3,
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

          <div>
            <Button
              variant="ghost"
              asChild
              className="mb-4"
            >
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>

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

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <Button
              variant="ghost"
              asChild
              className="mb-3 -ml-3"
            >
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Product Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View detailed product specifications.
            </p>

          </div>

          <div className="flex gap-3">

            <Button
              variant="outline"
              asChild
              className="rounded-xl"
            >
              <Link
                href={`/products/${product.id}/edit`}
              >
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

        {/* =================================================
                    MAIN GRID
                ================================================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Product Information */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Package className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Product Information
                </h2>

                <p className="text-sm text-slate-500">
                  Basic product details
                </p>
              </div>

            </div>

            <div className="grid gap-6 md:grid-cols-[220px_1fr]">

              {/* Image */}

              <div className="flex h-[220px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-5"
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
                  value={
                    product.brandName || "-"
                  }
                />

                <DetailItem
                  label="Category"
                  value={
                    product.categoryName || "-"
                  }
                />

                <DetailItem
                  label="Pack Size"
                  value={
                    product.packSize || "-"
                  }
                />

                <DetailItem
                  label="Slug"
                  value={product.slug}
                />

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                    Status
                  </p>

                  {product.status ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                    >
                      <XCircle className="mr-1 h-3.5 w-3.5" />
                      Inactive
                    </Badge>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Pricing */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <IndianRupee className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Pricing
                </h2>

                <p className="text-sm text-slate-500">
                  Current pricing
                </p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-slate-500">
                  Price
                </p>

                <p className="mt-1 text-2xl font-bold text-green-700">
                  ₹
                  {price.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div className="border-t pt-5">
                <p className="text-sm text-slate-500">
                  Stock
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {product.stock ?? 0}
                </p>
              </div>

            </div>

          </div>

          {/* Description */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>

              <h2 className="text-lg font-semibold">
                Product Description
              </h2>

            </div>

            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {product.description ||
                "No description available."}
            </p>

          </div>

          {/* Inventory */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <Boxes className="h-5 w-5 text-orange-600" />
              </div>

              <h2 className="text-lg font-semibold">
                Inventory
              </h2>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Available Stock
                </span>

                <span className="font-semibold">
                  {product.stock ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Pack Size
                </span>

                <span className="font-semibold">
                  {product.packSize || "-"}
                </span>
              </div>

            </div>

          </div>

          {/* Crops */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                <Wheat className="h-5 w-5 text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Suitable Crops
                </h2>

                <p className="text-sm text-slate-500">
                  Crops for which this product is recommended
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              {product.usedForCrops?.length ? (
                product.usedForCrops.map(
                  (crop: string) => (
                    <Badge
                      key={crop}
                      variant="outline"
                      className="rounded-full px-4 py-2"
                    >
                      {crop}
                    </Badge>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No crop information available.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="font-medium text-slate-900">
        {value}
      </p>
    </div>
  );
}