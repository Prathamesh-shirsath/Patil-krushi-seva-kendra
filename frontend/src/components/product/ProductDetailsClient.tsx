"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CreditCard,
  Heart,
  Headphones,
  Minus,
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
import type { Product } from "@/types/product";

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

function toNumber(value: Product["price"]) {
  return Number(value);
}

function formatPrice(value: Product["price"]) {
  return `Rs. ${toNumber(value).toLocaleString("en-IN")}`;
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
  const galleryImages = useMemo(() => getGalleryImages(product), [product]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<ProductTab>("description");

  const trustItems = useMemo(
    () => [
      {
        id: "originalProducts",
        title: t.shop.benefits.originalProducts,
        description: t.shop.benefits.originalProductsDescription,
        icon: ShieldCheck,
      },
      {
        id: "fastDelivery",
        title: t.shop.benefits.fastDelivery,
        description: t.shop.benefits.fastDeliveryDescription,
        icon: Truck,
      },
      {
        id: "securePayments",
        title: t.shop.benefits.securePayments,
        description: t.shop.benefits.securePaymentsDescription,
        icon: CreditCard,
      },
      {
        id: "expertSupport",
        title: t.shop.benefits.expertSupport,
        description: t.shop.benefits.expertSupportDescription,
        icon: Headphones,
      },
    ],
    [t]
  );

  const tabs = useMemo<{ id: ProductTab; label: string }[]>(
    () => [
      { id: "description", label: t.product.details.tabs.description },
      { id: "specifications", label: t.product.details.tabs.specifications },
      { id: "usage", label: t.product.details.tabs.usageGuide },
    ],
    [t]
  );

  const mainImage = getImageSrc(
    galleryImages[activeImageIndex],
    DEFAULT_PRODUCT_IMAGE
  );
  const discountedPrice = product.discountedPrice
    ? toNumber(product.discountedPrice)
    : null;
  const price = toNumber(product.price);
  const hasDiscount = discountedPrice !== null && discountedPrice < price;
  const isAvailable =
    typeof product.stock === "number"
      ? product.stock > 0
      : product.status ?? product.isActive ?? true;
  const stockLabel = isAvailable ? t.shop.stock.inStock : t.shop.stock.outOfStock;
  const maxQuantity =
    typeof product.stock === "number" && product.stock > 0
      ? product.stock
      : 1;
  const brandName = product.brand?.name ?? t.common.genericBrand;
  const usageGuide =
    product.uses ||
    (product.usedForCrops?.length
      ? `${t.product.details.recommendedFor}${product.usedForCrops.join(", ")}`
      : t.product.details.emptyUsageGuide);

  // ===========================
  // Wishlist
  // ===========================

  const { data: wishlist = [] } = useWishlist();

  const addWishlist = useAddWishlist();

  const removeWishlist = useRemoveWishlist();

  const isWishlisted = wishlist.some(
    (item: any) => item.product.id === product.id
  );

  const wishlistLoading =
    addWishlist.isPending || removeWishlist.isPending;

  // ===========================
  // Cart
  // ===========================

  const addToCart = useAddToCart();
  const cartLoading = addToCart.isPending;

  // ===========================

  const showPreviousImage = () => {
    setActiveImageIndex((index) =>
      index === 0 ? galleryImages.length - 1 : index - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((index) =>
      index === galleryImages.length - 1 ? 0 : index + 1
    );
  };

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.min(maxQuantity, currentQuantity + 1)
    );
  };

  return (
    <>
      <div className="mb-6 text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">{t.navigation.home}</Link> <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-green-700">{t.navigation.shop}</Link> <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr_320px]">
        <div>
          <div className="relative flex min-h-[320px] items-center justify-center rounded-lg border border-gray-200 bg-white p-4 sm:min-h-[430px] sm:p-6">
            <Image
              src={mainImage}
              alt={product.name}
              width={620}
              height={620}
              className="h-full max-h-[280px] w-full object-contain sm:max-h-[380px]"
              priority
            />

            {galleryImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-green-50 hover:text-green-700"
                  aria-label={t.product.aria.previousImage}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-green-50 hover:text-green-700"
                  aria-label={t.product.aria.nextImage}
                >
                  ›
                </button>
              </>
            ) : null}
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
            {galleryImages.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`flex aspect-square min-w-20 items-center justify-center rounded-md border bg-white p-2 transition-colors ${activeImageIndex === index
                    ? "border-green-700 ring-2 ring-green-100"
                    : "border-gray-200 hover:border-green-300"
                  }`}
                aria-label={`${t.product.aria.viewImage} ${index + 1}`}
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

        <div>
          <p className="text-sm font-semibold text-green-700">
            {product.category?.name ?? "Product"}
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-tight text-gray-950">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-gray-600">
            {t.common.brandLabel}{" "}
            <span className="font-semibold text-gray-900">{brandName}</span>
          </p>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            {hasDiscount ? (
              <>
                <p className="text-3xl font-bold text-green-700">
                  {formatPrice(discountedPrice)}
                </p>
                <p className="pb-1 text-lg text-gray-400 line-through">
                  {formatPrice(price)}
                </p>
              </>
            ) : (
              <p className="text-3xl font-bold text-green-700">
                {formatPrice(price)}
              </p>
            )}
          </div>

          <div className="mt-5 inline-flex rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
            {stockLabel}
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-gray-900">
              {t.product.details.quantity}
            </p>
            <div className="inline-flex h-11 items-center overflow-hidden rounded border border-gray-200">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label={t.product.aria.decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex h-11 w-14 items-center justify-center border-x border-gray-200 text-base font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= maxQuantity}
                className="flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:text-gray-300"
                aria-label={t.product.aria.increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 flex-1 rounded bg-green-700 text-white hover:bg-green-800"
              disabled={!isAvailable || cartLoading}
              onClick={() => {
                addToCart.mutate(
                  {
                    productId: product.id,
                    quantity,
                  },
                  {
                    onSuccess: () => {
                      toast.success(t.common.toast.addedToCart);
                    },
                    onError: () => {
                      toast.error(t.common.toast.addToCartFailed);
                    },
                  }
                );
              }}>
              <ShoppingCart className="mr-2 h-4 w-4" />

              {cartLoading ? t.common.addingToCart : t.common.addToCart}
            </Button>

            <Button
              variant="outline"
              disabled={wishlistLoading}
              onClick={() => {
                if (isWishlisted) {
                  removeWishlist.mutate(product.id);
                } else {
                  addWishlist.mutate(product.id);
                }
              }}
              className="h-11 flex-1 rounded border-green-200 text-green-700 hover:bg-green-50">
              <Heart
                className={`mr-2 h-4 w-4 transition-all ${isWishlisted
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

        <Card className="h-fit rounded-lg border border-gray-200 py-0 shadow-sm">
          <CardContent className="p-5">
            <h2 className="text-lg font-bold text-gray-950">
              {t.product.details.whyShopWithUs}
            </h2>

            <div className="mt-5 space-y-5">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-950">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 rounded-lg border border-gray-200 bg-white">
        <div className="flex overflow-x-auto border-b border-gray-200 text-sm font-semibold text-gray-950">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-max px-5 py-4 transition-colors ${activeTab === tab.id
                  ? "border-b-2 border-green-700 text-green-700"
                  : "text-gray-950 hover:text-green-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === "description" ? (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.description}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            </section>
          ) : null}

          {activeTab === "specifications" ? (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.specifications}
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600">
                <p>
                  {product.features ?? t.product.details.emptyFeatures}
                </p>
                <p>
                  {product.cropRecommendation ??
                    t.product.details.emptyCropRecommendations}
                </p>
              </div>
            </section>
          ) : null}

          {activeTab === "usage" ? (
            <section>
              <h2 className="text-base font-bold text-gray-950">
                {t.product.details.tabs.usageGuide}
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                {usageGuide}
              </p>
            </section>
          ) : null}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-950">
          {t.product.details.youMayAlsoLike}
        </h2>

        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="min-w-[250px] sm:min-w-0">
              <ProductCard
                id={relatedProduct.id}
                name={relatedProduct.name}
                price={relatedProduct.price}
                image={relatedProduct.image}
                brand={relatedProduct.brand}
                category={relatedProduct.category}
                rating={relatedProduct.rating}
                reviewCount={relatedProduct.reviewCount}
                originalPrice={relatedProduct.originalPrice}
                availability={relatedProduct.availability}
                badge={relatedProduct.badge}
                unit={relatedProduct.unit}
                slug={relatedProduct.slug}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
