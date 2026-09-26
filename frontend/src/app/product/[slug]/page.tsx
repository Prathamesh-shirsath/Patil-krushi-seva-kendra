import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import ProductReviews from "@/components/product/ProductReviews";
import ProductNotFoundClient from "@/components/product/ProductNotFoundClient";

import { createDemoProduct } from "@/data/demo-product";
import { relatedProducts } from "@/data/related-products";
import { getProductBySlug } from "@/services/product.service";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const isDemoMode =
  process.env.NEXT_PUBLIC_DEMO_MODE === "true";

// =====================================================
// GET PRODUCT SAFELY
// =====================================================

async function getProductSafely(slug: string) {
  try {
    const product = await getProductBySlug(slug);

    // Demo mode fallback
    if (!product && isDemoMode) {
      return createDemoProduct(slug);
    }

    return product;
  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

    // Demo mode fallback
    if (isDemoMode) {
      return createDemoProduct(slug);
    }

    return null;
  }
}

// =====================================================
// PRODUCT DETAILS PAGE
// =====================================================

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  console.log(
    "PRODUCT PAGE SLUG:",
    slug
  );

  const product =
    await getProductSafely(slug);

  // ===================================================
  // PRODUCT NOT FOUND
  // ===================================================

  if (!product) {
    return <ProductNotFoundClient />;
  }

  // ===================================================
  // PRODUCT PAGE
  // ===================================================

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        
        {/* =========================================
            PRODUCT DETAILS
        ========================================= */}

        <ProductDetailsClient
          product={product}
          relatedProducts={relatedProducts}
        />

        {/* =========================================
            CUSTOMER REVIEWS
        ========================================= */}

        <ProductReviews
          productId={product.id}
        />

      </section>
    </main>
  );
}