
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Check,
  CreditCard,
  Heart,
  Headphones,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";

import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

import type { ShopProduct } from "@/components/shop/ProductGrid";
import type { Product, ProductVariant } from "@/types/product";

import { useWishlist } from "@/hooks/useWishlist";
import { useAddWishlist } from "@/hooks/useAddWishlist";
import { useRemoveWishlist } from "@/hooks/useRemoveWishlist";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";
import Link from "next/link";

type ProductDetailsClientProps = {
  product: Product;
  relatedProducts: ShopProduct[];
};

type ProductTab = "description" | "specifications" | "usage";

function toNumber(value: number | string) {
  return Number(value);
}

function formatPrice(value: number | string) {
  return `₹${toNumber(value).toLocaleString("en-IN")}`;
}

function getGalleryImages(product: Product) {
  const images = [product.image, ...(product.images ?? [])].map((image) =>
    getImageSrc(image, DEFAULT_PRODUCT_IMAGE)
  );

  return Array.from(new Set(images));
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { t } = useLanguage();

  const galleryImages = useMemo(
    () => getGalleryImages(product),
    [product]
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] =
    useState<ProductTab>("description");

  // =========================================================
  // VARIANTS
  // =========================================================

  // Keep all variants for display, but only ACTIVE variants can be selected.
  // This makes the pack-size UI visible even when the admin API has saved
  // some variants with status=false.
  const allVariants = useMemo(
    () => product.variants ?? [],
    [product.variants]
  );

  const activeVariants = useMemo(
    () =>
      allVariants.filter(
        (variant: ProductVariant) => variant.status !== false
      ),
    [allVariants]
  );

  const firstAvailableVariant = useMemo(
    () =>
      activeVariants.find(
        (variant) => Number(variant.stock) > 0
      ) ??
      activeVariants[0] ??
      null,
    [activeVariants]
  );

  const [selectedVariantId, setSelectedVariantId] = useState<
    string | null
  >(firstAvailableVariant?.id ?? null);

  const selectedVariant = useMemo(
    () =>
      activeVariants.find(
        (variant) => variant.id === selectedVariantId
      ) ??
      firstAvailableVariant,
    [activeVariants, selectedVariantId, firstAvailableVariant]
  );

  const selectedPrice = selectedVariant
    ? Number(selectedVariant.price)
    : Number(product.price);

  const selectedStock = selectedVariant
    ? Number(selectedVariant.stock)
    : Number(product.stock ?? 0);

  const isVariantProduct = allVariants.length > 0;

  const isAvailable = isVariantProduct
    ? Boolean(selectedVariant && selectedStock > 0)
    : Number(product.stock ?? 0) > 0;

  const maxQuantity = isVariantProduct
    ? Math.max(1, selectedStock)
    : Math.max(1, Number(product.stock ?? 1));

  // =========================================================
  // GENERAL PRODUCT DATA
  // =========================================================

  const mainImage = getImageSrc(
    galleryImages[activeImageIndex],
    DEFAULT_PRODUCT_IMAGE
  );

  const price = Number(product.price);

  const discountedPrice = product.discountedPrice
    ? Number(product.discountedPrice)
    : null;

  const hasDiscount =
    !isVariantProduct &&
    discountedPrice !== null &&
    discountedPrice < price;

  const brandName =
    product.brand?.name ?? t.common.genericBrand;

  const stockLabel = isAvailable
    ? "In Stock"
    : "Out of Stock";

  const usageGuide =
    product.uses ||
    (product.usedForCrops?.length
      ? `${t.product.details.recommendedFor}${product.usedForCrops.join(
          ", "
        )}`
      : t.product.details.emptyUsageGuide);

  // =========================================================
  // TRUST ITEMS
  // =========================================================

  const trustItems = useMemo(
    () => [
      {
        id: "originalProducts",
        title: t.shop.benefits.originalProducts,
        description:
          t.shop.benefits.originalProductsDescription,
        icon: ShieldCheck,
      },
      {
        id: "fastDelivery",
        title: t.shop.benefits.fastDelivery,
        description:
          t.shop.benefits.fastDeliveryDescription,
        icon: Truck,
      },
      {
        id: "securePayments",
        title: t.shop.benefits.securePayments,
        description:
          t.shop.benefits.securePaymentsDescription,
        icon: CreditCard,
      },
      {
        id: "expertSupport",
        title: t.shop.benefits.expertSupport,
        description:
          t.shop.benefits.expertSupportDescription,
        icon: Headphones,
      },
    ],
    [t]
  );

  // =========================================================
  // TABS
  // =========================================================

  const tabs = useMemo<
    { id: ProductTab; label: string }[]
  >(
    () => [
      {
        id: "description",
        label: t.product.details.tabs.description,
      },
      {
        id: "specifications",
        label:
          t.product.details.tabs.specifications,
      },
      {
        id: "usage",
        label: t.product.details.tabs.usageGuide,
      },
    ],
    [t]
  );

  // =========================================================
  // WISHLIST
  // =========================================================

  const { data: wishlist = [] } = useWishlist();

  const addWishlist = useAddWishlist();
  const removeWishlist = useRemoveWishlist();

  const isWishlisted = wishlist.some(
    (item: any) => item.product.id === product.id
  );

  const wishlistLoading =
    addWishlist.isPending ||
    removeWishlist.isPending;

  // =========================================================
  // CART
  // =========================================================

  const addToCart = useAddToCart();
  const cartLoading = addToCart.isPending;

  // =========================================================
  // IMAGE CONTROLS
  // =========================================================

  const showPreviousImage = () => {
    setActiveImageIndex((index) =>
      index === 0
        ? galleryImages.length - 1
        : index - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((index) =>
      index === galleryImages.length - 1
        ? 0
        : index + 1
    );
  };

  // =========================================================
  // QUANTITY CONTROLS
  // =========================================================

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.min(
        maxQuantity,
        currentQuantity + 1
      )
    );
  };

  // =========================================================
  // VARIANT CHANGE
  // =========================================================

  const handleVariantChange = (
    variant: ProductVariant
  ) => {
    if (Number(variant.stock) <= 0) {
      return;
    }

    setSelectedVariantId(variant.id);
    setQuantity(1);
  };

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    if (!isAvailable || cartLoading) {
      return;
    }

    addToCart.mutate(
      {
        productId: product.id,
        quantity,
        variantId: selectedVariant?.id,
      },
      {
  onSuccess: () => {
    // Cart header count instant update
    window.dispatchEvent(
      new Event("cart-updated")
    );

    // Success notification
    toast.success(
      t.common.toast.addedToCart
    );
  },

  onError: () => {
    toast.error(
      t.common.toast.addToCartFailed
    );
  },
      }
    );
  };

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="mb-5 text-xs text-gray-500 sm:mb-6">
        <Link
          href="/"
          className="transition-colors hover:text-green-700"
        >
          {t.navigation.home}
        </Link>

        <span className="mx-2">/</span>

        <Link
          href="/shop"
          className="transition-colors hover:text-green-700"
        >
          {t.navigation.shop}
        </Link>

        <span className="mx-2">/</span>

        <span className="text-gray-800">
          {product.name}
        </span>
      </div>

      {/* =====================================================
          MAIN PRODUCT LAYOUT
      ===================================================== */}

      <div className="grid gap-5 lg:grid-cols-[1fr_1.05fr_300px] xl:gap-7">
        {/* ===================================================
            IMAGE SECTION
        =================================================== */}

        <div>
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:min-h-[420px] sm:p-6">
            <Image
              src={mainImage}
              alt={product.name}
              width={620}
              height={620}
              className="h-full max-h-[270px] w-full object-contain sm:max-h-[370px]"
              priority
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-xl text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
                  aria-label={
                    t.product.aria.previousImage
                  }
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-xl text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 sm:h-10 sm:w-10"
                  aria-label={
                    t.product.aria.nextImage
                  }
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:mt-4 sm:gap-3">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() =>
                  setActiveImageIndex(index)
                }
                className={`flex aspect-square min-w-[68px] items-center justify-center rounded-xl border bg-white p-2 transition-all sm:min-w-20 ${
                  activeImageIndex === index
                    ? "border-green-700 ring-2 ring-green-100"
                    : "border-gray-200 hover:border-green-300"
                }`}
                aria-label={`${t.product.aria.viewImage} ${
                  index + 1
                }`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================
            PRODUCT INFORMATION
        =================================================== */}

        <div className="min-w-0">
          {/* Category */}
          <p className="text-xs font-bold uppercase tracking-wider text-green-700 sm:text-sm">
            {product.category?.name ?? "Product"}
          </p>

          {/* Product Name */}
          <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-950 sm:text-3xl">
            {product.name}
          </h1>

          {/* Brand */}
          <p className="mt-2 text-sm text-gray-600">
            {t.common.brandLabel}{" "}
            <span className="font-semibold text-gray-900">
              {brandName}
            </span>
          </p>

          {/* Price */}
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-extrabold tracking-tight text-green-700 sm:text-4xl">
              {formatPrice(selectedPrice)}
            </p>

            {!isVariantProduct &&
              hasDiscount &&
              discountedPrice !== null && (
                <p className="pb-1 text-base text-gray-400 line-through sm:text-lg">
                  {formatPrice(price)}
                </p>
              )}
          </div>

          {/* Stock */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold sm:text-sm ${
                isAvailable
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span
                className={`mr-2 h-2 w-2 rounded-full ${
                  isAvailable
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
              {stockLabel}
            </span>

            {isVariantProduct &&
              selectedVariant && (
                <span className="text-xs text-gray-500">
                  {selectedStock} available
                </span>
              )}
          </div>

          {/* =================================================
              COLORFUL VARIANT SELECTOR
          ================================================= */}

          {isVariantProduct && (
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-violet-50 p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md">
                      <Package className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-950 sm:text-base">
                        Select Pack Size
                      </p>
                      <p className="text-xs text-slate-500">
                        Choose the pack that suits your requirement.
                      </p>
                    </div>
                  </div>
                </div>

                {selectedVariant && (
                  <span className="w-fit rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-3 py-1.5 text-[10px] font-extrabold text-white shadow-sm">
                    ✓ {selectedVariant.packSize} selected
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {allVariants.map((variant, index) => {
                  const stock = Number(variant.stock);
                  const isActive = variant.status !== false;
                  const outOfStock = stock <= 0;
                  const disabled = !isActive || outOfStock;
                  const isSelected = selectedVariant?.id === variant.id;

                  const accentClasses = [
                    {
                      card: "from-blue-50 to-cyan-50 border-blue-200",
                      selected: "border-blue-600 ring-blue-200 bg-blue-50",
                      icon: "bg-blue-500 text-white",
                      price: "text-blue-700",
                    },
                    {
                      card: "from-violet-50 to-fuchsia-50 border-violet-200",
                      selected: "border-violet-600 ring-violet-200 bg-violet-50",
                      icon: "bg-violet-500 text-white",
                      price: "text-violet-700",
                    },
                    {
                      card: "from-orange-50 to-amber-50 border-orange-200",
                      selected: "border-orange-600 ring-orange-200 bg-orange-50",
                      icon: "bg-orange-500 text-white",
                      price: "text-orange-700",
                    },
                    {
                      card: "from-emerald-50 to-teal-50 border-emerald-200",
                      selected: "border-emerald-600 ring-emerald-200 bg-emerald-50",
                      icon: "bg-emerald-500 text-white",
                      price: "text-emerald-700",
                    },
                  ][index % 4];

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => handleVariantChange(variant)}
                      className={`relative min-h-[128px] overflow-hidden rounded-2xl border bg-gradient-to-br p-3 text-left transition-all duration-200 sm:p-4 ${
                        isSelected
                          ? `${accentClasses.selected} shadow-lg ring-2`
                          : disabled
                            ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60 grayscale"
                            : `${accentClasses.card} hover:-translate-y-1 hover:shadow-lg`
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow-md">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}

                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${accentClasses.icon}`}>
                        <Package className="h-4 w-4" />
                      </span>

                      <p className="mt-3 truncate text-sm font-extrabold text-slate-950 sm:text-base">
                        {variant.packSize}
                      </p>

                      <p className={`mt-1 text-sm font-black ${accentClasses.price}`}>
                        {formatPrice(variant.price)}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            !isActive
                              ? "bg-slate-200 text-slate-600"
                              : outOfStock
                                ? "bg-red-100 text-red-600"
                                : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {!isActive
                            ? "Unavailable"
                            : outOfStock
                              ? "Out of stock"
                              : `${stock} available`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedVariant ? (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 text-white shadow-lg">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                      <Check className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium text-slate-300">Selected pack</p>
                      <p className="truncate text-xs font-extrabold sm:text-sm">
                        {selectedVariant.packSize}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-black sm:text-base">
                    {formatPrice(selectedVariant.price)}
                  </span>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
                  Pack sizes are available, but none is currently active/in stock.
                </div>
              )}
            </div>
          )}

          {/* =================================================
              QUANTITY
          ================================================= */}

          <div className="mt-6">
            <p className="mb-2 text-sm font-bold text-gray-900">
              {t.product.details.quantity}
            </p>

            <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label={
                  t.product.aria.decreaseQuantity
                }
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="flex h-11 min-w-14 items-center justify-center border-x border-gray-200 px-3 text-base font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  quantity >= maxQuantity
                }
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label={
                  t.product.aria.increaseQuantity
                }
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <div className="mt-5 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
            <Button
              className="h-12 rounded-xl bg-green-700 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-800 hover:shadow-md"
              disabled={
                !isAvailable || cartLoading
              }
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />

              {cartLoading
                ? t.common.addingToCart
                : t.common.addToCart}
            </Button>

          <Button
  variant="outline"
  disabled={wishlistLoading}
  onClick={() => {
    if (wishlistLoading) return;

    if (isWishlisted) {
      removeWishlist.mutate(product.id, {
        onSuccess: () => {
          // Header wishlist count instant update
          window.dispatchEvent(
            new Event("wishlist-updated")
          );
        },
      });
    } else {
      addWishlist.mutate(product.id, {
        onSuccess: () => {
          // Header wishlist count instant update
          window.dispatchEvent(
            new Event("wishlist-updated")
          );
        },
      });
    }
  }}
  className="h-12 rounded-xl border-green-200 text-sm font-bold text-green-700 transition-all hover:bg-green-50"
>
  <Heart
    className={`mr-2 h-4 w-4 ${
      isWishlisted
        ? "fill-red-500 text-red-500"
        : "text-green-700"
    }`}
  />

  {wishlistLoading
    ? t.product.details.pleaseWait
    : isWishlisted
      ? t.product.details.removeWishlist
      : t.product.details.addWishlist}
</Button>
          </div>
        </div>

        {/* ===================================================
            TRUST SIDEBAR
        =================================================== */}

        <Card className="h-fit rounded-2xl border border-gray-200 bg-white py-0 shadow-sm lg:sticky lg:top-24">
          <CardContent className="p-4 sm:p-5">
            <h2 className="text-lg font-bold text-gray-950">
              {t.product.details.whyShopWithUs}
            </h2>

            <div className="mt-5 space-y-5">
              {trustItems.map(
                (item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-gray-950">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =====================================================
          PRODUCT TABS
      ===================================================== */}

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white sm:mt-10">
        <div className="flex overflow-x-auto border-b border-gray-200 text-sm font-bold text-gray-950">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`min-w-max px-4 py-4 transition-colors sm:px-5 ${
                activeTab === tab.id
                  ? "border-b-2 border-green-700 text-green-700"
                  : "hover:text-green-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "description" && (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.description}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </section>
          )}

          {activeTab === "specifications" && (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.specifications}
              </h2>

              <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600">
                <p>
                  {product.features ??
                    t.product.details.emptyFeatures}
                </p>

                <p>
                  {product.cropRecommendation ??
                    t.product.details
                      .emptyCropRecommendations}
                </p>
              </div>
            </section>
          )}

          {activeTab === "usage" && (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.usageGuide}
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {usageGuide}
              </p>
            </section>
          )}
        </div>
      </div>

      {/* =====================================================
          RELATED PRODUCTS
      ===================================================== */}

      <section className="mt-8 sm:mt-10">
        <h2 className="text-xl font-bold text-gray-950 sm:text-2xl">
          {t.product.details.youMayAlsoLike}
        </h2>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {relatedProducts.map(
            (relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="min-w-[250px] sm:min-w-0"
              >
                <ProductCard
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  image={relatedProduct.image}
                  brand={relatedProduct.brand}
                  category={
                    relatedProduct.category
                  }
                  rating={
                    relatedProduct.rating
                  }
                  reviewCount={
                    relatedProduct.reviewCount
                  }
                  originalPrice={
                    relatedProduct.originalPrice
                  }
                  availability={
                    relatedProduct.availability
                  }
                  badge={relatedProduct.badge}
                  unit={relatedProduct.unit}
                  slug={relatedProduct.slug}
                />
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

