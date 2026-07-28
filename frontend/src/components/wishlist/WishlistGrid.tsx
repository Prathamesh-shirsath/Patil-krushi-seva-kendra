"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/ui/button";

import WishlistCard from "./WishlistCard";
import WishlistSkeleton from "./WishlistSkeleton";
import EmptyWishlist from "./EmptyWishlist";

import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistGrid() {
  const [gridView, setGridView] = useState(true);

  const {
    data: wishlist = [],
    isLoading,
  } = useWishlist();

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  if (!wishlist.length) {
    return <EmptyWishlist />;
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Saved Products
          </h2>

          <p className="text-sm text-muted-foreground">
            {wishlist.length} Items
          </p>
        </div>

        <div className="flex gap-2">
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

      <div
        className={
          gridView
            ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
            : "space-y-5"
        }
      >
        {wishlist.map((item: any) => (
          <WishlistCard
            key={item.id}
            wishlistId={item.id}
            product={item.product}
            listView={!gridView}
          />
        ))}
      </div>
    </section>
  );
}