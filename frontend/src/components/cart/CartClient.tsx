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
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shippingCharges = subtotal >= FREE_SHIPPING_THRESHOLD || cartItems.length === 0 ? 0 : SHIPPING_FEE;
  const totalAmount = subtotal + shippingCharges;

  const awayFromFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handlePrevRec = () => {
    setRecommendationIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const handleNextRec = () => {
    setRecommendationIndex((prev) =>
      prev >= RECOMMENDED_PRODUCTS.length - 4 ? prev : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 pt-4 text-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center text-xs sm:text-sm text-slate-500 gap-2">
          <Link href="/" className="hover:text-green-700 transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="font-medium text-slate-900">My Cart</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6 flex items-baseline gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Cart
          </h1>
          <span className="text-base sm:text-lg font-bold text-green-700">
            ({totalItemsCount} Items)
          </span>
        </div>

        {/* Free Shipping Banner */}
        {cartItems.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 sm:px-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium text-slate-800">
                {awayFromFreeShipping > 0 ? (
                  <>
                    You are <span className="font-bold text-emerald-800">₹{awayFromFreeShipping}</span> away from FREE shipping!
                  </>
                ) : (
                  <span className="font-bold text-emerald-800">
                    Congratulations! You qualified for FREE shipping!
                  </span>
                )}
              </p>
            </div>

            <div className="flex w-full sm:w-auto items-center gap-3">
              <div className="relative h-2.5 w-full sm:w-64 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-700 transition-all duration-300"
                  style={{ width: `${freeShippingProgressPercent}%` }}
                />
              </div>
              <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-2xs">
                ₹{FREE_SHIPPING_THRESHOLD}
              </span>
            </div>
          </div>
        )}

        {/* Main Cart Content Grid */}
        {cartItems.length === 0 ? (
          <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Truck className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="mt-6">
              <Link href="/shop">
                <Button className="rounded-xl bg-emerald-700 px-6 hover:bg-emerald-800 text-white font-medium">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Side: Cart Items Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xs">
                {/* Desktop Table Header */}
                <div className="hidden sm:grid sm:grid-cols-12 border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Rows */}
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 transition-colors hover:bg-slate-50/40"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 sm:gap-2">
                        {/* Product Info */}
                        <div className="sm:col-span-6 flex items-center gap-4">
                          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50/80 p-2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={70}
                              height={70}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-900 leading-snug">
                              {item.name}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              Brand: <span className="font-medium text-slate-700">{item.brand}</span>
                            </p>
                            <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              In Stock
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="sm:col-span-2 text-left sm:text-center">
                          <span className="sm:hidden text-xs text-slate-400 mr-2">Price:</span>
                          <span className="text-sm font-bold text-slate-800">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Quantity Counter */}
                        <div className="sm:col-span-2 flex justify-start sm:justify-center">
                          <div className="inline-flex h-9 items-center rounded-lg border border-slate-200 bg-white">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-l-lg"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="flex h-9 w-9 items-center justify-center text-xs font-bold text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-9 w-9 items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors rounded-r-lg"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Total & Delete */}
                        <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
                          <span className="text-sm font-bold text-slate-900">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons Under Table */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-red-600 gap-2 h-11 px-5"
                >
                  <Trash2 className="h-4 w-4 text-slate-500" />
                  Clear Cart
                </Button>

                <Link href="/shop" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-xl border-emerald-600 text-emerald-700 hover:bg-emerald-50 gap-2 h-11 px-5 font-semibold"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side: Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-5">
                <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({totalItemsCount} Items)</span>
                    <span className="font-bold text-slate-800">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600 items-center">
                    <span className="flex items-center gap-1">
                      Shipping Charges
                      <Info className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                    <span className="font-bold text-slate-800">
                      {shippingCharges === 0 ? (
                        <span className="text-emerald-700">FREE</span>
                      ) : (
                        `₹${shippingCharges}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-base font-bold text-slate-900">Total Amount</span>
                    <span className="text-2xl font-bold text-emerald-700">
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">(Inclusive of all taxes)</p>
                </div>

                {/* Delivery Estimate Box */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Estimated Delivery</p>
                    <p className="text-xs text-slate-600 font-medium">May 16 - May 18, 2024</p>
                  </div>
                </div>

                {/* Checkout CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-sm">
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold text-sm gap-2"
                  >
                    <MessageCircle className="h-4 w-4 fill-emerald-600 text-emerald-600" />
                    Checkout with WhatsApp
                  </Button>
                </div>

                {/* Guarantees List */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">100% Original Products</h4>
                      <p className="text-xs text-slate-500">Best quality guaranteed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Secure Payments</h4>
                      <p className="text-xs text-slate-500">100% secure & trusted payments</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Easy Returns</h4>
                      <p className="text-xs text-slate-500">Hassle free returns</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Headphones className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Expert Support</h4>
                      <p className="text-xs text-slate-500">24/7 customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like Recommendations Carousel */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              You may also like
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevRec}
                disabled={recommendationIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous recommendation"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNextRec}
                disabled={recommendationIndex >= RECOMMENDED_PRODUCTS.length - 4}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next recommendation"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RECOMMENDED_PRODUCTS.slice(recommendationIndex, recommendationIndex + 5).map(
              (prod) => (
                <div
                  key={prod.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-2xs transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="relative mb-3 flex h-32 w-full items-center justify-center rounded-xl bg-slate-50 p-2">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      width={100}
                      height={100}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 h-8 leading-snug">
                      {prod.name}
                    </h3>
                    <p className="mt-2 text-sm font-bold text-slate-900">
                      ₹{prod.price}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-3 w-full rounded-xl border-emerald-600 text-xs font-bold text-emerald-700 hover:bg-emerald-50 h-9"
                  >
                    Add to Cart
                  </Button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Features Strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Fast & Safe Delivery</h4>
              <p className="text-xs text-slate-500">Quick delivery at your door</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Secure Payments</h4>
              <p className="text-xs text-slate-500">100% secure payments</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Easy Returns</h4>
              <p className="text-xs text-slate-500">Hassle free returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <Headphones className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Expert Support</h4>
              <p className="text-xs text-slate-500">24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
