import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { createDemoProduct } from "@/data/demo-product";
import { relatedProducts } from "@/data/related-products";
import { getProductBySlug } from "@/services/product.service";

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
    return (
      <main className="bg-white">
        <section className="mx-auto max-w-[1500px] px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-950">
            Product Not Found
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
            This product is not available yet. It may be added from the admin
            panel soon.
          </p>
          <Button
            asChild
            className="mt-6 h-11 rounded bg-green-700 px-6 text-white hover:bg-green-800"
          >
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 text-xs text-gray-500">
          Home <span className="mx-2">/</span>
          Shop <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>

        <ProductDetailsClient
          product={product}
          relatedProducts={relatedProducts}
        />
      </section>
    </main>
  );
}
