"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanners } from "@/hooks/use-banners";
import {
  DEFAULT_BANNER_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";
import type { Banner } from "@/services/banner.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const defaultBanners: Banner[] = [
  {
    id: "default-banner",
    label: "Trusted by 10,000+ Farmers",
    title: "All Your Farming\nNeeds In One Place",
    subtitle:
      "Premium quality seeds, fertilizers, pesticides and expert agricultural solutions for modern farmers.",
    image: DEFAULT_BANNER_IMAGE,
    mobileImage: null,
    buttonText: null,
    targetType: "NONE",
    targetSlug: null,
    targetUrl: null,
    placement: "HOME_HERO",
    textTheme: "LIGHT",
    status: true,
    displayOrder: 0,
  },
];

function getBannerHref(banner: Banner) {
  if (banner.targetType === "PRODUCT" && banner.targetSlug) {
    return `/product/${banner.targetSlug}`;
  }

  if (banner.targetType === "CATEGORY" && banner.targetSlug) {
    return `/categories?name=${banner.targetSlug}`;
  }

  if (banner.targetType === "BRAND" && banner.targetSlug) {
    return `/brands/${banner.targetSlug}`;
  }

  if (banner.targetType === "CUSTOM" && banner.targetUrl) {
    return banner.targetUrl;
  }

  return null;
}

function HeroSkeleton() {
  return (
    <section className="w-full px-4 py-4 md:px-8 md:py-6 lg:px-12">
      <div className="mx-auto max-w-375 overflow-hidden rounded-2xl bg-green-950 shadow-xl sm:rounded-3xl">
        <div className="grid min-h-0 overflow-hidden md:min-h-125 lg:min-h-150 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex items-center px-5 py-8 sm:px-10 lg:px-14">
            <div className="w-full max-w-xl">
              <div className="h-9 w-56 rounded-full bg-white/20 animate-pulse" />
              <div className="mt-6 h-20 w-full rounded-2xl bg-white/20 animate-pulse sm:h-28" />
              <div className="mt-5 h-16 w-full max-w-lg rounded-xl bg-white/20 animate-pulse" />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="h-12 w-full rounded-xl bg-white/20 animate-pulse sm:w-36" />
                <div className="h-12 w-full rounded-xl bg-white/20 animate-pulse sm:w-44" />
              </div>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="h-10 rounded-xl bg-white/20 animate-pulse" />
                <div className="h-10 rounded-xl bg-white/20 animate-pulse" />
                <div className="h-10 rounded-xl bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="hidden bg-white/10 md:block animate-pulse" />
        </div>
      </div>
    </section>
  );
}

function renderTitle(title: string) {
  const words = title.replace(/\s+/g, " ").trim().split(" ");
  const highlightIndex = words.findIndex((word) =>
    ["green", "one", "farming", "farm", "organic"].includes(
      word.toLowerCase().replace(/[^a-z]/g, "")
    )
  );
  const indexToHighlight =
    highlightIndex >= 0 ? highlightIndex : Math.max(0, words.length - 2);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={index === indexToHighlight ? "text-green-500" : undefined}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function TrustBadge({
  icon,
  label,
  className,
}: {
  icon: ReactNode;
  label: string;
  className: string;
}) {
  return (
    <span className={`hero-trust-badge inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold shadow-sm backdrop-blur transition-colors duration-200 ease-out ${className}`}>
      {icon}
      {label}
    </span>
  );
}

function HeroSlide({
  banner,
}: {
  banner: Banner;
}) {
  const href = getBannerHref(banner);
  const isDarkTheme = banner.textTheme === "DARK";
  const textClass = isDarkTheme ? "text-gray-950" : "text-white";
  const subtitleClass = isDarkTheme ? "text-gray-700" : "text-gray-200";
  const badgeClass = isDarkTheme
    ? "bg-green-100 text-green-800"
    : "bg-white/15 text-white ring-1 ring-white/20";
  const trustClass = isDarkTheme
    ? "bg-white/80 text-gray-800"
    : "bg-white/12 text-white ring-1 ring-white/15";
  const panelGradient = isDarkTheme
    ? "from-white via-white/95 to-white/75"
    : "from-green-950 via-green-950/92 to-green-900/50";
  const imageOverlay = isDarkTheme
    ? "from-white/60 via-white/10 to-transparent"
    : "from-black/60 via-black/20 to-transparent";
  const image = getImageSrc(
    banner.mobileImage || banner.image,
    DEFAULT_BANNER_IMAGE
  );

  return (
    <div className={`relative grid min-h-0 overflow-hidden bg-linear-to-br ${panelGradient} md:min-h-125 lg:min-h-150 lg:grid-cols-[0.95fr_1.05fr]`}>
      {href ? (
        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Open ${banner.title}`}
        />
      ) : null}

      <div className="relative z-20 flex items-center px-4 py-7 min-[390px]:px-5 sm:px-10 md:py-12 lg:px-14">
        <div className="max-w-xl">
          {banner.label ? (
            <span className={`hero-reveal hero-reveal-label inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-sm backdrop-blur ${badgeClass}`}>
              {banner.label}
            </span>
          ) : null}

          <h1 className={`hero-reveal hero-reveal-title mt-4 text-2xl font-black leading-[1.08] tracking-tight min-[390px]:text-3xl sm:mt-6 sm:text-5xl lg:text-6xl xl:text-7xl ${textClass}`}>
            {renderTitle(banner.title)}
          </h1>

          {banner.subtitle ? (
            <p className={`hero-reveal hero-reveal-subtitle mt-4 max-w-125 text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7 ${subtitleClass}`}>
              {banner.subtitle}
            </p>
          ) : null}

          <div className="hero-reveal hero-reveal-actions mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            {banner.buttonText && href ? (
              <Link
                href={href}
                className="pointer-events-auto"
              >
                <Button
                  size="lg"
                  className="h-12 w-full rounded-xl bg-green-600 px-7 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-green-700 hover:shadow-xl hover:shadow-green-950/25 sm:w-auto"
                >
                  {banner.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : null}

            <Link
              href="/categories"
              className="pointer-events-auto"
            >
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-xl border-white/70 bg-white/90 px-7 text-sm font-bold text-green-800 shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white hover:shadow-md sm:w-auto"
              >
                Explore Categories
              </Button>
            </Link>
          </div>

          <div className="hero-reveal hero-reveal-badges mt-5 grid grid-cols-1 gap-2 min-[390px]:grid-cols-3 sm:mt-7 sm:gap-3">
            <TrustBadge
              icon={<CheckCircle2 className="h-4 w-4 text-green-400" />}
              label="Genuine Products"
              className={trustClass}
            />
            <TrustBadge
              icon={<Truck className="h-4 w-4 text-green-400" />}
              label="Fast Delivery"
              className={trustClass}
            />
            <TrustBadge
              icon={<Leaf className="h-4 w-4 text-green-400" />}
              label="Trusted Brands"
              className={trustClass}
            />
          </div>
        </div>
      </div>

      <div
        className="hero-image relative min-h-40 bg-cover bg-center sm:min-h-47.5 md:min-h-full"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className={`absolute inset-0 bg-linear-to-r ${imageOverlay}`} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}

export default function HeroSlider() {
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useBanners();

  if (isLoading) {
    return <HeroSkeleton />;
  }

  const slides = isError || banners.length === 0 ? defaultBanners : banners;

  return (
    <section className="w-full px-4 py-4 md:px-8 md:py-6 lg:px-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="premium-hero-swiper mx-auto max-w-375 overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl [&_.swiper-button-next:after]:text-[14px] [&_.swiper-button-prev:after]:text-[14px] [&_.swiper-button-next]:right-4 [&_.swiper-button-prev]:left-4 [&_.swiper-button-next]:hidden [&_.swiper-button-prev]:hidden md:[&_.swiper-button-next]:flex md:[&_.swiper-button-prev]:flex [&_.swiper-button-next]:h-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-next]:w-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:bg-white/90 [&_.swiper-button-prev]:bg-white/90 [&_.swiper-button-next]:text-green-800 [&_.swiper-button-prev]:text-green-800 [&_.swiper-button-next]:shadow-lg [&_.swiper-button-prev]:shadow-lg [&_.swiper-button-next]:backdrop-blur [&_.swiper-button-prev]:backdrop-blur [&_.swiper-button-next]:transition-all [&_.swiper-button-prev]:transition-all [&_.swiper-button-next]:duration-200 [&_.swiper-button-prev]:duration-200 [&_.swiper-button-next:hover]:scale-105 [&_.swiper-button-prev:hover]:scale-105 [&_.swiper-button-next:hover]:bg-white [&_.swiper-button-prev:hover]:bg-white [&_.swiper-button-next:hover]:text-green-700 [&_.swiper-button-prev:hover]:text-green-700 [&_.swiper-button-next:hover]:shadow-xl [&_.swiper-button-prev:hover]:shadow-xl [&_.swiper-pagination]:bottom-4 sm:[&_.swiper-pagination]:bottom-5 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-6 sm:[&_.swiper-pagination-bullet]:w-7 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white/80 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet-active]:w-9 [&_.swiper-pagination-bullet-active]:bg-green-500"
      >
        {slides.map((banner) => (
          <SwiperSlide key={banner.id}>
            <HeroSlide banner={banner} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .premium-hero-swiper .hero-reveal {
          opacity: 0;
          transform: translateY(20px);
          will-change: opacity, transform;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal {
          animation: heroFadeUp 560ms ease-out both;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal-label {
          animation-delay: 0ms;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal-title {
          animation-delay: 80ms;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal-subtitle {
          animation-delay: 160ms;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal-actions {
          animation-delay: 240ms;
        }

        .premium-hero-swiper .swiper-slide-active .hero-reveal-badges {
          animation-delay: 320ms;
        }

        .premium-hero-swiper .hero-trust-badge:hover svg {
          transform: scale(1.08);
        }

        .premium-hero-swiper .hero-trust-badge svg {
          transition: transform 220ms ease-out;
        }

        .premium-hero-swiper .swiper-slide-active .hero-image {
          animation: heroImageZoom 5000ms ease-out both;
          transform-origin: center;
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroImageZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.03);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-hero-swiper .hero-reveal,
          .premium-hero-swiper .swiper-slide-active .hero-reveal,
          .premium-hero-swiper .swiper-slide-active .hero-image {
            animation: none !important;
            opacity: 1;
            transform: none;
          }

          .premium-hero-swiper .hero-trust-badge svg,
          .premium-hero-swiper .swiper-button-next,
          .premium-hero-swiper .swiper-button-prev,
          .premium-hero-swiper .swiper-pagination-bullet {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
