import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import ProductReviews from "@/components/product/ProductReviews";
import ProductNotFoundClient from "@/components/product/ProductNotFoundClient";

import { createDemoProduct } from "@/data/demo-product";

import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/product.service";

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
    const product =
      await getProductBySlug(slug);

    if (!product && isDemoMode) {
      return createDemoProduct(slug);
    }

    return product;
  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

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

  // ===================================================
  // GET MAIN PRODUCT
  // ===================================================

  const product =
    await getProductSafely(slug);

  // ===================================================
  // PRODUCT NOT FOUND
  // ===================================================

  if (!product) {
    return <ProductNotFoundClient />;
  }

  // ===================================================
  // GET RELATED PRODUCTS
  // ===================================================

  const relatedProducts =
    await getRelatedProducts(
      product.categoryId,
      product.id,
      4
    );

  console.log(
    "RELATED PRODUCTS:",
    relatedProducts
  );

  // ===================================================
  // NORMALIZE RELATED PRODUCTS
  // ===================================================

  const normalizedRelatedProducts =
    relatedProducts.map(
      (relatedProduct) => ({
        ...relatedProduct,

        // ---------------------------------------------
        // BRAND
        // ---------------------------------------------

        brand:
          typeof relatedProduct.brand ===
          "string"
            ? relatedProduct.brand
            : relatedProduct.brand?.name ??
              "",

        // ---------------------------------------------
        // CATEGORY
        // ---------------------------------------------

        category:
          typeof relatedProduct.category ===
          "string"
            ? relatedProduct.category
            : relatedProduct.category?.name ??
              "",

        // ---------------------------------------------
        // IMAGE
        // ---------------------------------------------

        image:
          relatedProduct.image ?? "",

        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        price: Number(
          relatedProduct.price ?? 0
        ),

        // ---------------------------------------------
        // STOCK / AVAILABILITY
        // ---------------------------------------------

        availability:
          Number(
            relatedProduct.stock ?? 0
          ) > 0
            ? ("In Stock" as const)
            : ("Out of Stock" as const),

        // ---------------------------------------------
        // RATING
        // ---------------------------------------------

        rating: 0,

        reviewCount: 0,
      })
    );

  console.log(
    "NORMALIZED RELATED PRODUCTS:",
    normalizedRelatedProducts
  );

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
          relatedProducts={
            normalizedRelatedProducts
          }
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