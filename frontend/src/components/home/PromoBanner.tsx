"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBanners } from "@/hooks/use-banners";
import { getBannerHref } from "@/lib/banner-routing";
import {
  DEFAULT_BANNER_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

function PromoBannerSkeleton() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-green-950 shadow-2xl md:min-h-[480px]">
          <div className="absolute inset-0 animate-pulse bg-white/5" />

          <div className="relative z-10 flex h-full min-h-[360px] items-center px-6 py-10 sm:px-10 md:min-h-[480px] lg:px-16">
            <div className="w-full max-w-2xl">
              <div className="h-8 w-44 rounded-full bg-white/20" />

              <div className="mt-6 h-24 max-w-xl rounded-2xl bg-white/20" />

              <div className="mt-5 h-12 max-w-lg rounded-xl bg-white/10" />

              <div className="mt-8 h-12 w-40 rounded-xl bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PromoBanner() {
  const {
    data: banners = [],
    isLoading,
  } = useBanners("HOME_PROMO");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Reset slider when banners change
   */
  useEffect(() => {
    setCurrentIndex(0);
  }, [banners.length]);

  /*
   * Auto sliding
   */
  useEffect(() => {
    if (banners.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (isLoading) {
    return <PromoBannerSkeleton />;
  }

  if (!banners.length) {
    return null;
  }

  const banner = banners[currentIndex];

  if (!banner) {
    return null;
  }

  const href = getBannerHref(banner);

  const isDarkTheme = banner.textTheme === "DARK";

  const image = getImageSrc(
    banner.mobileImage || banner.image,
    DEFAULT_BANNER_IMAGE
  );

  const textClass = isDarkTheme
    ? "text-gray-950"
    : "text-white";

  const subtitleClass = isDarkTheme
    ? "text-gray-700"
    : "text-green-50/90";

  const badgeClass = isDarkTheme
    ? "bg-green-100 text-green-800"
    : "bg-white/15 text-white ring-1 ring-white/25";

  const panelGradient = isDarkTheme
    ? "from-white via-white/95 to-white/65"
    : "from-[#032e18] via-[#07552d] to-[#0b7a43]/70";

  const imageOverlay = isDarkTheme
    ? "from-white/80 via-white/10 to-transparent"
    : "from-[#032e18]/70 via-black/10 to-transparent";

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % banners.length
    );
  };

  return (
    <section className="w-full py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">

        {/* Slider */}
        <div
          className="group relative overflow-hidden rounded-[28px] shadow-2xl ring-1 ring-black/5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Background */}
          <div
            className={`relative min-h-[390px] overflow-hidden bg-gradient-to-br ${panelGradient} transition-all duration-500 md:min-h-[500px]`}
          >

            {/* Image */}
            <div
              key={banner.id ?? currentIndex}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url(${image})`,
              }}
            />

            {/* Dark / Light image overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${imageOverlay}`}
            />

            {/* Extra premium gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex min-h-[390px] items-center px-6 py-12 sm:px-10 md:min-h-[500px] lg:px-16">

              <div className="max-w-2xl">

                {/* Badge */}
                {banner.label ? (
                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] shadow-lg backdrop-blur-md ${badgeClass}`}
                  >
                    {banner.label}
                  </span>
                ) : null}

                {/* Heading */}
                <h2
                  className={`mt-5 max-w-3xl text-3xl font-black leading-[1.05] tracking-tight min-[390px]:text-4xl sm:text-5xl lg:text-6xl ${textClass}`}
                >
                  {banner.title}
                </h2>

                {/* Subtitle */}
                {banner.subtitle ? (
                  <p
                    className={`mt-5 max-w-xl text-sm font-medium leading-7 sm:text-base lg:text-lg ${subtitleClass}`}
                  >
                    {banner.subtitle}
                  </p>
                ) : null}

                {/* Button */}
                {banner.buttonText && href ? (
                  <Link
                    href={href}
                    className="mt-8 inline-flex"
                  >
                    <Button
                      className="
                        h-12
                        rounded-xl
                        bg-green-600
                        px-7
                        text-sm
                        font-bold
                        text-white
                        shadow-xl
                        shadow-green-950/25
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-green-700
                        hover:shadow-2xl
                      "
                    >
                      {banner.buttonText}

                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : null}

                {/* Small trust points */}
                <div className="mt-7 flex flex-wrap gap-2">

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/10">
                    ✓ Genuine Products
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/10">
                    🚚 Fast Delivery
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/10">
                    🌱 Trusted Brands
                  </span>

                </div>

              </div>
            </div>

            {/* Previous Button */}
            {banners.length > 1 && (
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous banner"
                className="
                  absolute
                  left-4
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  opacity-0
                  shadow-lg
                  backdrop-blur-md
                  ring-1
                  ring-white/20
                  transition-all
                  duration-300
                  hover:bg-white/25
                  group-hover:opacity-100
                  max-md:opacity-100
                "
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {/* Next Button */}
            {banners.length > 1 && (
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next banner"
                className="
                  absolute
                  right-4
                  top-1/2
                  z-20
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  opacity-0
                  shadow-lg
                  backdrop-blur-md
                  ring-1
                  ring-white/20
                  transition-all
                  duration-300
                  hover:bg-white/25
                  group-hover:opacity-100
                  max-md:opacity-100
                "
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}

            {/* Slider Dots */}
            {banners.length > 1 && (
              <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-md">

                {banners.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to banner ${index + 1}`}
                    onClick={() => setCurrentIndex(index)}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${
                        index === currentIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/80"
                      }
                    `}
                  />
                ))}

              </div>
            )}

            {/* Slide Counter */}
            {banners.length > 1 && (
              <div className="absolute right-5 top-5 z-20 rounded-full bg-black/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                {currentIndex + 1} / {banners.length}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}