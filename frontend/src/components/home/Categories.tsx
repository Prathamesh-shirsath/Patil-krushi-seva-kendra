"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { getImageSrc } from "@/lib/image-fallbacks";

export default function Categories() {
  const {
    data: categories = [],
    isLoading,
  } = useCategories();

  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="mb-8 md:mb-10">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            Featured Categories
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
            Shop by Category
          </h2>

          <p className="mt-3 text-gray-600">
            Browse essential farming products by category.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="flex min-h-28 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-4 text-center transition-all duration-300"
              >
                <div className="mb-2.5 h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
              </Card>
            ))
            : categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories?name=${category.slug}`}
                className="block"
              >
                <Card
                  className="group flex min-h-28 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-4 text-center text-gray-700 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-300 hover:bg-green-50/30 hover:shadow-lg hover:shadow-green-950/10 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <div className="mb-2.5 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-gray-500 transition-all duration-300 ease-out group-hover:bg-green-100 group-hover:text-green-700 motion-reduce:transition-none">
                    {getImageSrc(category.image, "") ? (
                      <img
                        src={getImageSrc(category.image, "")}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    ) : category.name ? (
                      <span className="text-sm font-extrabold transition-transform duration-300 ease-out group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none">
                        {category.name
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    ) : (
                      <Sprout className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none" />
                    )}
                  </div>

                  <span className="text-xs font-bold tracking-tight transition-colors duration-200 ease-out group-hover:text-green-700">
                    {category.name}
                  </span>
                </Card>
              </Link>
            ))}
        </div>

        {!isLoading && categories.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No categories available.
          </p>
        ) : null}
      </div>
    </section>
  );
}
