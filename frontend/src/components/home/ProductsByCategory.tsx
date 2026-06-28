"use client";

import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";

import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { getImageSrc } from "@/lib/image-fallbacks";
import type { Category } from "@/services/category.service";

function getProductCount(category: Category) {
  return category._count?.products ?? category.products?.length ?? 0;
}

function ProductsByCategorySkeleton() {
  return (
    <Card className="h-[176px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="h-[104px] bg-gray-200 animate-pulse" />
      <div className="p-3">
        <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-3 w-16 rounded bg-gray-200 animate-pulse" />
      </div>
    </Card>
  );
}

export default function ProductsByCategory() {
  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  const availableCategories = categories
    .filter((category) => category.status !== false)
    .filter((category) => getProductCount(category) > 0)
    .slice(0, 6);

  return (
    <section className="w-full bg-white py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Products by Category
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              Explore Farming Essentials
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Browse popular product groups and find the right solutions for your farm.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-green-700 transition-colors hover:text-green-800"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <ProductsByCategorySkeleton key={index} />
            ))
            : availableCategories.map((category) => {
              const image = getImageSrc(category.image, "");
              const productCount = getProductCount(category);

              return (
                <Link
                  key={category.id}
                  href={`/categories?name=${category.slug}`}
                  className="group block"
                >
                  <Card className="h-[176px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                    <div className="relative flex h-[104px] items-center justify-center overflow-hidden bg-green-50/40 p-4">
                      {image ? (
                        <img
                          src={image}
                          alt={category.name}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white">
                          <Sprout className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h3 className="line-clamp-1 text-sm font-extrabold text-gray-950 transition-colors group-hover:text-green-700">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                        {productCount} {productCount === 1 ? "Product" : "Products"}
                      </p>
                    </div>
                  </Card>
                </Link>
              );
            })}
        </div>

        {!isLoading && availableCategories.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No categories available.
          </p>
        ) : null}
      </div>
    </section>
  );
}
