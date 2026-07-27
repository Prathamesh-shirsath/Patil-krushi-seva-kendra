import { useQuery } from "@tanstack/react-query";

import {
  type BannerPlacement,
  getPublicBanners,
} from "@/services/banner.service";

export function useBanners(
  placement: BannerPlacement = "HOME_HERO",
  scopeSlug?: string
) {
  const requiresScope =
    placement === "CATEGORY_PAGE" || placement === "BRAND_PAGE";

  return useQuery({
    queryKey: ["banners", "public", placement, scopeSlug],
    queryFn: () => getPublicBanners(placement, scopeSlug),
    enabled: !requiresScope || Boolean(scopeSlug),
  });
}
