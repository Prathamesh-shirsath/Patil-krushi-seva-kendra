import { useQuery } from "@tanstack/react-query";

import {
  type BannerPlacement,
  getPublicBanners,
} from "@/services/banner.service";

export function useBanners(
  placement: BannerPlacement = "HOME_HERO"
) {
  return useQuery({
    queryKey: ["banners", "public", placement],
    queryFn: () => getPublicBanners(placement),
  });
}
