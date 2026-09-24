export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
};

export type ProductBrand = {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type ProductVariant = {
  id: string;
  packSize: string;
  price: number | string;
  stock: number;
  status: boolean;
  productId?: string;
  createdAt?: string;
};

export type ProductReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  brand?: ProductBrand | null;
  brandId?: string;
  image?: string | null;
  images?: string[];
  price: number | string;
  discountedPrice?: number | string | null;
  description: string;
  uses?: string | null;
  features?: string | null;
  cropRecommendation?: string | null;
  stock?: number;
  isActive?: boolean;
  status?: boolean;
  categoryId: string;
  category?: ProductCategory | null;
  packSize?: string;
  usedForCrops?: string[];
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  success: boolean;
  data: Product;
  message?: string;
};
