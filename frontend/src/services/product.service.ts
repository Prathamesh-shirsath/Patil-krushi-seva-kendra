import type {
  Product,
  ProductResponse,
} from "@/types/product";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

export type BackendProduct = {
  id: string;
  name: string;
  slug: string;

  image?: string | null;

  price: number | string;
  packSize?: string | null;
  stock?: number;

  status?: boolean;

  description?: string;

  usedForCrops?: string[];

  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;

  brand?: {
    id: string;
    name: string;
    slug: string;
  } | null;

  variants?: {
    id: string;
    packSize: string;
    price: number | string;
    stock?: number;
    status?: boolean;
  }[];
};

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;

  /**
   * Category ID
   */
  category?: string;

  /**
   * Brand ID
   */
  brand?: string;
};

function extractProducts(
  result: any
): BackendProduct[] {
  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (
    Array.isArray(result?.data?.products)
  ) {
    return result.data.products;
  }

  if (
    Array.isArray(result?.products)
  ) {
    return result.products;
  }

  return [];
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<BackendProduct[]> {
  const searchParams =
    new URLSearchParams();

  if (params.page) {
    searchParams.set(
      "page",
      String(params.page)
    );
  }

  if (params.limit) {
    searchParams.set(
      "limit",
      String(params.limit)
    );
  }

  if (params.search?.trim()) {
    searchParams.set(
      "search",
      params.search.trim()
    );
  }

  /**
   * Category ID
   *
   * Frontend:
   * category = categoryId
   *
   * Backend:
   * categoryId
   */
  if (params.category) {
    searchParams.set(
      "categoryId",
      params.category
    );
  }

  /**
   * Brand ID
   *
   * Frontend:
   * brand = brandId
   *
   * Backend:
   * brandId
   */
  if (params.brand) {
    searchParams.set(
      "brandId",
      params.brand
    );
  }

  const queryString =
    searchParams.toString();

  const url =
    `${API_URL}/products` +
    (queryString
      ? `?${queryString}`
      : "");

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products (${response.status})`
    );
  }

  const result =
    await response.json();

  /**
   * Only active products
   * should reach storefront.
   */
  return extractProducts(result).filter(
    (product) =>
      product.status !== false
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const response = await fetch(
    `${API_URL}/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch product"
    );
  }

  const result =
    (await response.json()) as ProductResponse;

  if (
    result.data?.status === false
  ) {
    return null;
  }

  return result.data;
}