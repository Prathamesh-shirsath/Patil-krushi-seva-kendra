"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBanners } from "@/hooks/use-banners";
import { getBannerHref } from "@/lib/banner-routing";
import {
  DEFAULT_BANNER_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

function PromoBannerSkeleton() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="grid min-h-[300px] overflow-hidden rounded-3xl bg-green-950 shadow-xl md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center px-6 py-8 sm:px-10 lg:px-12">
            <div className="w-full max-w-lg">
              <div className="h-8 w-40 rounded-full bg-white/20 animate-pulse" />
              <div className="mt-5 h-20 rounded-2xl bg-white/20 animate-pulse" />
              <div className="mt-4 h-14 rounded-xl bg-white/20 animate-pulse" />
              <div className="mt-7 h-12 w-36 rounded-xl bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="hidden bg-white/10 md:block animate-pulse" />
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

  if (isLoading) {
    return <PromoBannerSkeleton />;
  }

  const banner = banners[0];

  if (!banner) {
    return null;
  }

  const href = getBannerHref(banner);
  const isDarkTheme = banner.textTheme === "DARK";
  const image = getImageSrc(
    banner.mobileImage || banner.image,
    DEFAULT_BANNER_IMAGE
  );
  const textClass = isDarkTheme ? "text-gray-950" : "text-white";
  const subtitleClass = isDarkTheme ? "text-gray-700" : "text-green-50/85";
  const badgeClass = isDarkTheme
    ? "bg-green-100 text-green-800"
    : "bg-white/15 text-white ring-1 ring-white/20";
  const panelGradient = isDarkTheme
    ? "from-white via-white/95 to-white/75"
    : "from-green-950 via-green-950/95 to-green-900/65";
  const imageOverlay = isDarkTheme
    ? "from-white/55 via-white/10 to-transparent"
    : "from-black/50 via-black/15 to-transparent";

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className={`relative grid min-h-[300px] overflow-hidden rounded-3xl bg-gradient-to-br ${panelGradient} shadow-xl md:grid-cols-[0.9fr_1.1fr]`}>
          {href ? (
            <Link
              href={href}
              className="absolute inset-0 z-10"
              aria-label={`Open ${banner.title}`}
            />
          ) : null}

          <div className="relative z-20 flex items-center px-5 py-8 sm:px-10 lg:px-12">
            <div className="max-w-lg">
              {banner.label ? (
                <span className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide shadow-sm backdrop-blur ${badgeClass}`}>
                  {banner.label}
                </span>
              ) : null}

              <h2 className={`mt-5 text-2xl font-black leading-tight tracking-tight min-[390px]:text-3xl sm:text-4xl lg:text-5xl ${textClass}`}>
                {banner.title}
              </h2>

              {banner.subtitle ? (
                <p className={`mt-4 max-w-[520px] text-sm leading-7 sm:text-base ${subtitleClass}`}>
                  {banner.subtitle}
                </p>
              ) : null}

              {banner.buttonText && href ? (
                <Link
                  href={href}
                  className="pointer-events-auto mt-7 flex w-full sm:inline-flex sm:w-auto"
                >
                  <Button className="h-12 w-full rounded-xl bg-green-600 px-7 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition-all hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto">
                    {banner.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>

          <div
            className="relative min-h-[210px] bg-cover bg-center md:min-h-full"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${imageOverlay}`} />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
