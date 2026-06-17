
"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  {
    image: "/banners/banner.webp",
  },
  {
    image: "/banners/banner1.webp",
  },
  {
    image: "/banners/banner2.webp",
  },
];

export default function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="
                relative
                h-[70vh]
                md:h-[80vh]
                bg-cover
                bg-center
              "
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center">
                <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">

                  <div className="max-w-2xl">

                    {/* Badge */}
                    <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm font-medium text-white">
                      🌱 Trusted by 10,000+ Farmers
                    </span>

                    {/* Heading */}
                    <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white">
                      All Your Farming
                      <span className="block text-green-400">
                        Needs In One Place
                      </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-5 text-lg text-gray-200 max-w-xl">
                      Premium quality seeds, fertilizers, pesticides and
                      expert agricultural solutions for modern farmers.
                    </p>

                    {/* Trust Chips */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm text-white">
                        🚚 Free Delivery
                      </span>

                      <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm text-white">
                        ✅ Genuine Products
                      </span>

                      <span className="rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm text-white">
                        🌾 Expert Support
                      </span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        className="
                          bg-green-600
                          hover:bg-green-700
                          px-8
                          shadow-lg
                        "
                      >
                        🛒 Shop Products
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="
                          border-white
                          text-white
                          bg-transparent
                          hover:bg-white
                          hover:text-black
                        "
                      >
                        🌱 Browse Categories
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-6 right-6 z-20">
                <div className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-xl">
                  🔥 Up To 30% OFF
                </div>
              </div>

              {/* Seasonal Badge */}
              <div className="absolute bottom-8 right-6 z-20">
                <div className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-xl">
                  🌱 Kharif Season Specials
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

