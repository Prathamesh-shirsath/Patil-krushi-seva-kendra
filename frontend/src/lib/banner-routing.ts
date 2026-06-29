import type { Banner } from "@/services/banner.service";

export function getBannerHref(banner: Banner) {
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
