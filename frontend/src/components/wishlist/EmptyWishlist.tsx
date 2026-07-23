"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <Heart className="mb-4 h-14 w-14 text-red-500" />

      <h2 className="text-2xl font-bold text-gray-900">
        Your wishlist is empty
      </h2>

      <p className="mt-2 text-gray-500">
        Save your favourite products here.
      </p>

      <Link href="/shop">
        <Button className="mt-6">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}