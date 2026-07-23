"use client";
import Link from "next/link";
import { Heart } from "lucide-react";

<Link href="/wishlist">
  <Heart className="h-6 w-6" />
</Link>

import { Suspense } from "react";

import WishlistHero from "@/components/wishlist/WishlistHero";
import WishlistFilters from "@/components/wishlist/WishlistFilters";
import WishlistGrid from "@/components/wishlist/WishlistGrid";
import WishlistSummary from "@/components/wishlist/WishlistSummary";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";


export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7fff7] via-white to-[#eefbf2]">
      <WishlistHero />

      <section className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <WishlistFilters />

            <Suspense fallback={<WishlistSkeleton />}>
              <WishlistGrid />
            </Suspense>
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <WishlistSummary />
            </div>
          </aside>
        </div>
      </section>

      {/* <MobileWishlistBar /> */}
    </main>
  );
}