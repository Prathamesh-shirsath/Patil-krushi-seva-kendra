export type BannerTargetType =
  | "PRODUCT"
  | "CATEGORY"
  | "BRAND"
  | "CUSTOM"
  | "NONE";

export type BannerPlacement =
  | "HOME_HERO"
  | "HOME_PROMO"
  | "CATEGORY_PAGE"
  | "BRAND_PAGE"
  | "CONTACT_HERO"
  | "SHOP_PAGE";

export type BannerScopeType = "GLOBAL" | "CATEGORY" | "BRAND";

export type BannerTextTheme = "LIGHT" | "DARK";

export type Banner = {
  id: string;
  label?: string | null;
  title: string;
  subtitle?: string | null;
  image: string;
  mobileImage?: string | null;
  buttonText?: string | null;
  targetType: BannerTargetType;
  targetSlug?: string | null;
  targetUrl?: string | null;
  placement: BannerPlacement;
  scopeType: BannerScopeType;
  scopeSlug?: string | null;
  textTheme: BannerTextTheme;
  status: boolean;
  displayOrder: number;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://api.patilkrushi.com/api";

export async function getPublicBanners(
  placement: BannerPlacement = "HOME_HERO",
  scopeSlug?: string
): Promise<Banner[]> {
  const params = new URLSearchParams({
    placement,
  });

  if (scopeSlug) {
    params.set("scopeSlug", scopeSlug);
  }

  const response = await fetch(
    `${API_BASE_URL}/banners/public?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch public banners");
  }

  const data = await response.json();

  return data.data;
}