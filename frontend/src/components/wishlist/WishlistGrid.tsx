"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import WishlistCard from "./WishlistCard";
import EmptyWishlist from "./EmptyWishlist";

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

const wishlistProducts: WishlistProduct[] = [
  {
    id: "1",
    name: "Premium NPK Fertilizer",
    brand: "IFFCO",
    category: "Fertilizer",
    image: "/products/fertilizer.jpg",
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviews: 132,
    stock: 24,
    badge: "20% OFF",
  },
  {
    id: "2",
    name: "Organic Bio Pesticide",
    brand: "UPL",
    category: "Pesticide",
    image: "/products/pesticide.jpg",
    price: 549,
    originalPrice: 699,
    rating: 4.7,
    reviews: 84,
    stock: 12,
    badge: "Best Seller",
  },
  {
    id: "3",
    name: "Hybrid Tomato Seeds",
    brand: "Syngenta",
    category: "Seeds",
    image: "/products/seeds.jpg",
    price: 299,
    originalPrice: 349,
    rating: 4.9,
    reviews: 215,
    stock: 58,
    badge: "New",
  },
];

export default function WishlistGrid() {
  const [gridView, setGridView] = useState(true);

  const products = useMemo(() => wishlistProducts, []);

  if (products.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Saved Products
          </h2>

          <p className="text-sm text-gray-500">
            {products.length} items in your wishlist
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant={gridView ? "default" : "outline"}
            onClick={() => setGridView(true)}
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant={!gridView ? "default" : "outline"}
            onClick={() => setGridView(false)}
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Products */}
      <div
        className={
          gridView
            ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            : "space-y-5"
        }
      >
        {products.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
            listView={!gridView}
          />
        ))}
      </div>
    </section>
  );
}