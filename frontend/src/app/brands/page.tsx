"use client";

import Link from "next/link";
import Image from "next/image";

import {
  ChevronRight,
  Sprout,
  Package,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useBrands } from "@/hooks/use-brands";

export default function BrandsOverviewPage() {
  const {
    data: brands = [],
    isLoading,
  } = useBrands();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading Brands...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 text-slate-800">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center gap-1.5 px-4 py-3 text-xs font-medium text-slate-500 sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-green-700" >
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
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="rounded-full bg-green-100/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-700">
            Authorized Partners
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Top Agricultural Brands
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            We partner with trusted agricultural manufacturers to provide
            original seeds, fertilizers, pesticides and crop solutions.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand: any) => (
            <Card
              key={brand.id}
              className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
            >
              <CardContent className="flex h-full min-h-[320px] flex-col justify-between p-6 sm:p-8">
                <div className="flex-1">
                  {/* Brand Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-100 bg-white p-2">
                      <Image
                        src={
                          brand.logo ||
                          "/placeholder.png"
                        }
                        alt={brand.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        {brand.name}
                      </h2>

                      <span className="text-xs font-semibold text-green-700">
                        Trusted Agricultural Brand
                      </span>
                    </div>
                  </div>

                  <p className="line-clamp-4 text-sm text-slate-500">
                    {brand.description ||
                      "Premium agricultural products and farming solutions."}
                  </p>
                </div>

                {/* Stats */}
                <div className="my-4 grid grid-cols-2 gap-4 border-y py-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600" />

                    <div>
                      <p className="text-sm font-bold">
                        {brand._count?.products || 0}
                      </p>

                      <p className="text-[10px] uppercase text-slate-400">
                        Products
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-green-600" />

                    <div>
                      <p className="text-sm font-bold">
                        {brand.status
                          ? "Active"
                          : "Inactive"}
                      </p>

                      <p className="text-[10px] uppercase text-slate-400">
                        Status
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/brands/${brand.slug}`}
                >
                  <Button className="h-11 w-full rounded-xl bg-green-700 hover:bg-green-800">
                    Explore Products

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {!brands.length && (
          <div className="py-16 text-center text-slate-500">
            No brands found.
          </div>
        )}
      </section>
    </main>

  );
}