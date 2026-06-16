"use client";

import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  {
    title: "Quality Seeds For Better Harvest",
    description: "Premium quality seeds for maximum crop yield.",
    image: "/banners/banner.webp",
  },
  {
    title: "Best Fertilizers For Your Farm",
    description: "Boost soil fertility and plant growth.",
    image: "/banners/banner1.webp",
  },
  {
    title: "Modern Farming Solutions",
    description: "Advanced products for smart agriculture.",
    image: "/banners/banner2.webp",
  },
];

export default function HeroSlider() {
  return (
    <section className="py-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className="
                relative
                h-[300px]
                sm:h-[400px]
                md:h-[500px]
                lg:h-[650px]
                rounded-3xl
                overflow-hidden
                bg-cover
                bg-center
              "
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
                <div className="max-w-2xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                    {banner.title}
                  </h1>

                  <p className="mt-4 text-white/90 text-sm md:text-lg">
                    {banner.description}
                  </p>

                  <Button
                    size="lg"
                    className="mt-6 bg-green-600 hover:bg-green-700"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}