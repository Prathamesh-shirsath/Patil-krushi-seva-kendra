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
    scopeType: "GLOBAL",
    scopeSlug: null,
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
    <section className="w-full px-4 py-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[28px] bg-green-950 shadow-2xl">
        <div className="min-h-[430px] animate-pulse bg-white/10 sm:min-h-[500px] lg:min-h-[560px]" />
      </div>
    </section>
  );
}

function renderTitle(title: string) {
  const words = title.replace(/\s+/g, " ").trim().split(" ");

  const highlightWords = [
    "green",
    "one",
    "farming",
    "farm",
    "organic",
    "agricultural",
  ];

  const highlightIndex = words.findIndex((word) =>
    highlightWords.includes(
      word.toLowerCase().replace(/[^a-z]/g, "")
    )
  );

  const indexToHighlight =
    highlightIndex >= 0
      ? highlightIndex
      : Math.max(0, words.length - 2);

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={
            index === indexToHighlight
              ? "text-emerald-400"
              : "text-white"
          }
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
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div
      className="
        hero-trust-badge
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-white/15
        bg-white/10
        px-3
        py-2.5
        text-xs
        font-bold
        text-white
        shadow-lg
        backdrop-blur-md
        transition-all
        duration-300
        hover:bg-white/15
        hover:-translate-y-0.5
      "
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function HeroSlide({ banner }: { banner: Banner }) {
  const href = getBannerHref(banner);

  const image = getImageSrc(
    banner.image,
    DEFAULT_BANNER_IMAGE
  );

  return (
    <div
      className="
        premium-hero-slide
        relative
        min-h-[430px]
        overflow-hidden
        bg-green-950
        sm:min-h-[500px]
        lg:min-h-[560px]
      "
    >
      {/* Background Image */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
          hero-image
        "
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Dark image overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/10
        "
      />

      {/* Premium Green Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#032d1b]
          via-[#063d24]/95
          via-45%
          to-transparent
        "
      />

      {/* Bottom gradient */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black/35
          to-transparent
        "
      />

      {/* Decorative glow */}
      <div
        className="
          absolute
          -left-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-emerald-400/10
          blur-3xl
        "
      />

      {/* Content */}
      <div className="relative z-20 flex min-h-[430px] items-center sm:min-h-[500px] lg:min-h-[560px]">
        <div className="w-full px-6 py-12 sm:px-10 md:px-14 lg:px-20">
          <div className="max-w-[720px]">

            {/* Label */}
            {banner.label && (
              <span
                className="
                  hero-reveal
                  hero-label
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/10
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  sm:text-xs
                "
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                {banner.label}
              </span>
            )}

            {/* Title */}
            <h1
              className="
                hero-reveal
                hero-title
                mt-5
                max-w-[720px]
                text-4xl
                font-black
                leading-[1.02]
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {renderTitle(banner.title)}
            </h1>

            {/* Subtitle */}
            {banner.subtitle && (
              <p
                className="
                  hero-reveal
                  hero-subtitle
                  mt-5
                  max-w-[600px]
                  text-sm
                  leading-relaxed
                  text-white/80
                  sm:text-base
                  md:text-lg
                "
              >
                {banner.subtitle}
              </p>
            )}

            {/* Buttons */}
            <div
              className="
                hero-reveal
                hero-actions
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              {banner.buttonText && href && (
                <Link href={href}>
                  <Button
                    size="lg"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      bg-emerald-500
                      px-7
                      text-sm
                      font-bold
                      text-white
                      shadow-xl
                      shadow-emerald-950/30
                      transition-all
                      duration-300
                      hover:bg-emerald-400
                      hover:-translate-y-0.5
                      sm:w-auto
                    "
                  >
                    {banner.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}

              <Link href="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border-white/30
                    bg-white/10
                    px-7
                    text-sm
                    font-bold
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:bg-white
                    hover:text-green-900
                    sm:w-auto
                  "
                >
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="
                hero-reveal
                hero-badges
                mt-8
                grid
                max-w-[620px]
                grid-cols-1
                gap-2
                sm:grid-cols-3
              "
            >
              <TrustBadge
                icon={
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                }
                label="Genuine Products"
              />

              <TrustBadge
                icon={
                  <Truck className="h-4 w-4 text-emerald-400" />
                }
                label="Fast Delivery"
              />

              <TrustBadge
                icon={
                  <Leaf className="h-4 w-4 text-emerald-400" />
                }
                label="Trusted Brands"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Optional clickable banner */}
      {href && (
        <Link
          href={href}
          aria-label={`Open ${banner.title}`}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Keep content above clickable layer */}
      <div className="pointer-events-none absolute inset-0 z-20" />
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

  const slides =
    isError || banners.length === 0
      ? defaultBanners
      : banners;

  return (
    <section className="w-full px-4 py-5 md:px-8 md:py-7 lg:px-12">
      <Swiper
        modules={[
          Autoplay,
          Pagination,
          Navigation,
        ]}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation
        loop={slides.length > 1}
        className="
          premium-hero-swiper
          mx-auto
          max-w-[1500px]
          overflow-hidden
          rounded-[28px]
          shadow-2xl
          shadow-green-950/20
          sm:rounded-[32px]

          [&_.swiper-button-next]:hidden
          [&_.swiper-button-prev]:hidden

          md:[&_.swiper-button-next]:flex
          md:[&_.swiper-button-prev]:flex

          [&_.swiper-button-next]:right-5
          [&_.swiper-button-prev]:left-5

          [&_.swiper-button-next]:h-11
          [&_.swiper-button-prev]:h-11

          [&_.swiper-button-next]:w-11
          [&_.swiper-button-prev]:w-11

          [&_.swiper-button-next]:rounded-full
          [&_.swiper-button-prev]:rounded-full

          [&_.swiper-button-next]:bg-white/90
          [&_.swiper-button-prev]:bg-white/90

          [&_.swiper-button-next]:text-green-900
          [&_.swiper-button-prev]:text-green-900

          [&_.swiper-button-next]:shadow-xl
          [&_.swiper-button-prev]:shadow-xl

          [&_.swiper-button-next]:backdrop-blur
          [&_.swiper-button-prev]:backdrop-blur

          [&_.swiper-button-next]:transition-all
          [&_.swiper-button-prev]:transition-all

          [&_.swiper-button-next:hover]:scale-110
          [&_.swiper-button-prev:hover]:scale-110

          [&_.swiper-button-next:hover]:bg-white
          [&_.swiper-button-prev:hover]:bg-white

          [&_.swiper-pagination]:bottom-5

          [&_.swiper-pagination-bullet]:h-2
          [&_.swiper-pagination-bullet]:w-7
          [&_.swiper-pagination-bullet]:rounded-full

          [&_.swiper-pagination-bullet]:bg-white/60
          [&_.swiper-pagination-bullet]:opacity-100

          [&_.swiper-pagination-bullet]:transition-all
          [&_.swiper-pagination-bullet]:duration-300

          [&_.swiper-pagination-bullet-active]:w-11
          [&_.swiper-pagination-bullet-active]:bg-emerald-400
        "
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
          transform: translateY(22px);
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-reveal {
          animation: premiumHeroFadeUp 650ms
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-label {
          animation-delay: 0ms;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-title {
          animation-delay: 100ms;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-subtitle {
          animation-delay: 180ms;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-actions {
          animation-delay: 260ms;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-badges {
          animation-delay: 340ms;
        }

        .premium-hero-swiper
          .swiper-slide-active
          .hero-image {
          animation: premiumHeroZoom 4500ms
            ease-out forwards;
        }

        .premium-hero-swiper
          .hero-trust-badge:hover svg {
          transform: scale(1.12);
        }

        .premium-hero-swiper
          .hero-trust-badge svg {
          transition: transform 220ms ease-out;
        }

        @keyframes premiumHeroFadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes premiumHeroZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.045);
          }
        }

        @media (max-width: 640px) {
          .premium-hero-swiper
            .swiper-pagination {
            bottom: 14px;
          }

          .premium-hero-swiper
            .swiper-pagination-bullet {
            width: 18px;
            height: 5px;
          }

          .premium-hero-swiper
            .swiper-pagination-bullet-active {
            width: 28px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .premium-hero-swiper .hero-reveal,
          .premium-hero-swiper
            .swiper-slide-active
            .hero-reveal,
          .premium-hero-swiper
            .swiper-slide-active
            .hero-image {
            animation: none !important;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}