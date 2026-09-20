"use client";

import HomeProductSection from "./HomeProductSection";
import { useProducts } from "@/hooks/use-products";
import { mapProductsToProductCards } from "@/lib/product-mappers";
import { useLanguage } from "@/i18n/useLanguage";

export default function BestSelling() {
  const { t } = useLanguage();

  const {
    data = [],
    isLoading,
  } = useProducts({
    limit: 8,
  });

  const mappedProducts = mapProductsToProductCards(data);
  // Temporary: slice the shared product list. When backend supports featured, best-selling, or recommendations, only the data source should change; HomeProductSection should stay unchanged.
  const bestSellingProducts = mappedProducts.slice(4, 8);

  return (
    <HomeProductSection
      sectionId="best-selling-products"
      eyebrow={t.home.bestSelling.eyebrow}
      title={t.home.bestSelling.title}
      description={t.home.bestSelling.description}
      products={bestSellingProducts}
      isLoading={isLoading}
      emptyMessage={t.home.bestSelling.empty}
    />
  );
}
