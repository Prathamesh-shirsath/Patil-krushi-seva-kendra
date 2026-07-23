"use client";

import Link from "next/link";
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

interface WishlistSummaryProps {
  totalItems?: number;
  totalPrice?: number;
  totalSavings?: number;
}

export default function WishlistSummary({
  totalItems = 12,
  totalPrice = 18450,
  totalSavings = 2650,
}: WishlistSummaryProps) {
  return (
    <div className="space-y-6">

      {/* Main Card */}

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

            <div className="rounded-2xl bg-green-50 p-4">

              <p className="text-sm text-gray-500">

                Products

              </p>

              <h3 className="mt-2 text-3xl font-black text-green-700">

                {totalItems}

              </h3>

            </div>

            <div className="rounded-2xl bg-orange-50 p-4">

              <p className="text-sm text-gray-500">

                Savings

              </p>

              <h3 className="mt-2 text-3xl font-black text-orange-600">

                ₹{totalSavings.toLocaleString()}

              </h3>

            </div>

          </div>

          {/* Divider */}

          <div className="border-t" />

          {/* Price */}

          <div className="space-y-4">

            <Row
              label="Wishlist Value"
              value={`₹${totalPrice.toLocaleString()}`}
            />

            <Row
              label="Estimated Savings"
              value={`- ₹${totalSavings.toLocaleString()}`}
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

              ₹{(totalPrice - totalSavings).toLocaleString()}

            </span>

          </div>

          {/* Buttons */}

          <Button
            className="h-14 w-full rounded-2xl bg-green-700 text-base hover:bg-green-800"
          >

            <ShoppingCart className="mr-2 h-5 w-5" />

            Add All To Cart

          </Button>

          <Button
            variant="outline"
            className="h-14 w-full rounded-2xl border-green-300 text-base"
          >

            Continue Shopping

            <ArrowRight className="ml-2 h-5 w-5" />

          </Button>

        </div>

      </div>

      {/* Benefits */}

      <div className="rounded-3xl border bg-white p-6 shadow-lg">

        <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">

          <Sparkles className="h-5 w-5 text-yellow-500" />

          Why Shop With Us?

        </h3>

        <div className="space-y-4">

          <Feature
            icon={<Truck className="h-5 w-5" />}
            title="Free Delivery"
            subtitle="On eligible orders"
          />

          <Feature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="100% Genuine Products"
            subtitle="Trusted agriculture brands"
          />

          <Feature
            icon={<BadgePercent className="h-5 w-5" />}
            title="Exclusive Offers"
            subtitle="Special discounts available"
          />

        </div>

      </div>

      {/* CTA */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-green-700 to-lime-600 p-6 text-white shadow-xl">

        <h3 className="text-2xl font-bold">

          Ready to Grow Better?

        </h3>

        <p className="mt-3 text-green-100">

          Add your saved products to the cart and complete your purchase today.

        </p>

        <Link href="/shop">

          <Button
            className="mt-6 h-12 w-full rounded-xl bg-white font-semibold text-green-700 hover:bg-green-100"
          >

            Explore More Products

          </Button>

        </Link>

      </div>

    </div>
  );
}

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