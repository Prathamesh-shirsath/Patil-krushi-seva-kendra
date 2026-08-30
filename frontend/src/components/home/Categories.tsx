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
    <section className="w-full overflow-hidden bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-5 md:px-8 lg:px-12">

        {/* ================= HEADER ================= */}
        <div className="mb-7 text-center sm:mb-8 md:mb-10 md:text-left">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 sm:px-4 sm:py-2 sm:text-sm">
            Featured Categories
          </span>

          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600 sm:mt-3 sm:text-base md:mx-0">
            Browse essential farming products by category.
          </p>
        </div>

        {/* ================= CATEGORY GRID ================= */}
        <div
          className="
            grid
            grid-cols-2
            gap-x-3
            gap-y-7
            xs:grid-cols-3
            sm:grid-cols-4
            sm:gap-x-5
            sm:gap-y-8
            md:grid-cols-5
            md:gap-x-6
            lg:grid-cols-6
            lg:gap-x-7
            lg:gap-y-10
            xl:grid-cols-7
            2xl:grid-cols-8
          "
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex min-w-0 flex-col items-center"
                >
                  {/* Circular skeleton */}
                  <div className="h-24 w-24 animate-pulse rounded-full border border-gray-200 bg-gray-100 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36" />

                  {/* Text skeleton */}
                  <div className="mt-3 h-4 w-20 animate-pulse rounded bg-gray-200 sm:w-24" />
                </div>
              ))
            : categories.map((category) => {
                const image = getImageSrc(category.image, "");

                return (
                  <Link
                    key={category.id}
                    href={`/categories?name=${category.slug}`}
                    className="
                      group
                      flex
                      min-w-0
                      flex-col
                      items-center
                      outline-none
                    "
                  >
                    {/* ================= CIRCLE ================= */}
                    <Card
                      className="
                        relative
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        p-1
                        shadow-sm
                        transition-all
                        duration-300
                        ease-out

                        group-hover:-translate-y-1
                        group-hover:border-green-400
                        group-hover:shadow-lg
                        group-hover:shadow-green-900/10

                        group-focus-visible:ring-2
                        group-focus-visible:ring-green-500
                        group-focus-visible:ring-offset-2

                        sm:h-28
                        sm:w-28
                        sm:p-1.5

                        md:h-32
                        md:w-32

                        lg:h-36
                        lg:w-36
                        lg:p-2

                        motion-reduce:transform-none
                        motion-reduce:transition-none
                      "
                    >
                      {/* Green hover ring */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          rounded-full
                          border-2
                          border-transparent
                          transition-all
                          duration-300
                          group-hover:border-green-400
                        "
                      />

                      {/* Image */}
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          bg-gray-50
                          transition-all
                          duration-300
                          group-hover:bg-green-50
                        "
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={category.name}
                            loading="lazy"
                            className="
                              h-full
                              w-full
                              object-contain
                              p-2
                              transition-transform
                              duration-500
                              ease-out
                              group-hover:scale-110

                              sm:p-2.5
                              md:p-3

                              motion-reduce:transform-none
                              motion-reduce:transition-none
                            "
                          />
                        ) : category.name ? (
                          <span
                            className="
                              text-base
                              font-extrabold
                              text-green-700
                              transition-transform
                              duration-300
                              group-hover:scale-110
                            "
                          >
                            {category.name.slice(0, 2).toUpperCase()}
                          </span>
                        ) : (
                          <Sprout className="h-7 w-7 text-green-600" />
                        )}
                      </div>
                    </Card>

                    {/* ================= CATEGORY NAME ================= */}
                    <span
                      className="
                        mt-2.5
                        max-w-[110px]
                        truncate
                        text-center
                        text-xs
                        font-semibold
                        leading-tight
                        text-gray-700
                        transition-colors
                        duration-200
                        group-hover:text-green-700

                        sm:mt-3
                        sm:max-w-[130px]
                        sm:text-sm

                        md:max-w-[150px]
                      "
                      title={category.name}
                    >
                      {category.name}
                    </span>
                  </Link>
                );
              })}
        </div>

        {/* ================= EMPTY STATE ================= */}
        {!isLoading && categories.length === 0 ? (
          <div className="py-10 text-center sm:py-14">
            <Sprout className="mx-auto mb-3 h-8 w-8 text-green-500" />

            <p className="text-sm text-gray-500 sm:text-base">
              No categories available.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}