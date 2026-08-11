"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ChevronRight,
  Sprout,
  Package,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  DEFAULT_BRAND_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

import { useBrands } from "@/hooks/use-brands";

interface Brand {
  id: string;
  name: string;
  description?: string | null;
  logo?: string | null;
  status?: boolean;
  _count?: {
    products?: number;
  };
}

export default function BrandsOverviewPage() {
  const {
    data: brands = [],
    isLoading,
    isError,
  } = useBrands();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />

          <p className="mt-3 text-sm text-slate-500">
            Loading brands...
          </p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="font-semibold text-red-700">
            Unable to load brands
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 text-slate-800">
      {/* Breadcrumb */}

      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-500 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />

          <span className="font-semibold text-slate-900">
            Brands
          </span>
        </div>
      </div>

      {/* Header */}

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex rounded-full bg-green-100/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-700">
            Authorized Partners
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Top Agricultural Brands
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We partner with trusted agricultural
            manufacturers to provide original seeds,
            fertilizers, pesticides and crop solutions.
          </p>
        </div>

        {/* Brands Grid */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand: Brand) => {
            const productCount =
              brand._count?.products ?? 0;

            const isActive =
              brand.status !== false;

            /*
             * IMPORTANT:
             * Send BRAND ID to Shop page.
             */
            const shopUrl =
              `/shop?brandId=${encodeURIComponent(
                brand.id
              )}`;

            return (
              <Card
                key={brand.id}
                className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
              >
                <CardContent className="flex h-full min-h-[320px] flex-col p-5 sm:p-7">
                  {/* Brand Header */}

                  <div className="flex-1">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white p-2">
                        <Image
                          src={getImageSrc(
                            brand.logo,
                            DEFAULT_BRAND_IMAGE
                          )}
                          alt={`${brand.name} logo`}
                          width={50}
                          height={50}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold text-slate-900">
                          {brand.name}
                        </h2>

                        <span className="text-xs font-semibold text-green-700">
                          Trusted Agricultural Brand
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-4 min-h-[80px] text-sm leading-5 text-slate-500">
                      {brand.description ||
                        "Premium agricultural products and farming solutions."}
                    </p>
                  </div>

                  {/* Stats */}

                  <div className="my-4 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 shrink-0 text-green-600" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {productCount}
                        </p>

                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Products
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Sprout className="h-4 w-4 shrink-0 text-green-600" />

                      <div>
                        <p
                          className={
                            isActive
                              ? "text-sm font-bold text-green-700"
                              : "text-sm font-bold text-red-500"
                          }
                        >
                          {isActive
                            ? "Active"
                            : "Inactive"}
                        </p>

                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Status
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explore Products */}

                  {isActive ? (
                    <Link
                      href={shopUrl}
                      className="block w-full"
                    >
                      <Button
                        type="button"
                        className="h-11 w-full rounded-xl bg-green-700 text-sm font-semibold text-white hover:bg-green-800"
                      >
                        Explore Products

                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      type="button"
                      disabled
                      className="h-11 w-full rounded-xl bg-slate-200 text-sm font-semibold text-slate-500"
                    >
                      Currently Unavailable
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty */}

        {!brands.length && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
            <Package className="mx-auto h-10 w-10 text-slate-300" />

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              No brands found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no agricultural
              brands available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}