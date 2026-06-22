export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
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
  brand: string;
  image: string;
  images: string[];
  price: number | string;
  discountedPrice?: number | string | null;
  description: string;
  uses: string;
  features?: string | null;
  cropRecommendation?: string | null;
  stock: number;
  isActive: boolean;
  categoryId: string;
  category?: ProductCategory | null;
  reviews?: ProductReview[];
  createdAt: string;
  updatedAt: string;
};

export type ProductResponse = {
  success: boolean;
  data: Product;
  message?: string;
};
