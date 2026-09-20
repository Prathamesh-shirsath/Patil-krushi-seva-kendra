import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import ProductReviews from "@/components/product/ProductReviews";
import { createDemoProduct } from "@/data/demo-product";
import { relatedProducts } from "@/data/related-products";
import { getProductBySlug } from "@/services/product.service";
import ProductNotFoundClient from "@/components/product/ProductNotFoundClient";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

async function getProductSafely(slug: string) {
  try {
    const product = await getProductBySlug(slug);

    if (!product && isDemoMode) {
      return createDemoProduct(slug);
    }

    return product;
  } catch {
    if (isDemoMode) {
      return createDemoProduct(slug);
    }

    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const product = await getProductSafely(slug);

  if (!product) {
    return <ProductNotFoundClient />;
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* ========================= */}
        {/* PRODUCT DETAILS */}
        {/* ========================= */}

        <ProductDetailsClient
          product={product}
          relatedProducts={relatedProducts}
        />

        {/* ========================= */}
        {/* CUSTOMER REVIEWS */}
        {/* ========================= */}

        <ProductReviews productId={product.id} />
      </section>
    </main>
  );
}