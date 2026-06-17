"use client";

import { useMemo, useState } from "react";
import {
  CreditCard,
  Headphones,
  LayoutGrid,
  List,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Truck,
} from "lucide-react";

import FilterSidebar, {
  type FilterOption,
} from "@/components/shop/FilterSidebar";
import ProductGrid, {
  type ShopProduct,
} from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const products: ShopProduct[] = [
  {
    id: 1,
    name: "Multi Crop Seed Care Pack",
    price: 640,
    originalPrice: 760,
    image: "/banners/banner.webp",
    brand: "AgriCore",
    category: "Seeds",
    productType: "Seed Care",
    availability: "In Stock",
    rating: 4.6,
    reviewCount: 42,
    badge: "Bestseller",
    unit: "1 Pack",
  },
  {
    id: 2,
    name: "Balanced Crop Nutrition Mix",
    price: 360,
    image: "/banner.jpg",
    brand: "FarmPlus",
    category: "Fertilizers",
    productType: "Granules",
    availability: "In Stock",
    rating: 4.4,
    reviewCount: 58,
    badge: "10% Off",
    unit: "1 Kg",
  },
  {
    id: 3,
    name: "Plant Shield Liquid Concentrate",
    price: 520,
    image: "/banners/banner1.webp",
    brand: "GreenField",
    category: "Pesticides",
    productType: "Liquid",
    availability: "In Stock",
    rating: 4.7,
    reviewCount: 36,
    badge: "New",
    unit: "500 ml",
  },
  {
    id: 4,
    name: "Crop Growth Support Tonic",
    price: 280,
    originalPrice: 340,
    image: "/banners/banner2.webp",
    brand: "HarvestWay",
    category: "Plant Growth",
    productType: "Bio Stimulant",
    availability: "In Stock",
    rating: 4.5,
    reviewCount: 40,
    unit: "250 ml",
  },
  {
    id: 5,
    name: "Soil Conditioner Organic Blend",
    price: 450,
    image: "/banners/banner.webp",
    brand: "SoilCare",
    category: "Organic Products",
    productType: "Organic",
    availability: "In Stock",
    rating: 4.8,
    reviewCount: 62,
    badge: "Popular",
    unit: "5 Kg",
  },
  {
    id: 6,
    name: "Fungal Control Wettable Powder",
    price: 710,
    image: "/banner.jpg",
    brand: "CropGuard",
    category: "Plant Protection",
    productType: "Fungicide",
    availability: "Out of Stock",
    rating: 4.3,
    reviewCount: 28,
    unit: "500 g",
  },
  {
    id: 7,
    name: "Root Development Booster",
    price: 195,
    image: "/banners/banner1.webp",
    brand: "GrowMate",
    category: "Fertilizers",
    productType: "Bio Stimulant",
    availability: "In Stock",
    rating: 4.2,
    reviewCount: 31,
    unit: "100 g",
  },
  {
    id: 8,
    name: "Vegetable Seed Assortment",
    price: 240,
    image: "/banners/banner2.webp",
    brand: "SeedNest",
    category: "Seeds",
    productType: "Seed Care",
    availability: "In Stock",
    rating: 4.6,
    reviewCount: 50,
    unit: "10 Pouches",
  },
  {
    id: 9,
    name: "Micro Nutrient Foliar Spray",
    price: 330,
    image: "/banners/banner.webp",
    brand: "NutriFarm",
    category: "Fertilizers",
    productType: "Liquid",
    availability: "In Stock",
    rating: 4.4,
    reviewCount: 35,
    unit: "500 ml",
  },
  {
    id: 10,
    name: "Irrigation Pipe Roll",
    price: 980,
    image: "/banner.jpg",
    brand: "AquaGrow",
    category: "Irrigation",
    productType: "Equipment",
    availability: "In Stock",
    rating: 4.3,
    reviewCount: 26,
    unit: "16 mm",
  },
  {
    id: 11,
    name: "Natural Pest Care Solution",
    price: 420,
    image: "/banners/banner1.webp",
    brand: "EcoHarvest",
    category: "Organic Products",
    productType: "Insecticide",
    availability: "In Stock",
    rating: 4.5,
    reviewCount: 44,
    badge: "Eco",
    unit: "1 L",
  },
  {
    id: 12,
    name: "Farm Tool Maintenance Kit",
    price: 560,
    image: "/banners/banner2.webp",
    brand: "FieldKit",
    category: "Farming Tools",
    productType: "Equipment",
    availability: "In Stock",
    rating: 4.1,
    reviewCount: 18,
    unit: "1 Kit",
  },
];

const pageSize = 12;
const totalCatalogItems = 120;

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Top Rated", value: "rating" },
];

const shopBenefits = [
  {
    title: "100% Original Products",
    description: "Best quality guaranteed",
    icon: ShieldCheck,
  },
  {
    title: "Fast & Safe Delivery",
    description: "Quick delivery at your door",
    icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "100% secure payments",
    icon: CreditCard,
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns",
    icon: RefreshCw,
  },
  {
    title: "Expert Support",
    description: "24/7 customer support",
    icon: Headphones,
  },
];

function countByField(
  field: "category" | "brand" | "productType" | "availability",
  value: string
) {
  return products.filter((product) => product[field] === value).length;
}

function buildFilterOptions(
  values: string[],
  allLabel: string,
  allCount: number,
  field: "category" | "brand" | "productType"
): FilterOption[] {
  return [
    { label: allLabel, count: allCount },
    ...values.map((value) => ({
      label: value,
      count: countByField(field, value),
    })),
  ];
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedProductType, setSelectedProductType] =
    useState("All Product Types");
  const [selectedAvailability, setSelectedAvailability] = useState("In Stock");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const maxPrice = Math.max(...products.map((product) => product.price));
  const [price, setPrice] = useState(maxPrice);

  const categoryValues = Array.from(
    new Set(products.map((product) => product.category))
  );
  const brandValues = Array.from(
    new Set(products.map((product) => product.brand))
  );
  const productTypeValues = Array.from(
    new Set(products.map((product) => product.productType))
  );

  const categories = buildFilterOptions(
    categoryValues,
    "All Categories",
    totalCatalogItems,
    "category"
  );
  const brands = buildFilterOptions(
    brandValues,
    "All Brands",
    totalCatalogItems,
    "brand"
  );
  const productTypes = buildFilterOptions(
    productTypeValues,
    "All Product Types",
    totalCatalogItems,
    "productType"
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All Categories" ||
          product.category === selectedCategory;
        const matchesBrand =
          selectedBrand === "All Brands" || product.brand === selectedBrand;
        const matchesType =
          selectedProductType === "All Product Types" ||
          product.productType === selectedProductType;
        const matchesAvailability =
          selectedAvailability === "All Availability" ||
          product.availability === selectedAvailability;
        const matchesPrice = product.price <= price;

        return (
          matchesCategory &&
          matchesBrand &&
          matchesType &&
          matchesAvailability &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return a.price - b.price;
        }

        if (sortBy === "price-high") {
          return b.price - a.price;
        }

        if (sortBy === "rating") {
          return b.rating - a.rating;
        }

        return a.id - b.id;
      });
  }, [
    price,
    selectedAvailability,
    selectedBrand,
    selectedCategory,
    selectedProductType,
    sortBy,
  ]);

  const visibleProducts = filteredProducts.slice(0, pageSize);

  const resetPage = (callback: () => void) => {
    callback();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedBrand("All Brands");
    setSelectedProductType("All Product Types");
    setSelectedAvailability("In Stock");
    setPrice(maxPrice);
    setCurrentPage(1);
  };

  const filterSidebar = (
    <FilterSidebar
      categories={categories}
      brands={brands}
      productTypes={productTypes}
      selectedCategory={selectedCategory}
      selectedBrand={selectedBrand}
      selectedProductType={selectedProductType}
      selectedAvailability={selectedAvailability}
      maxPrice={maxPrice}
      price={price}
      onCategoryChange={(value) =>
        resetPage(() => setSelectedCategory(value))
      }
      onBrandChange={(value) => resetPage(() => setSelectedBrand(value))}
      onProductTypeChange={(value) =>
        resetPage(() => setSelectedProductType(value))
      }
      onAvailabilityChange={(value) =>
        resetPage(() => setSelectedAvailability(value))
      }
      onPriceChange={(value) => resetPage(() => setPrice(value))}
      onClear={clearFilters}
    />
  );

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 text-xs text-gray-500">
          Home <span className="mx-2">/</span>
          <span className="text-gray-800">Shop</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-950">Shop</h1>
          <p className="mt-1 text-sm text-gray-600">
            High quality agricultural products for better yield and healthy crops.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">{filterSidebar}</div>

          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-600">
                Showing 1 - {visibleProducts.length} of {totalCatalogItems} products
              </p>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 rounded border-green-200 text-xs lg:hidden"
                    >
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[320px] overflow-y-auto p-4"
                  >
                    {filterSidebar}
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2">
                  <label
                    className="text-xs font-medium text-gray-500"
                    htmlFor="shop-sort"
                  >
                    Sort by:
                  </label>
                  <select
                    id="shop-sort"
                    value={sortBy}
                    onChange={(event) =>
                      resetPage(() => setSortBy(event.target.value))
                    }
                    className="h-9 rounded border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded bg-green-700 text-white"
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50"
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <ProductGrid products={visibleProducts} />

            <div className="mt-6 flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4].map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "h-8 w-8 rounded bg-green-700 p-0 text-xs text-white hover:bg-green-800"
                      : "h-8 w-8 rounded p-0 text-xs"
                  }
                >
                  {page}
                </Button>
              ))}

              <span className="px-2 text-xs text-gray-500">...</span>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(10)}
                className="h-8 w-8 rounded p-0 text-xs"
              >
                10
              </Button>

              <Button
                variant="outline"
                disabled={currentPage === 10}
                onClick={() => setCurrentPage((page) => Math.min(10, page + 1))}
                className="h-8 w-8 rounded p-0 text-xs"
                aria-label="Next page"
              >
              &gt;
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 py-5 sm:grid-cols-2 lg:grid-cols-5">
          {shopBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="flex items-start gap-3">
                <div className="rounded-full bg-green-50 p-2 text-green-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-950">
                    {benefit.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
