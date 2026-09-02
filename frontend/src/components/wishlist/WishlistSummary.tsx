"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  BadgePercent,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type WishlistItem = {
  id: string;

  product: {
    id: string;
    name?: string;
    price: number | string;
    stock?: number;
  };
};

export default function WishlistSummary() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(true);
  const [addingAll, setAddingAll] = useState(false);

  // =====================================================
  // FETCH WISHLIST
  // =====================================================

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch wishlist"
        );
      }

      const result = await response.json();

      const wishlistData: WishlistItem[] =
        Array.isArray(result?.data)
          ? result.data
          : [];

      setWishlist(wishlistData);
      setTotalItems(wishlistData.length);

      const total = wishlistData.reduce(
        (sum, item) => {
          return (
            sum +
            Number(
              item.product?.price || 0
            )
          );
        },
        0
      );

      setTotalPrice(total);
    } catch (error) {
      console.error(
        "Wishlist summary error:",
        error
      );

      setWishlist([]);
      setTotalItems(0);
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // =====================================================
  // ADD ALL WISHLIST PRODUCTS TO CART
  // =====================================================

  const handleAddAllToCart = async () => {
    if (wishlist.length === 0) {
      toast.error(
        "Your wishlist is empty."
      );
      return;
    }

    try {
      setAddingAll(true);

      let successCount = 0;
      let failedCount = 0;

      // Add each wishlist product
      // one by one so we can handle errors properly.
      for (const item of wishlist) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/cart",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                productId:
                  item.product.id,
                quantity: 1,
              }),
            }
          );

          const result =
            await response.json();

          if (!response.ok || !result?.success) {
            throw new Error(
              result?.message ||
                "Failed to add product"
            );
          }

          successCount++;
        } catch (error) {
          console.error(
            `Failed to add product ${item.product.id}:`,
            error
          );

          failedCount++;
        }
      }

      // Update cart count in Header
      window.dispatchEvent(
        new Event("cart-updated")
      );

      // Show result
      if (
        successCount > 0 &&
        failedCount === 0
      ) {
        toast.success(
          `${successCount} product${
            successCount > 1
              ? "s"
              : ""
          } added to cart successfully.`
        );
      } else if (
        successCount > 0 &&
        failedCount > 0
      ) {
        toast.warning(
          `${successCount} product${
            successCount > 1
              ? "s"
              : ""
          } added. ${failedCount} failed.`
        );
      } else {
        toast.error(
          "Unable to add wishlist products to cart."
        );
      }
    } catch (error) {
      console.error(
        "Add all to cart error:",
        error
      );

      toast.error(
        "Something went wrong while adding products to cart."
      );
    } finally {
      setAddingAll(false);
    }
  };

  // =====================================================
  // PRICES
  // =====================================================

  const totalSavings = 0;

  const formattedPrice =
    totalPrice.toLocaleString(
      "en-IN"
    );

  const formattedSavings =
    totalSavings.toLocaleString(
      "en-IN"
    );

  const estimatedTotal = Math.max(
    totalPrice - totalSavings,
    0
  );

  return (
    <div className="space-y-6">
      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl">
        {/* Header */}

        <div className="bg-gradient-to-r from-green-700 via-green-600 to-lime-500 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
              <Heart className="h-6 w-6 fill-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Wishlist Summary
              </h2>

              <p className="mt-1 text-sm text-green-100">
                Your favourite farming essentials
              </p>
            </div>
          </div>
        </div>

        {/* Body */}

        <div className="space-y-5 p-6">
          {/* Stats */}

          <div className="grid grid-cols-2 gap-4">
            {/* Products */}

            <div className="rounded-2xl bg-green-50 p-4">
              <p className="text-sm text-gray-500">
                Products
              </p>

              <h3 className="mt-2 text-3xl font-black text-green-700">
                {loading
                  ? "..."
                  : totalItems}
              </h3>
            </div>

            {/* Savings */}

            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-sm text-gray-500">
                Savings
              </p>

              <h3 className="mt-2 text-3xl font-black text-orange-600">
                {loading
                  ? "..."
                  : `₹${formattedSavings}`}
              </h3>
            </div>
          </div>

          {/* Divider */}

          <div className="border-t" />

          {/* Price */}

          <div className="space-y-4">
            <Row
              label="Wishlist Value"
              value={
                loading
                  ? "..."
                  : `₹${formattedPrice}`
              }
            />

            <Row
              label="Estimated Savings"
              value={
                loading
                  ? "..."
                  : `- ₹${formattedSavings}`
              }
              green
            />

            <Row
              label="Delivery"
              value="FREE"
              green
            />
          </div>

          <div className="border-t" />

          {/* Final */}

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              Estimated Total
            </span>

            <span className="text-3xl font-black text-green-700">
              {loading
                ? "..."
                : `₹${estimatedTotal.toLocaleString(
                    "en-IN"
                  )}`}
            </span>
          </div>

          {/* =====================================================
              ADD ALL TO CART
          ===================================================== */}

          <Button
            type="button"
            onClick={handleAddAllToCart}
            disabled={
              loading ||
              addingAll ||
              totalItems === 0
            }
            className="h-14 w-full rounded-2xl bg-green-700 text-base hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />

            {addingAll
              ? "Adding Products..."
              : "Add All To Cart"}
          </Button>

          {/* Continue Shopping */}

          <Link
            href="/shop"
            className="block"
          >
            <Button
              variant="outline"
              className="h-14 w-full rounded-2xl border-green-300 text-base"
            >
              Continue Shopping

              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <div className="rounded-3xl border bg-white p-6 shadow-lg">
        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-yellow-500" />

          Why Shop With Us?
        </h3>

        <div className="space-y-4">
          <Feature
            icon={
              <Truck className="h-5 w-5" />
            }
            title="Free Delivery"
            subtitle="On eligible orders"
          />

          <Feature
            icon={
              <ShieldCheck className="h-5 w-5" />
            }
            title="100% Genuine Products"
            subtitle="Trusted agriculture brands"
          />

          <Feature
            icon={
              <BadgePercent className="h-5 w-5" />
            }
            title="Exclusive Offers"
            subtitle="Special discounts available"
          />
        </div>
      </div>

      {/* =====================================================
          CTA
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 to-lime-600 p-6 text-white shadow-xl">
        <h3 className="text-2xl font-bold">
          Ready to Grow Better?
        </h3>

        <p className="mt-3 text-green-100">
          Add your saved products to the
          cart and complete your purchase
          today.
        </p>

        <Link href="/shop">
          <Button className="mt-6 h-12 w-full rounded-xl bg-white font-semibold text-green-700 hover:bg-green-100">
            Explore More Products
          </Button>
        </Link>
      </div>
    </div>
  );
}

// =====================================================
// ROW
// =====================================================

interface RowProps {
  label: string;
  value: string;
  green?: boolean;
}

function Row({
  label,
  value,
  green,
}: RowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">
        {label}
      </span>

      <span
        className={`font-bold ${
          green
            ? "text-green-700"
            : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// =====================================================
// FEATURE
// =====================================================

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function Feature({
  icon,
  title,
  subtitle,
}: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold">
          {title}
        </h4>

        <p className="text-sm text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}