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
  | "SHOP_PAGE";

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
  textTheme: BannerTextTheme;
  status: boolean;
  displayOrder: number;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export async function getPublicBanners(
  placement: BannerPlacement = "HOME_HERO"
): Promise<Banner[]> {
  const params = new URLSearchParams({
    placement,
  });

  const response = await fetch(
    `http://localhost:5000/api/banners/public?${params.toString()}`,
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
