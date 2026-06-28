import ProductCard from "../common/ProductCard";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import type { ProductCardProduct } from "@/lib/product-mappers";

import "swiper/css";
import "swiper/css/navigation";

type HomeProductSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  products: ProductCardProduct[];
  isLoading: boolean;
  emptyMessage: string;
};

function ProductCardSkeleton() {
  return (
    <Card className="flex h-full min-h-[318px] overflow-hidden rounded-xl border border-gray-200 bg-white py-0 text-sm shadow-sm">
      <div className="relative flex h-[150px] shrink-0 items-center justify-center overflow-hidden bg-white px-4 py-3 sm:h-[158px]">
        <div className="h-full w-full rounded-lg bg-gray-200 animate-pulse" />
        <span className="absolute left-2.5 top-2.5 h-5 w-10 rounded-md bg-gray-200 animate-pulse" />
      </div>

      <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-0">
        <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-10 rounded bg-gray-200 animate-pulse" />
        <div className="mt-1.5 h-3 w-28 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-3 w-20 rounded bg-gray-200 animate-pulse" />
        <div className="mt-2 h-5 w-24 rounded bg-gray-200 animate-pulse" />

        <div className="mt-auto flex items-center gap-2 pt-2.5">
          <div className="h-11 flex-1 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-11 w-11 shrink-0 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomeProductSection({
  eyebrow,
  title,
  description,
  products,
  isLoading,
  emptyMessage,
}: HomeProductSectionProps) {
  const navigationClass = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">

        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              {eyebrow}
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              {description}
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-green-700 transition-colors hover:text-green-800"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label={`Previous ${title}`}
            className={`home-products-prev-${navigationClass} absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-green-800 shadow-lg transition-all hover:bg-green-700 hover:text-white lg:flex`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            aria-label={`Next ${title}`}
            className={`home-products-next-${navigationClass} absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-green-800 shadow-lg transition-all hover:bg-green-700 hover:text-white lg:flex`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.home-products-prev-${navigationClass}`,
              nextEl: `.home-products-next-${navigationClass}`,
            }}
            spaceBetween={16}
            slidesPerView={1}
            grabCursor
            watchOverflow
            breakpoints={{
              420: {
                slidesPerView: 1.25,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.15,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 22,
              },
              1280: {
                slidesPerView: 4.5,
                spaceBetween: 24,
              },
            }}
            className="!overflow-visible"
          >
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
              : products.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {!isLoading && products.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            {emptyMessage}
          </p>
        ) : null}

      </div>
    </section>
  );
}
