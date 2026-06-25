import type { Product, ProductResponse } from "@/types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${slug}`, {
    next: {
      revalidate: 60,
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const result = (await response.json()) as ProductResponse;

  return result.data;
}
