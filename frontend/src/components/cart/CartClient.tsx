"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Lock,
  RefreshCw,
  Headphones,
  Info,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  inStock: boolean;
  image: string;
};

type RecommendedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Amistar Top Fungicide 1L",
    brand: "Syngenta",
    price: 1250,
    quantity: 1,
    inStock: true,
    image: "/Products/fertilizer_bottle.png",
  },
  {
    id: "2",
    name: "NPK 19:19:19 1Kg",
    brand: "IFFCO",
    price: 320,
    quantity: 2,
    inStock: true,
    image: "/Products/fertilizer_bag.png",
  },
  {
    id: "3",
    name: "Virtako Insecticide 100gm",
    brand: "Syngenta",
    price: 850,
    quantity: 1,
    inStock: true,
    image: "/Products/fertilizer_bag.png",
  },
  {
    id: "4",
    name: "Score 250 EC 1L",
    brand: "Corteva",
    price: 780,
    quantity: 1,
    inStock: true,
    image: "/Products/fertilizer_bottle.png",
  },
  {
    id: "5",
    name: "Ridomil Gold MZ 68 WG 1Kg",
    brand: "Syngenta",
    price: 950,
    quantity: 1,
    inStock: true,
    image: "/Products/fertilizer_bag.png",
  },
];

const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
  {
    id: "rec-1",
    name: "SAAF Fungicide 250gm",
    price: 240,
    image: "/Products/fertilizer_bag.png",
  },
  {
    id: "rec-2",
    name: "Actara Insecticide 100gm",
    price: 265,
    image: "/Products/fertilizer_bottle.png",
  },
  {
    id: "rec-3",
    name: "Bavistin Fungicide 1Kg",
    price: 510,
    image: "/Products/fertilizer_bottle.png",
  },
  {
    id: "rec-4",
    name: "IFFCO Zinc Sulphate 1Kg",
    price: 145,
    image: "/Products/fertilizer_bag.png",
  },
  {
    id: "rec-5",
    name: "Tata Bahaar Plant Growth Regulator 500ml",
    price: 180,
    image: "/Products/fertilizer_bottle.png",
  },
];

const FREE_SHIPPING_THRESHOLD = 750;
const SHIPPING_FEE = 99;

export default function CartClient() {
  const [cartItems, setCartItems] =
    useState<CartItem[]>(INITIAL_CART_ITEMS);

  const [recommendationIndex, setRecommendationIndex] =
    useState(0);

  const [addingProductId, setAddingProductId] =
    useState<string | null>(null);

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = async (productId: string) => {
    try {
      setAddingProductId(productId);

      const response = await fetch(
        "http://localhost:5000/api/cart",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity: 1,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to add product to cart."
        );
      }

      // 🔥 Update Header cart badge instantly
      window.dispatchEvent(
        new Event("cart-updated")
      );

      // 🔥 Success notification
      toast.success("Product added to cart.");
    } catch (error: any) {
      console.error(
        "Add to cart error:",
        error
      );

      toast.error(
        error?.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingProductId(null);
    }
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const updateQuantity = (
    id: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(
            1,
            item.quantity + delta
          );

          return {
            ...item,
            quantity: newQty,
          };
        }

        return item;
      })
    );
  };

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const removeItem = (id: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    // 🔥 Header badge refresh
    window.dispatchEvent(
      new Event("cart-updated")
    );

    toast.success("Item removed from cart.");
  };

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCartItems([]);

    // 🔥 Header badge refresh
    window.dispatchEvent(
      new Event("cart-updated")
    );

    toast.success("Cart cleared.");
  };

  // =========================================================
  // CART CALCULATIONS
  // =========================================================

  const totalItemsCount =
    cartItems.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  const subtotal =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  const shippingCharges =
    subtotal >=
      FREE_SHIPPING_THRESHOLD ||
    cartItems.length === 0
      ? 0
      : SHIPPING_FEE;

  const totalAmount =
    subtotal + shippingCharges;

  const awayFromFreeShipping =
    Math.max(
      0,
      FREE_SHIPPING_THRESHOLD -
        subtotal
    );

  const freeShippingProgressPercent =
    Math.min(
      100,
      Math.round(
        (subtotal /
          FREE_SHIPPING_THRESHOLD) *
          100
      )
    );

  // =========================================================
  // RECOMMENDATION CONTROLS
  // =========================================================

  const handlePrevRec = () => {
    setRecommendationIndex(
      (prev) =>
        prev === 0
          ? 0
          : prev - 1
    );
  };

  const handleNextRec = () => {
    setRecommendationIndex(
      (prev) =>
        prev >=
        RECOMMENDED_PRODUCTS.length -
          4
          ? prev
          : prev + 1
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 pt-3 text-slate-800 sm:pb-16 sm:pt-4">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 sm:mb-4 sm:gap-2 sm:text-sm">
          <Link
            href="/"
            className="transition-colors hover:text-green-700"
          >
            Home
          </Link>

          <span>&gt;</span>

          <span className="font-medium text-slate-900">
            My Cart
          </span>
        </nav>

        {/* Page Title */}
        <div className="mb-4 flex items-baseline gap-2.5 sm:mb-6 sm:gap-3">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
            My Cart
          </h1>

          <span className="text-sm font-bold text-green-700 sm:text-base md:text-lg">
            ({totalItemsCount} Items)
          </span>
        </div>

        {/* Free Shipping Banner */}
        {cartItems.length > 0 && (
          <div className="mb-5 flex flex-col items-stretch justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 shadow-2xs sm:mb-6 sm:flex-row sm:items-center sm:gap-4 sm:rounded-2xl sm:p-4 sm:px-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white sm:h-7 sm:w-7">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </div>

              <p className="text-xs font-medium text-slate-800 sm:text-sm">
                {awayFromFreeShipping > 0 ? (
                  <>
                    You are{" "}
                    <span className="font-bold text-emerald-800">
                      ₹{awayFromFreeShipping}
                    </span>{" "}
                    away from FREE shipping!
                  </>
                ) : (
                  <span className="font-bold text-emerald-800">
                    Congratulations! You qualified
                    for FREE shipping!
                  </span>
                )}
              </p>
            </div>

            <div className="flex w-full items-center gap-2.5 sm:w-auto sm:gap-3">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 sm:h-2.5 sm:w-56 md:w-64">
                <div
                  className="h-full rounded-full bg-emerald-700 transition-all duration-300"
                  style={{
                    width: `${freeShippingProgressPercent}%`,
                  }}
                />
              </div>

              <span className="shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 shadow-2xs sm:px-2.5 sm:py-1 sm:text-xs">
                ₹{FREE_SHIPPING_THRESHOLD}
              </span>
            </div>
          </div>
        )}

        {/* Main Cart */}
        {cartItems.length === 0 ? (
          <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-2xs sm:rounded-3xl sm:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-16 sm:w-16">
              <Truck className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Your cart is empty
            </h2>

            <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
              Looks like you haven't added any products
              to your cart yet.
            </p>

            <div className="mt-5 sm:mt-6">
              <Link href="/shop">
                <Button className="h-10 rounded-xl bg-emerald-700 px-5 text-xs font-medium text-white hover:bg-emerald-800 sm:h-11 sm:px-6 sm:text-sm">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">

            {/* Left Side */}
            <div className="space-y-4 lg:col-span-8 sm:space-y-6">

              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-2xs sm:rounded-2xl">

                {/* Desktop Header */}
                <div className="hidden grid-cols-12 border-b border-slate-100 bg-slate-50/70 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:grid md:px-6">
                  <div className="col-span-6">
                    Product
                  </div>

                  <div className="col-span-2 text-center">
                    Price
                  </div>

                  <div className="col-span-2 text-center">
                    Quantity
                  </div>

                  <div className="col-span-2 text-right">
                    Total
                  </div>
                </div>

                {/* Cart Rows */}
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 transition-colors hover:bg-slate-50/40 sm:p-4 md:p-6"
                    >
                      <div className="flex flex-col items-stretch gap-3 sm:grid sm:grid-cols-12 sm:items-center sm:gap-2">

                        {/* Product */}
                        <div className="flex items-center gap-3 sm:col-span-6 sm:gap-4">
                          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50/80 p-1.5 sm:h-20 sm:w-20 sm:p-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={70}
                              height={70}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                              {item.name}
                            </h3>

                            <p className="mt-0.5 text-[11px] text-slate-500 sm:mt-1 sm:text-xs">
                              Brand:{" "}
                              <span className="font-medium text-slate-700">
                                {item.brand}
                              </span>
                            </p>

                            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 sm:text-xs">
                              <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              In Stock
                            </p>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-2 sm:contents sm:border-0 sm:pt-0">

                          {/* Price */}
                          <div className="text-left sm:col-span-2 sm:text-center">
                            <span className="mr-1.5 text-xs text-slate-400 sm:hidden">
                              Price:
                            </span>

                            <span className="text-xs font-bold text-slate-800 sm:text-sm">
                              ₹
                              {item.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </div>

                          {/* Quantity */}
                          <div className="flex justify-center sm:col-span-2">
                            <div className="inline-flex h-8 items-center rounded-lg border border-slate-200 bg-white sm:h-9">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    -1
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-l-lg text-slate-600 transition-colors hover:bg-slate-100 sm:h-9 sm:w-9"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </button>

                              <span className="flex h-8 w-8 items-center justify-center text-xs font-bold text-slate-800 sm:h-9 sm:w-9">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    1
                                  )
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-r-lg text-slate-600 transition-colors hover:bg-slate-100 sm:h-9 sm:w-9"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Total */}
                          <div className="flex items-center justify-end gap-2.5 sm:col-span-2 sm:gap-3">
                            <div className="text-right">
                              <span className="block text-[10px] text-slate-400 sm:hidden">
                                Total
                              </span>

                              <span className="text-xs font-bold text-slate-900 sm:text-sm">
                                ₹
                                {(
                                  item.price *
                                  item.quantity
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  item.id
                                )
                              }
                              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center justify-between gap-3 pt-1 sm:flex-row sm:gap-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="h-10 w-full gap-2 rounded-xl border-slate-200 px-4 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-red-600 sm:h-11 sm:w-auto sm:px-5 sm:text-sm"
                >
                  <Trash2 className="h-3.5 w-3.5 text-slate-500 sm:h-4 sm:w-4" />
                  Clear Cart
                </Button>

                <Link
                  href="/shop"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="outline"
                    className="h-10 w-full gap-2 rounded-xl border-emerald-600 px-4 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 sm:h-11 sm:w-auto sm:px-5 sm:text-sm"
                  >
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Summary */}
            <div className="w-full space-y-6 lg:col-span-4">
              <div className="space-y-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:space-y-5 sm:rounded-2xl sm:p-6">

                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Order Summary
                </h2>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Subtotal ({totalItemsCount} Items)
                    </span>

                    <span className="font-bold text-slate-800">
                      ₹
                      {subtotal.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      Shipping Charges
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                    </span>

                    <span className="font-bold text-slate-800">
                      {shippingCharges === 0 ? (
                        <span className="text-emerald-700">
                          FREE
                        </span>
                      ) : (
                        `₹${shippingCharges}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-900 sm:text-base">
                      Total Amount
                    </span>

                    <span className="text-xl font-bold text-emerald-700 sm:text-2xl">
                      ₹
                      {totalAmount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] text-slate-400 sm:text-xs">
                    (Inclusive of all taxes)
                  </p>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 sm:p-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 sm:h-9 sm:w-9">
                    <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      Estimated Delivery
                    </p>

                    <p className="text-[11px] font-medium text-slate-600 sm:text-xs">
                      May 16 - May 18, 2024
                    </p>
                  </div>
                </div>

                {/* Checkout */}
                <div className="space-y-2.5 pt-1 sm:space-y-3 sm:pt-2">
                  <Button className="h-11 w-full rounded-xl bg-emerald-700 text-sm font-bold text-white shadow-2xs hover:bg-emerald-800 sm:h-12 sm:text-base">
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    className="h-11 w-full gap-2 rounded-xl border-emerald-600 text-xs font-bold text-emerald-700 hover:bg-emerald-50 sm:h-12 sm:text-sm"
                  >
                    <MessageCircle className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                    Checkout with WhatsApp
                  </Button>
                </div>

                {/* Guarantees */}
                <div className="space-y-3.5 border-t border-slate-100 pt-4 sm:space-y-4 sm:pt-5">

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        100% Original Products
                      </h4>

                      <p className="text-[11px] text-slate-500">
                        Best quality guaranteed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Secure Payments
                      </h4>

                      <p className="text-[11px] text-slate-500">
                        100% secure & trusted payments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Easy Returns
                      </h4>

                      <p className="text-[11px] text-slate-500">
                        Hassle free returns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Headphones className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Expert Support
                      </h4>

                      <p className="text-[11px] text-slate-500">
                        24/7 customer support
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="mt-12 sm:mt-16">

          <div className="mb-4 flex items-center justify-between sm:mb-6">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
              You may also like
            </h2>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handlePrevRec}
                disabled={
                  recommendationIndex === 0
                }
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
                aria-label="Previous recommendation"
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>

              <button
                type="button"
                onClick={handleNextRec}
                disabled={
                  recommendationIndex >=
                  RECOMMENDED_PRODUCTS.length -
                    4
                }
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8"
                aria-label="Next recommendation"
              >
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {RECOMMENDED_PRODUCTS.slice(
              recommendationIndex,
              recommendationIndex + 5
            ).map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-3 text-center shadow-2xs transition-all hover:shadow-md sm:rounded-2xl sm:p-4"
              >
                <div className="relative mb-2 flex h-28 w-full items-center justify-center rounded-lg bg-slate-50 p-2 sm:mb-3 sm:h-32 sm:rounded-xl">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={100}
                    height={100}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="line-clamp-2 h-7 text-[11px] font-bold leading-snug text-slate-900 sm:h-8 sm:text-xs">
                    {prod.name}
                  </h3>

                  <p className="mt-1.5 text-xs font-bold text-slate-900 sm:mt-2 sm:text-sm">
                    ₹{prod.price}
                  </p>
                </div>

                {/* 🔥 UPDATED ADD TO CART BUTTON */}
                <Button
                  variant="outline"
                  disabled={
                    addingProductId === prod.id
                  }
                  onClick={() =>
                    handleAddToCart(
                      prod.id
                    )
                  }
                  className="mt-2.5 h-8 w-full rounded-lg border-emerald-600 text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-3 sm:h-9 sm:rounded-xl sm:text-xs"
                >
                  {addingProductId ===
                  prod.id
                    ? "Adding..."
                    : "Add to Cart"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-12 grid grid-cols-1 gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs sm:mt-16 sm:grid-cols-2 sm:gap-6 sm:rounded-2xl sm:p-6 lg:grid-cols-4">

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-10 sm:w-10">
              <Truck className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Fast & Safe Delivery
              </h4>

              <p className="text-[11px] text-slate-500">
                Quick delivery at your door
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-10 sm:w-10">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Secure Payments
              </h4>

              <p className="text-[11px] text-slate-500">
                100% secure payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-10 sm:w-10">
              <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Easy Returns
              </h4>

              <p className="text-[11px] text-slate-500">
                Hassle free returns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 sm:h-10 sm:w-10">
              <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Expert Support
              </h4>

              <p className="text-[11px] text-slate-500">
                24/7 customer support
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}