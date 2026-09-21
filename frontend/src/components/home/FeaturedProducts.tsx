"use client";

import HomeProductSection from "./HomeProductSection";
import { mapProductsToProductCards } from "@/lib/product-mappers";
import { useProducts } from "@/hooks/use-products";
import { useLanguage } from "@/i18n/useLanguage";

export default function FeaturedProducts() {
  const { t } = useLanguage();

  const {
    data: products = [],
    isLoading,
  } = useProducts({
    limit: 8,
  });

  const mappedProducts = mapProductsToProductCards(products);
  // Temporary: slice the shared product list. When backend supports featured, best-selling, or recommendations, only the data source should change; HomeProductSection should stay unchanged.
  const featuredProducts = mappedProducts.slice(0, 4);

  return (
    <HomeProductSection
      sectionId="featured-products"
      eyebrow={t.home.featuredProducts.eyebrow}
      title={t.home.featuredProducts.title}
      description={t.home.featuredProducts.description}
      products={featuredProducts}
      isLoading={isLoading}
      emptyMessage={t.home.featuredProducts.empty}
    />
  );
}
