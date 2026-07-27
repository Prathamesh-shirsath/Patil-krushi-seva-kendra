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

export interface Banner {
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
  createdAt: string;
  updatedAt: string;
}
