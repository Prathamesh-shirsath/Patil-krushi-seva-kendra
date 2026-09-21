"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

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

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import FilterSidebar, {
  type FilterOption,
} from "@/components/shop/FilterSidebar";

import ProductGrid from "@/components/shop/ProductGrid";

import { useProducts } from "@/hooks/use-products";

import {
  mapProductsToProductCards,
} from "@/lib/product-mappers";

import { useLanguage } from "@/i18n/useLanguage";

import {
  FILTER_ALL,
  matchesAvailabilityFilter,
  STOCK_IN,
  STOCK_OUT,
  type AvailabilityFilter,
} from "@/lib/shop-filters";

const PAGE_SIZE = 12;

const SORT_FEATURED = "featured";
const SORT_PRICE_LOW = "price-low";
const SORT_PRICE_HIGH = "price-high";
const SORT_RATING = "rating";

function ShopContent() {
  const { t } = useLanguage();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * URL filters
   *
   * Example:
   * /shop?brandId=cmabc123
   */
  const brandIdFromUrl =
    searchParams.get("brandId");

  const categoryIdFromUrl =
    searchParams.get("categoryId");

  const searchFromUrl =
    searchParams.get("search");

  /**
   * Local filters
   */
  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(FILTER_ALL);

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState(FILTER_ALL);

  const [
    selectedProductType,
    setSelectedProductType,
  ] = useState(FILTER_ALL);

  const [
    selectedAvailability,
    setSelectedAvailability,
  ] = useState<AvailabilityFilter>(
    FILTER_ALL
  );

  const [minPrice, setMinPrice] =
    useState(0);

  const [
    maxPriceValue,
    setMaxPriceValue,
  ] = useState(0);

  const [sortBy, setSortBy] =
    useState(SORT_FEATURED);

  const sortOptions = useMemo(
    () => [
      {
        label: t.shop.sort.featured,
        value: SORT_FEATURED,
      },
      {
        label: t.shop.sort.priceLow,
        value: SORT_PRICE_LOW,
      },
      {
        label: t.shop.sort.priceHigh,
        value: SORT_PRICE_HIGH,
      },
      {
        label: t.shop.sort.rating,
        value: SORT_RATING,
      },
    ],
    [t]
  );

  const shopBenefits = useMemo(
    () => [
      {
        title:
          t.shop.benefits.originalProducts,
        description:
          t.shop.benefits
            .originalProductsDescription,
        icon: ShieldCheck,
      },
      {
        title:
          t.shop.benefits.fastDelivery,
        description:
          t.shop.benefits
            .fastDeliveryDescription,
        icon: Truck,
      },
      {
        title:
          t.shop.benefits.securePayments,
        description:
          t.shop.benefits
            .securePaymentsDescription,
        icon: CreditCard,
      },
      {
        title:
          t.shop.benefits.easyReturns,
        description:
          t.shop.benefits
            .easyReturnsDescription,
        icon: RefreshCw,
      },
      {
        title:
          t.shop.benefits.expertSupport,
        description:
          t.shop.benefits
            .expertSupportDescription,
        icon: Headphones,
      },
    ],
    [t]
  );

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  /**
   * ---------------------------------------------------------
   * Fetch Products
   * ---------------------------------------------------------
   */
  const {
    data: backendProducts = [],
    isLoading,
    isError,
  } = useProducts({
    limit: 100,

    brand:
      brandIdFromUrl ||
      undefined,

    category:
      categoryIdFromUrl ||
      undefined,

    search:
      searchFromUrl?.trim() ||
      undefined,
  });

  /**
   * Map backend products
   * to frontend product cards.
   */
  const products = useMemo(
    () =>
      mapProductsToProductCards(
        backendProducts
      ),
    [backendProducts]
  );

  /**
   * ---------------------------------------------------------
   * Sync URL Brand ID -> Brand Name for UI
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!brandIdFromUrl) {
      setSelectedBrand(FILTER_ALL);
      return;
    }

    const matchedProduct =
      backendProducts.find(
        (product) =>
          product.brand?.id ===
          brandIdFromUrl
      );

    if (matchedProduct?.brand?.name) {
      setSelectedBrand(
        matchedProduct.brand.name
      );
    }

    setCurrentPage(1);
  }, [
    brandIdFromUrl,
    backendProducts,
  ]);

  /**
   * ---------------------------------------------------------
   * Maximum Product Price
   * ---------------------------------------------------------
   */
  const maximumProductPrice =
    useMemo(() => {
      if (products.length === 0) {
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

  /**
   * Keep maximum price synchronized.
   */
  const effectiveMaxPrice =
    maxPriceValue > 0
      ? Math.min(
        maxPriceValue,
        maximumProductPrice
      )
      : maximumProductPrice;

  /**
   * ---------------------------------------------------------
   * Categories
   * ---------------------------------------------------------
   */
  const categoryValues = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map(
              (product) =>
                product.category
            )
            .filter(Boolean)
        )
      ),
    [products]
  );

  const categories: FilterOption[] =
    useMemo(
      () => [
        {
          value: FILTER_ALL,
          label:
            t.shop.filterAll.categories,
          count: products.length,
        },

        ...categoryValues.map(
          (category) => ({
            value: category,
            label: category,
            count: products.filter(
              (product) =>
                product.category ===
                category
            ).length,
          })
        ),
      ],
      [
        products,
        categoryValues,
        t,
      ]
    );

  /**
   * ---------------------------------------------------------
   * Brands
   * ---------------------------------------------------------
   */
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
          value: FILTER_ALL,
          label:
            t.shop.filterAll.brands,
          count: products.length,
        },

        ...brandValues.map(
          (brand) => ({
            value: brand,
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
        t,
      ]
    );

  /**
   * ---------------------------------------------------------
   * Product Type
   * ---------------------------------------------------------
   */
  const productTypes: FilterOption[] =
    useMemo(
      () => [
        {
          value: FILTER_ALL,
          label:
            t.shop.filterAll
              .productTypes,
          count: products.length,
        },
      ],
      [products.length, t]
    );

  /**
   * ---------------------------------------------------------
   * Availability
   * ---------------------------------------------------------
   */
  const availabilityOptions:
    FilterOption[] = useMemo(
      () => [
        {
          value: FILTER_ALL,
          label:
            t.shop.filterAll
              .availability,
          count: products.length,
        },

        {
          value: STOCK_IN,
          label:
            t.shop.stock.inStock,
          count: products.filter(
            (product) =>
              product.availability ===
              STOCK_IN
          ).length,
        },

        {
          value: STOCK_OUT,
          label:
            t.shop.stock.outOfStock,
          count: products.filter(
            (product) =>
              product.availability ===
              STOCK_OUT
          ).length,
        },
      ],
      [products, t]
    );

  /**
   * ---------------------------------------------------------
   * Client-side filtering
   * ---------------------------------------------------------
   */
  const filteredProducts =
    useMemo(() => {
      return products
        .filter((product) => {
          const categoryMatch =
            selectedCategory ===
            FILTER_ALL ||
            product.category ===
            selectedCategory;

          const brandMatch =
            brandIdFromUrl
              ? true
              : selectedBrand ===
              FILTER_ALL ||
              product.brand ===
              selectedBrand;

          const availabilityMatch =
            matchesAvailabilityFilter(
              product.availability,
              selectedAvailability
            );

          const productTypeMatch =
            selectedProductType ===
            FILTER_ALL;

          const productPrice =
            Number(product.price) ||
            0;

          const minPriceMatch =
            productPrice >= minPrice;

          const maxPriceMatch =
            productPrice <=
            effectiveMaxPrice;

          return (
            categoryMatch &&
            brandMatch &&
            availabilityMatch &&
            productTypeMatch &&
            minPriceMatch &&
            maxPriceMatch
          );
        })
        .sort((a, b) => {
          if (
            sortBy ===
            SORT_PRICE_LOW
          ) {
            return (
              a.price -
              b.price
            );
          }

          if (
            sortBy ===
            SORT_PRICE_HIGH
          ) {
            return (
              b.price -
              a.price
            );
          }

          if (
            sortBy ===
            SORT_RATING
          ) {
            return (
              b.rating -
              a.rating
            );
          }

          return a.name.localeCompare(
            b.name
          );
        });
    }, [
      products,
      selectedCategory,
      selectedBrand,
      selectedProductType,
      selectedAvailability,
      minPrice,
      effectiveMaxPrice,
      sortBy,
      brandIdFromUrl,
    ]);

  /**
   * ---------------------------------------------------------
   * Pagination
   * ---------------------------------------------------------
   */
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

  /**
   * ---------------------------------------------------------
   * Reset page helper
   * ---------------------------------------------------------
   */
  const resetPage = (
    callback: () => void
  ) => {
    callback();
    setCurrentPage(1);
  };

  /**
   * ---------------------------------------------------------
   * CLEAR ALL FILTERS
   * ---------------------------------------------------------
   */
  const clearFilters = () => {
    setSelectedCategory(
      FILTER_ALL
    );

    setSelectedBrand(
      FILTER_ALL
    );

    setSelectedProductType(
      FILTER_ALL
    );

    setSelectedAvailability(
      FILTER_ALL
    );

    setMinPrice(0);
    setMaxPriceValue(0);
    setCurrentPage(1);

    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    params.delete("brandId");
    params.delete("categoryId");
    params.delete("search");

    const queryString =
      params.toString();

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname
    );
  };

  /**
   * ---------------------------------------------------------
   * Filter Props
   * ---------------------------------------------------------
   */
  const filterProps = {
    categories,
    brands,
    productTypes,
    availabilityOptions,

    selectedCategory,
    selectedBrand,
    selectedProductType,
    selectedAvailability,

    maxPrice:
      maximumProductPrice,

    minPriceValue:
      minPrice,

    maxPriceValue:
      effectiveMaxPrice,

    onCategoryChange: (
      value: string
    ) =>
      resetPage(() =>
        setSelectedCategory(
          value
        )
      ),

    onBrandChange: (
      value: string
    ) => {
      resetPage(() =>
        setSelectedBrand(
          value
        )
      );
    },

    onProductTypeChange: (
      value: string
    ) =>
      resetPage(() =>
        setSelectedProductType(
          value
        )
      ),

    onAvailabilityChange: (
      value: string
    ) =>
      resetPage(() =>
        setSelectedAvailability(
          value as AvailabilityFilter
        )
      ),

    onMinPriceChange: (
      value: number
    ) =>
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

    onMaxPriceChange: (
      value: number
    ) =>
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

  /**
   * ---------------------------------------------------------
   * Loading
   * ---------------------------------------------------------
   */
  if (isLoading) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-20 text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />

          <p className="mt-3 text-sm text-gray-500">
            {t.shop.loading}
          </p>
        </div>
      </main>
    );
  }

  /**
   * ---------------------------------------------------------
   * Error
   * ---------------------------------------------------------
   */
  if (isError) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-20 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            {t.shop.errorTitle}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {t.shop.errorMessage}
          </p>
        </div>
      </main>
    );
  }

  /**
   * ---------------------------------------------------------
   * Page
   * ---------------------------------------------------------
   */
  return (
    <main className="min-w-0 bg-white">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {t.shop.title}
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-gray-600">
            {t.shop.subtitle}
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto w-full max-w-[1500px] min-w-0 px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid min-w-0 gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop Filter */}
          <aside className="hidden min-w-0 lg:block">
            <FilterSidebar
              {...filterProps}
            />
          </aside>

          {/* Products */}
          <div className="min-w-0">
            {/* Toolbar */}
            <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-3">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
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
                    {t.shop.filters}
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

              {/* Product Count */}
              <p className="order-3 w-full text-xs text-gray-600 sm:order-none sm:w-auto">
                {t.shop.showing}{" "}
                <span className="font-semibold text-gray-900">
                  {
                    visibleProducts.length
                  }
                </span>{" "}
                {t.shop.of}{" "}
                <span className="font-semibold text-gray-900">
                  {
                    filteredProducts.length
                  }
                </span>{" "}
                {t.shop.products}
              </p>

              {/* Sort + View */}
              <div className="ml-auto flex min-w-0 items-center gap-2">
                <label
                  htmlFor="shop-sort"
                  className="hidden text-xs font-medium text-gray-500 sm:block"
                >
                  {t.shop.sortBy}
                </label>

                <select
                  id="shop-sort"
                  value={sortBy}
                  onChange={(event) =>
                    resetPage(() =>
                      setSortBy(
                        event.target.value
                      )
                    )
                  }
                  className="
                    h-9
                    max-w-[min(100%,11rem)]
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-2
                    text-xs
                    font-semibold
                    text-gray-800
                    outline-none
                    focus:border-green-600
                    sm:max-w-[12.5rem]
                  "
                >
                  {sortOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {option.label}
                      </option>
                    )
                  )}
                </select>

                <div className="hidden items-center gap-1 sm:flex">
                  <button
                    type="button"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      bg-green-700
                      text-white
                    "
                    aria-label={
                      t.shop.viewGrid
                    }
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-gray-200
                      text-gray-500
                    "
                    aria-label={
                      t.shop.viewList
                    }
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products / Empty State */}
            <div className="min-w-0 overflow-hidden">
              {visibleProducts.length >
                0 ? (
                <ProductGrid
                  products={
                    visibleProducts
                  }
                />
              ) : (
                <div
                  className="
                    flex
                    min-h-[220px]
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-gray-200
                    bg-white
                    px-5
                    py-10
                    text-center
                  "
                >
                  <h2 className="text-lg font-semibold text-gray-950">
                    {t.shop.emptyTitle}
                  </h2>

                  <p className="mt-2 max-w-md text-sm text-gray-500">
                    {t.shop.emptyMessage}
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5"
                    onClick={
                      clearFilters
                    }
                  >
                    {t.shop.clearFilters}
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
                {Array.from({
                  length: totalPages,
                }).map(
                  (_, index) => {
                    const page =
                      index + 1;

                    return (
                      <Button
                        key={page}
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
                            ? "h-8 w-8 rounded-lg bg-green-700 p-0 text-xs text-white hover:bg-green-800"
                            : "h-8 w-8 rounded-lg p-0 text-xs"
                        }
                      >
                        {page}
                      </Button>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto w-full max-w-[1500px] px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 border-t border-gray-100 py-5 sm:grid-cols-2 lg:grid-cols-5">
          {shopBenefits.map(
            (benefit, index) => {
              const Icon =
                benefit.icon;

              return (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-3"
                >
                  <div className="shrink-0 rounded-full bg-green-50 p-2 text-green-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-xs font-semibold text-gray-950">
                      {
                        benefit.title
                      }
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-500">
                      {
                        benefit.description
                      }
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white">
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />
          </div>
        </main>
      }
    >
      <ShopContent />
    </Suspense>
  );
}