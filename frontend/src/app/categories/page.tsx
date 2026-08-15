"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import Image from "next/image";

import {
  ChevronRight,
  Grid2X2,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { useSearchParams } from "next/navigation";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";

import {
  mapProductsToProductCards,
} from "@/lib/product-mappers";

import ProductGrid from "@/components/shop/ProductGrid";
import FilterSidebar, {
  type FilterOption,
} from "@/components/shop/FilterSidebar";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

const PAGE_SIZE = 12;

export default function CategoriesPage() {
  const searchParams = useSearchParams();

  const selectedSlug =
    searchParams.get("category");

  /* -----------------------------
     State
  ----------------------------- */

  const [search, setSearch] =
    useState("");

  const [view, setView] =
    useState<"grid" | "list">(
      "grid"
    );

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState("All Brands");

  const [
    selectedProductType,
    setSelectedProductType,
  ] = useState(
    "All Product Types"
  );

  const [
    selectedAvailability,
    setSelectedAvailability,
  ] = useState(
    "All Availability"
  );

  const [minPrice, setMinPrice] =
    useState(0);

  const [
    maxPriceValue,
    setMaxPriceValue,
  ] = useState(0);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* -----------------------------
     Categories
  ----------------------------- */

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const selectedCategory =
    useMemo(
      () =>
        categories.find(
          (category) =>
            category.slug ===
            selectedSlug
        ) ?? null,
      [
        categories,
        selectedSlug,
      ]
    );

  /* -----------------------------
     Products
  ----------------------------- */

  const {
    data: backendProducts = [],
    isLoading: productsLoading,
  } = useProducts({
    limit: 100,

    category:
      selectedCategory?.id,
  });

  const products = useMemo(
    () =>
      mapProductsToProductCards(
        backendProducts
      ),
    [backendProducts]
  );

  /* -----------------------------
     Category Search
  ----------------------------- */

  const filteredCategories =
    useMemo(() => {
      const value =
        search
          .trim()
          .toLowerCase();

      if (!value) {
        return categories;
      }

      return categories.filter(
        (category) =>
          category.name
            .toLowerCase()
            .includes(value)
      );
    }, [
      categories,
      search,
    ]);

  /* -----------------------------
     Maximum Product Price
  ----------------------------- */

  const maximumProductPrice =
    useMemo(() => {
      if (
        products.length === 0
      ) {
        return 0;
      }

      return Math.max(
        ...products.map(
          (product) =>
            Number(product.price) ||
            0
        )
      );
    }, [products]);

  const effectiveMaxPrice =
    maxPriceValue > 0
      ? Math.min(
        maxPriceValue,
        maximumProductPrice
      )
      : maximumProductPrice;

  /* -----------------------------
     Brands
  ----------------------------- */

  const brandValues = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map(
              (product) =>
                product.brand
            )
            .filter(Boolean)
        )
      ),
    [products]
  );

  const brands: FilterOption[] =
    useMemo(
      () => [
        {
          label: "All Brands",
          count: products.length,
        },

        ...brandValues.map(
          (brand) => ({
            label: brand,
            count: products.filter(
              (product) =>
                product.brand ===
                brand
            ).length,
          })
        ),
      ],
      [
        products,
        brandValues,
      ]
    );

  /* -----------------------------
     Product Types

     Current Product model does not
     expose productType.
  ----------------------------- */

  const productTypes: FilterOption[] =
    [
      {
        label: "All Product Types",
        count: products.length,
      },
    ];

  /* -----------------------------
     Availability
  ----------------------------- */

  const availabilityOptions:
    FilterOption[] = useMemo(
      () => [
        {
          label: "All Availability",
          count: products.length,
        },

        {
          label: "In Stock",
          count: products.filter(
            (product) =>
              product.availability ===
              "In Stock"
          ).length,
        },

        {
          label: "Out of Stock",
          count: products.filter(
            (product) =>
              product.availability ===
              "Out of Stock"
          ).length,
        },
      ],
      [products]
    );

  /* -----------------------------
     Filter Products
  ----------------------------- */

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const brandMatch =
            selectedBrand ===
            "All Brands" ||
            product.brand ===
            selectedBrand;

          const availabilityMatch =
            selectedAvailability ===
            "All Availability" ||
            product.availability ===
            selectedAvailability;

          const productTypeMatch =
            selectedProductType ===
            "All Product Types";

          const productPrice =
            Number(product.price) ||
            0;

          const minPriceMatch =
            productPrice >=
            minPrice;

          const maxPriceMatch =
            productPrice <=
            effectiveMaxPrice;

          return (
            brandMatch &&
            availabilityMatch &&
            productTypeMatch &&
            minPriceMatch &&
            maxPriceMatch
          );
        }
      );
    }, [
      products,
      selectedBrand,
      selectedAvailability,
      selectedProductType,
      minPrice,
      effectiveMaxPrice,
    ]);

  /* -----------------------------
     Pagination
  ----------------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
      PAGE_SIZE
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const visibleProducts =
    filteredProducts.slice(
      (safeCurrentPage - 1) *
      PAGE_SIZE,
      safeCurrentPage *
      PAGE_SIZE
    );

  /* -----------------------------
     Helpers
  ----------------------------- */

  const resetPage = (
    callback: () => void
  ) => {
    callback();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedBrand(
      "All Brands"
    );

    setSelectedProductType(
      "All Product Types"
    );

    setSelectedAvailability(
      "All Availability"
    );

    setMinPrice(0);
    setMaxPriceValue(0);

    setCurrentPage(1);
  };

  /* -----------------------------
     Filter Props
  ----------------------------- */

  const filterProps = {
    categories: [
      {
        label:
          selectedCategory?.name ??
          "Current Category",
        count: products.length,
      },
    ],

    brands,

    productTypes,

    availabilityOptions,

    selectedCategory:
      selectedCategory?.name ??
      "Current Category",

    selectedBrand,

    selectedProductType,

    selectedAvailability,

    maxPrice:
      maximumProductPrice,

    minPriceValue:
      minPrice,

    maxPriceValue:
      effectiveMaxPrice,

    onCategoryChange:
      () => {
        // Category is selected
        // from category cards.
      },

    onBrandChange:
      (value: string) =>
        resetPage(() =>
          setSelectedBrand(
            value
          )
        ),

    onProductTypeChange:
      (value: string) =>
        resetPage(() =>
          setSelectedProductType(
            value
          )
        ),

    onAvailabilityChange:
      (value: string) =>
        resetPage(() =>
          setSelectedAvailability(
            value
          )
        ),

    onMinPriceChange:
      (value: number) =>
        resetPage(() =>
          setMinPrice(
            Math.max(
              0,
              Math.min(
                value,
                effectiveMaxPrice
              )
            )
          )
        ),

    onMaxPriceChange:
      (value: number) =>
        resetPage(() =>
          setMaxPriceValue(
            Math.max(
              minPrice,
              Math.min(
                value,
                maximumProductPrice
              )
            )
          )
        ),

    onClear: clearFilters,
  };

  /* -----------------------------
     Render
  ----------------------------- */

  return (
    <main className="min-w-0 min-h-screen bg-[#f9fbf9]">
      {/* =================================
          HEADER
      ================================= */}

      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              {/* Breadcrumb */}

              <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                <Link
                  href="/"
                  className="hover:text-green-700"
                >
                  Home
                </Link>

                <ChevronRight className="h-3 w-3 shrink-0" />

                <span className="text-gray-900">
                  Categories
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
                Shop by Category
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Explore agricultural
                products by category
                and find the right
                products for your
                crops.
              </p>
            </div>

            {/* Search */}

            <div className="relative w-full md:w-[300px]">
              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search categories..."
                className="h-10 pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================
          BODY
      ================================= */}

      <section className="mx-auto w-full max-w-[1500px] min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        {/* Loading */}

        {categoriesLoading && (
          <div className="py-20 text-center">
            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />

            <p className="mt-3 text-sm text-gray-500">
              Loading categories...
            </p>
          </div>
        )}

        {/* Error */}

        {categoriesError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">
              Unable to load categories
            </h2>

            <p className="mt-1 text-sm text-red-600">
              Please try again later.
            </p>
          </div>
        )}

        {!categoriesLoading &&
          !categoriesError && (
            <>
              {/* =================================
                  CATEGORY CARDS
              ================================= */}

              <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {filteredCategories.map(
                  (category) => {
                    const isSelected =
                      selectedSlug ===
                      category.slug;

                    return (
                      <Link
                        key={
                          category.id
                        }
                        href={`/categories?category=${encodeURIComponent(
                          category.slug
                        )}`}
                        className={`
                          group
                          min-w-0
                          overflow-hidden
                          rounded-2xl
                          border
                          bg-white
                          transition
                          hover:-translate-y-1
                          hover:border-green-300
                          hover:shadow-lg
                          ${isSelected
                            ? "border-green-600 ring-2 ring-green-100"
                            : "border-gray-200"
                          }
                        `}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-green-50">
                          <Image
                            src={getImageSrc(
                              category.image,
                              DEFAULT_PRODUCT_IMAGE
                            )}
                            alt={
                              category.name
                            }
                            fill
                            sizes="
                              (max-width:640px) 50vw,
                              (max-width:1024px) 25vw,
                              16vw
                            "
                            className="
                              object-cover
                              transition
                              duration-300
                              group-hover:scale-105
                            "
                          />
                        </div>

                        <div className="min-w-0 p-3">
                          <h2 className="truncate text-sm font-bold text-gray-900">
                            {
                              category.name
                            }
                          </h2>

                          <p className="mt-1 text-[11px] text-gray-500">
                            {
                              category
                                ._count
                                ?.products ??
                              0
                            }{" "}
                            products
                          </p>
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>

              {/* No categories */}

              {filteredCategories.length ===
                0 && (
                  <div className="py-16 text-center">
                    <p className="text-sm text-gray-500">
                      No categories
                      found.
                    </p>
                  </div>
                )}

              {/* =================================
                  SELECTED CATEGORY
              ================================= */}

              {selectedCategory && (
                <section className="mt-10 min-w-0">
                  {/* Category Heading */}

                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        Category
                      </p>

                      <h2 className="mt-1 truncate text-xl font-bold text-gray-950 sm:text-2xl">
                        {
                          selectedCategory.name
                        }
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        {
                          filteredProducts.length
                        }{" "}
                        products
                        available
                      </p>
                    </div>

                    {/* Mobile Filter + View */}

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Mobile Filter */}

                      <Sheet>
                        <SheetTrigger
                          asChild
                        >
                          <Button
                            variant="outline"
                            className="
                              h-9
                              rounded-lg
                              border-green-200
                              bg-white
                              px-3
                              text-xs
                              font-semibold
                              text-green-700
                              lg:hidden
                            "
                          >
                            <SlidersHorizontal className="mr-2 h-4 w-4" />

                            Filters
                          </Button>
                        </SheetTrigger>

                        <SheetContent
                          side="left"
                          className="
                            w-[min(92vw,400px)]
                            max-w-[400px]
                            overflow-y-auto
                            p-0
                          "
                        >
                          <div className="min-h-full w-full bg-white">
                            <FilterSidebar
                              {...filterProps}
                            />
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* Grid/List */}

                      <Button
                        type="button"
                        variant={
                          view ===
                            "grid"
                            ? "default"
                            : "outline"
                        }
                        size="icon"
                        onClick={() =>
                          setView(
                            "grid"
                          )
                        }
                        className={
                          view ===
                            "grid"
                            ? "h-9 w-9 rounded-lg bg-green-700 hover:bg-green-800"
                            : "h-9 w-9 rounded-lg"
                        }
                        aria-label="Grid view"
                      >
                        <Grid2X2 className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant={
                          view ===
                            "list"
                            ? "default"
                            : "outline"
                        }
                        size="icon"
                        onClick={() =>
                          setView(
                            "list"
                          )
                        }
                        className={
                          view ===
                            "list"
                            ? "h-9 w-9 rounded-lg bg-green-700 hover:bg-green-800"
                            : "h-9 w-9 rounded-lg"
                        }
                        aria-label="List view"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* =================================
                      DESKTOP FILTER + PRODUCTS
                  ================================= */}

                  <div className="grid min-w-0 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
                    {/* Desktop Filter */}

                    <aside className="hidden min-w-0 lg:block">
                      <FilterSidebar
                        {...filterProps}
                      />
                    </aside>

                    {/* Products */}

                    <div className="min-w-0">
                      {productsLoading ? (
                        <div className="py-16 text-center">
                          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />

                          <p className="mt-3 text-sm text-gray-500">
                            Loading
                            products...
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Product count */}

                          <div className="mb-4 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              Showing{" "}
                              <span className="font-semibold text-gray-900">
                                {
                                  visibleProducts.length
                                }
                              </span>{" "}
                              of{" "}
                              <span className="font-semibold text-gray-900">
                                {
                                  filteredProducts.length
                                }
                              </span>
                            </p>
                          </div>

                          {/* Product Grid */}

                          <div className="min-w-0 overflow-hidden">
                            <ProductGrid
                              products={
                                visibleProducts
                              }
                            />
                          </div>

                          {/* Pagination */}

                          {totalPages >
                            1 && (
                              <div className="mt-7 flex flex-wrap items-center justify-center gap-1.5">
                                {Array.from(
                                  {
                                    length:
                                      totalPages,
                                  }
                                ).map(
                                  (
                                    _,
                                    index
                                  ) => {
                                    const page =
                                      index +
                                      1;

                                    return (
                                      <Button
                                        key={
                                          page
                                        }
                                        type="button"
                                        variant={
                                          safeCurrentPage ===
                                            page
                                            ? "default"
                                            : "outline"
                                        }
                                        onClick={() =>
                                          setCurrentPage(
                                            page
                                          )
                                        }
                                        className={
                                          safeCurrentPage ===
                                            page
                                            ? "h-8 w-8 rounded-lg bg-green-700 p-0 text-xs hover:bg-green-800"
                                            : "h-8 w-8 rounded-lg p-0 text-xs"
                                        }
                                      >
                                        {
                                          page
                                        }
                                      </Button>
                                    );
                                  }
                                )}
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* =================================
                  NO CATEGORY SELECTED
              ================================= */}

              {!selectedCategory && (
                <div className="mt-10 rounded-2xl border border-dashed border-green-200 bg-green-50/50 p-8 text-center sm:p-10">
                  <h2 className="text-lg font-bold text-gray-900">
                    Select a category
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    Select a category
                    above to view
                    its available
                    products.
                  </p>
                </div>
              )}
            </>
          )}
      </section>
    </main>
  );
}