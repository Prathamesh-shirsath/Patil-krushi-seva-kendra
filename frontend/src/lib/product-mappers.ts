import type { BackendProduct } from "@/services/product.service";

import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

export type ProductCardProduct = {
  id: string;
  name: string;
  price: number;
  image: string;

  brand: string;
  category: string;

  availability:
  | "In Stock"
  | "Out of Stock";

  rating: number;
  reviewCount: number;

  originalPrice?: number;

  badge?: string;

  unit?: string;

  slug?: string;
};

export function mapProductToProductCard(
  product: BackendProduct
): ProductCardProduct {
  const price = Number(product.price) || 0;

  const stock = Number(product.stock ?? 0);

  return {
    id: product.id,

    name: product.name,

    price,

    image: getImageSrc(
      product.image,
      DEFAULT_PRODUCT_IMAGE
    ),

    brand:
      product.brand?.name ??
      "Generic",

    category:
      product.category?.name ??
      "Agriculture",

    availability:
      stock > 0
        ? "In Stock"
        : "Out of Stock",

    rating: 4.5,

    reviewCount: 0,

    unit:
      product.packSize ||
      product.variants?.[0]?.packSize ||
      undefined,

    slug: product.slug,
  };
}

export function mapProductsToProductCards(
  products: BackendProduct[]
): ProductCardProduct[] {
  return products.map(
    mapProductToProductCard
  );
}