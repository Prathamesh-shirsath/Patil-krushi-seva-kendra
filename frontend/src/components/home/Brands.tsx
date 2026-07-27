"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import { useBrands } from "@/hooks/use-brands";
import { getImageSrc } from "@/lib/image-fallbacks";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import "swiper/css";

type Brand = {
  id: string;
  name: string;
  logo?: string | null;
  status: boolean;
};

import "swiper/css";

export default function Brands() {

  const {
    data: brands = [],
    isLoading,
  } = useBrands();

  const activeBrands = brands.filter((brand) => brand.status === true);

  return (
    <section className="py-12">
      <div className="w-full px-4 md:px-8 lg:px-12">

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-green-600 font-semibold">
              🌱 Trusted Partners
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Top Agricultural Brands
            </h2>
          </div>
        </div>

        {/* Loading */}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border-0
                  bg-white
                  shadow-md
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className="mb-4 h-16 w-16 rounded-full bg-gray-200 animate-pulse" />

                  <div className="h-6 w-24 rounded bg-gray-200 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : activeBrands.length > 0 ? (
          <Swiper
            modules={[Autoplay, Keyboard]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={activeBrands.length > 3}
            keyboard={{
              enabled: true,
            }}
            grabCursor
            centeredSlides={false}
            watchOverflow
            spaceBetween={20}
            slidesPerView={2}
            slidesPerGroup={2}
            // Dev has few brands, so desktop shows 3 slides. With 15-20+ production brands, this can return to 5-6 slides without changing structure.
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            className="w-full"
          >
            {activeBrands.map((brand: Brand) => {
              const logo = getImageSrc(brand.logo, "");

              return (
                <SwiperSlide key={brand.id}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    aria-label={`View ${brand.name} brand details`}
                    className="block"
                  >
                    <Card
                      className="
                        group
                        overflow-hidden
                        rounded-3xl
                        border-0
                        bg-white
                        shadow-md
                        hover:shadow-2xl
                        hover:-translate-y-2
                        transition-all
                        duration-500
                      "
                    >
                      <CardContent className="flex flex-col items-center justify-center p-8">

                        <div className="mb-4">

                          {logo ? (
                            <img
                              src={logo}
                              alt={brand.name}
                              className="
                                h-16
                                w-16
                                object-contain
                                transition-all
                                duration-500
                                group-hover:scale-110
                              "
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center font-bold text-lg">
                              {brand.name
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          )}

                        </div>

                        <h3 className="font-bold text-lg text-gray-800 text-center">
                          {brand.name}
                        </h3>

                      </CardContent>
                    </Card>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (

          <div className="py-10 text-center text-sm text-gray-500">
            No brands available.
          </div>

        )}
      </div>
    </section>
  );
}