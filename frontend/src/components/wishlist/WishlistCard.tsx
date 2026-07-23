"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Eye,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface WishlistProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string;
}

interface WishlistCardProps {
  product: WishlistProduct;
  listView?: boolean;
}

export default function WishlistCard({
  product,
  listView = false,
}: WishlistCardProps) {
  const discount =
    product.originalPrice &&
    Math.round(
      ((product.originalPrice - product.price) /
        product.originalPrice) *
        100
    );

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg transition-all hover:shadow-2xl ${
        listView ? "flex gap-6 p-5" : ""
      }`}
    >
      {/* Image */}

      <div
        className={`relative overflow-hidden ${
          listView
            ? "h-44 w-44 rounded-2xl"
            : "h-64 w-full"
        }`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Discount */}

        {discount && (
          <Badge className="absolute left-3 top-3 bg-red-600 text-white">
            {discount}% OFF
          </Badge>
        )}

        {/* Badge */}

        {product.badge && (
          <Badge className="absolute left-3 bottom-3 bg-green-600">
            {product.badge}
          </Badge>
        )}

        {/* Heart */}

        <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:bg-red-500 hover:text-white">
          <Heart className="h-5 w-5" />
        </button>

        {/* Quick View */}

        <button className="absolute bottom-3 right-3 rounded-full bg-white p-2 shadow transition hover:bg-green-600 hover:text-white">
          <Eye className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="rounded-full px-3"
          >
            {product.category}
          </Badge>

          <span className="text-sm text-gray-500">
            {product.brand}
          </span>
        </div>

        <h3 className="mt-4 line-clamp-2 text-xl font-bold text-gray-900">
          {product.name}
        </h3>

        {/* Rating */}

        <div className="mt-3 flex items-center gap-2">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={
                  i < Math.round(product.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}

        <div className="mt-5 flex items-end gap-3">
          <span className="text-3xl font-bold text-green-700">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock */}

        <div className="mt-4 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-green-600" />

          <span
            className={`text-sm font-medium ${
              product.stock > 0
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} In Stock`
              : "Out of Stock"}
          </span>
        </div>

        {/* Buttons */}

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Button
            className="rounded-xl bg-green-700 hover:bg-green-800"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add Cart
          </Button>

          <Button
            variant="outline"
            className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
          >
            <Heart className="mr-2 h-4 w-4 fill-current" />
            Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
}