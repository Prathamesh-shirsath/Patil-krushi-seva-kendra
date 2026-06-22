import type { Product } from "@/types/product";

export function createDemoProduct(slug: string): Product {
  return {
    id: "demo-product",
    name: "Demo Agricultural Product",
    slug,
    brand: "Demo Brand",
    image: "/banner.jpg",
    images: [
      "/banners/banner.webp",
      "/banners/banner1.webp",
      "/banners/banner2.webp",
    ],
    price: 499,
    discountedPrice: 429,
    description:
      "This demo product is shown only when NEXT_PUBLIC_DEMO_MODE is enabled. It helps preview the Product Details page while real products are not yet available in the database.",
    uses:
      "Use this temporary content to verify the usage guide layout during development.",
    features:
      "Demo pack size, formulation, crop suitability, and handling information appear here.",
    cropRecommendation:
      "Demo crop recommendations appear here until real product data is added.",
    stock: 25,
    isActive: true,
    categoryId: "demo-category",
    category: {
      id: "demo-category",
      name: "Agricultural Products",
      slug: "agricultural-products",
      image: null,
    },
    reviews: [],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}
