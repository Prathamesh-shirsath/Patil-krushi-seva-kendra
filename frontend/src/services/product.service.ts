import type {
  Product,
  ProductResponse,
} from "@/types/product";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

// =====================================================
// BACKEND PRODUCT TYPE
// =====================================================

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
    slug?: string;
  } | null;

  brand?: {
    id: string;
    name: string;
    slug?: string;
  } | null;

  variants?: {
    id: string;
    packSize: string;
    price: number | string;
    stock?: number;
    status?: boolean;
  }[];
};

// =====================================================
// GET PRODUCTS PARAMS
// =====================================================

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
};

// =====================================================
// EXTRACT PRODUCTS
// =====================================================

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

// =====================================================
// NORMALIZE PRODUCT
// =====================================================

function normalizeProduct(
  product: BackendProduct
): Product {
  return {
    ...product,

    id: product.id ?? "",
    name: product.name ?? "",
    slug: product.slug ?? "",

    image: product.image ?? null,

    price: Number(product.price ?? 0),

    packSize:
      product.packSize ?? "",

    stock: Number(product.stock ?? 0),

    status:
      product.status !== false,

    description:
      product.description ?? "",

    usedForCrops:
      Array.isArray(product.usedForCrops)
        ? product.usedForCrops
        : [],

    category: product.category
      ? {
          id: product.category.id,
          name: product.category.name,
          slug:
            product.category.slug ?? "",
        }
      : null,

    brand: product.brand
      ? {
          id: product.brand.id,
          name: product.brand.name,
          slug:
            product.brand.slug ?? "",
        }
      : null,

    variants:
      Array.isArray(product.variants)
        ? product.variants.map(
            (variant) => ({
              ...variant,
              price: Number(
                variant.price ?? 0
              ),
              stock: Number(
                variant.stock ?? 0
              ),
              status:
                variant.status !== false,
            })
          )
        : [],
  } as Product;
}

// =====================================================
// GET ALL PRODUCTS
// =====================================================

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

  if (params.category) {
    searchParams.set(
      "categoryId",
      params.category
    );
  }

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

  const response =
    await fetch(url, {
      cache: "no-store",
    });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products (${response.status})`
    );
  }

  const result =
    await response.json();

  return extractProducts(result).filter(
    (product) =>
      product.status !== false
  );
}

// =====================================================
// GET PRODUCT BY SLUG
// =====================================================

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const response =
    await fetch(
      `${API_URL}/products/${encodeURIComponent(
        slug
      )}`,
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

// =====================================================
// GET RELATED PRODUCTS
// =====================================================

export async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
  limit: number = 4
): Promise<Product[]> {
  if (!categoryId) {
    console.warn(
      "getRelatedProducts: categoryId is empty"
    );

    return [];
  }

  try {
    const response =
      await fetch(
        `${API_URL}/products?categoryId=${encodeURIComponent(
          categoryId
        )}&limit=${limit + 1}`,
        {
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch related products (${response.status})`
      );
    }

    const result =
      await response.json();

    console.log(
      "RELATED PRODUCTS API RESPONSE:",
      result
    );

    const products =
      extractProducts(result);

    console.log(
      "RELATED PRODUCTS EXTRACTED:",
      products
    );

    return products
      .filter(
        (product) =>
          product.id !==
            currentProductId &&
          product.status !== false
      )
      .slice(0, limit)
      .map(normalizeProduct);
  } catch (error) {
    console.error(
      "Failed to fetch related products:",
      error
    );

    return [];
  }
}