"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Keyboard } from "swiper/modules";
import { useBrands } from "@/hooks/use-brands";
import { getImageSrc } from "@/lib/image-fallbacks";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import "swiper/css";

type Brand = {
  id: string | number;
  slug: string;
  name: string;
  logo?: string | null;
  status: boolean;
};

function BrandSkeleton() {
  return (
    <Card className="h-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <CardContent className="flex h-full items-center gap-3 p-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-4 w-24 rounded bg-gray-200 animate-pulse" />
      </CardContent>
    </Card>
  );
}

export default function Brands() {
  const {
    data: brands = [],
    isLoading,
  } = useBrands() as { data?: Brand[]; isLoading: boolean };

  const activeBrands = brands.filter((brand) => brand.status === true);
  const marqueeBrands =
    activeBrands.length > 0
      ? Array.from({
        length: Math.max(1, Math.ceil(14 / activeBrands.length)),
      }).flatMap(() => activeBrands)
      : [];

  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              Trusted Partners
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 md:text-5xl">
              Top Agricultural Brands
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Shop trusted agricultural brands selected for quality, reliability, and farmer confidence.
            </p>
          </div>

          <Link
            href="/brands"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-green-700 transition-colors hover:text-green-800"
          >
            View All Brands
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={2.05}
            watchOverflow
            breakpoints={{
                320: {
                 slidesPerView: 2.05,
                 spaceBetween: 16,
                },
                480: {
                  slidesPerView: 2.5,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1536: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
            }}
            className="!overflow-visible"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <SwiperSlide key={index} className="h-auto">
                <BrandSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : activeBrands.length > 0 ? (
          <div className="relative">
            

            <Swiper
              modules={[Autoplay, FreeMode, Keyboard]}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              speed={7000}
              loop
              freeMode={{
                enabled: true,
                momentum: false,
              }}
              keyboard={{
                enabled: true,
              }}
            
              grabCursor
              centeredSlides={false}
              watchOverflow
              spaceBetween={16}
              slidesPerView={2.05}
              breakpoints={{
                320: {
                 slidesPerView: 2.05,
                 spaceBetween: 16,
                },
                480: {
                  slidesPerView: 2.5,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1536: {
                  slidesPerView: 6,
                  spaceBetween: 24,
                },
              }}
              className="brands-marquee-swiper overflow-visible"
            >
              {marqueeBrands.map((brand: Brand, index) => {
                const logo = getImageSrc(brand.logo, "");

                return (
                  <SwiperSlide key={`${brand.id}-${index}`} className="h-auto">
                    <Link
                      href={`/brands/${brand.slug}`}
                      aria-label={`View ${brand.name} brand details`}
                      className="group block"
                    >
                      <Card className="h-24 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-300 hover:bg-green-50/20 hover:shadow-lg hover:shadow-green-950/10 motion-reduce:transform-none motion-reduce:transition-none">
                        <CardContent className="flex h-full items-center gap-3 p-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50 text-sm font-extrabold text-green-800 transition-colors duration-300 ease-out group-hover:bg-green-100 motion-reduce:transition-none">
                            {logo ? (
                              <Image
                                src={logo}
                                alt={brand.name}
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none"
                                unoptimized={false}
                              />
                            ) : (
                              <span className="transition-transform duration-300 ease-out group-hover:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none">
                                {brand.name
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>

                          <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-gray-900 transition-colors duration-200 ease-out group-hover:text-green-700">
                            {brand.name}
                          </h3>
                        </CardContent>
                      </Card>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No brands available.
          </p>
        )}
      </div>

      <style jsx global>{`
        .brands-marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
