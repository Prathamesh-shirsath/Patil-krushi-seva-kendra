import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  DEFAULT_PRODUCT_IMAGE,
  getImageSrc,
} from "@/lib/image-fallbacks";

import { useWishlist } from "@/hooks/useWishlist";
import { useAddWishlist } from "@/hooks/useAddWishlist";
import { useRemoveWishlist } from "@/hooks/useRemoveWishlist";

type Props = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  brand?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  availability?: "In Stock" | "Out of Stock";
  badge?: string;
  unit?: string;
  slug?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  brand,
  category,
  rating = 4.5,
  reviewCount,
  originalPrice,
  availability = "In Stock",
  badge = "New",
  unit,
  slug,
}: Props) {
  const isAvailable = availability === "In Stock";

  const productHref = slug ? `/product/${slug}` : undefined;

  const productImage = getImageSrc(
    image,
    DEFAULT_PRODUCT_IMAGE
  );

  const { data: wishlist = [] } = useWishlist();

  const addWishlist = useAddWishlist();

  const removeWishlist = useRemoveWishlist();

  const isWishlisted = wishlist.some(
    (item: any) => item.product.id === id
  );

  const wishlistLoading =
    addWishlist.isPending || removeWishlist.isPending;

  return (
    <Card className="group flex h-full min-h-[318px] overflow-hidden rounded-xl border border-gray-200 bg-white py-0 text-sm shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-green-100 hover:shadow-xl">
      <div className="relative flex h-[150px] shrink-0 items-center justify-center overflow-hidden bg-white px-4 py-3 sm:h-[158px]">
        {productHref ? (
          <Link
            href={productHref}
            className="flex h-full w-full items-center justify-center"
          >
            <Image
              src={productImage}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-contain transition group-hover:scale-105"
            />
          </Link>
        ) : (
          <Image
            src={productImage}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-contain"
          />
        )}

        {badge && (
          <span className="absolute left-2.5 top-2.5 rounded-md bg-green-700 px-2 py-1 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-0">
        <p className="truncate text-[10px] font-bold uppercase tracking-wide text-green-700">
          {category ?? "Product"}
        </p>

        {productHref ? (
          <Link href={productHref}>
            <h3 className="mt-1 line-clamp-2 h-10 text-[14px] font-bold hover:text-green-700">
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 line-clamp-2 h-10 text-[14px] font-bold">
            {name}
          </h3>
        )}

        <p className="mt-0.5 truncate text-[11px] text-gray-500">
          Brand: {brand ?? "Generic"}
          {unit ? ` | ${unit}` : ""}
        </p>

        <div className="mt-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />

          <span className="text-[11px]">
            {rating.toFixed(1)}
          </span>

          {reviewCount && (
            <span className="text-[11px] text-gray-500">
              ({reviewCount})
            </span>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-lg font-bold">
            ₹{price}
          </p>

          {originalPrice && (
            <p className="text-xs text-gray-400 line-through">
              ₹{originalPrice}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3">
          <Button
            disabled={!isAvailable}
            className="flex-1 bg-green-700 hover:bg-green-800 text-xs px-2 sm:px-3 h-10 font-bold"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5 shrink-0" />
            Add to Cart
          </Button>

          <button
            disabled={wishlistLoading}
            onClick={() => {
              if (isWishlisted) {
                removeWishlist.mutate(id);
              } else {
                addWishlist.mutate(id);
              }
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-green-200 transition hover:bg-green-50 disabled:opacity-50"
          >
            <Heart
              size={18}
              className={
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-green-700"
              }
            />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}