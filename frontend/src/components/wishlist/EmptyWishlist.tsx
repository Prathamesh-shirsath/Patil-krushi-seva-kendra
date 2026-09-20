"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

export default function EmptyWishlist() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
      <Heart className="mb-4 h-14 w-14 text-red-500" />

      <h2 className="text-2xl font-bold text-gray-900">
        {t.wishlist.empty.title}
      </h2>

      <p className="mt-2 text-gray-500">
        {t.wishlist.empty.message}
      </p>

      <Link href="/shop">
        <Button className="mt-6">
          {t.common.continueShopping}
        </Button>
      </Link>
    </div>
  );
}