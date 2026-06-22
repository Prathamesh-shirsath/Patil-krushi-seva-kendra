import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  name: string;
  price: number;
  image: string;
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

  return (
    <Card className="group overflow-hidden rounded-lg border border-gray-200 bg-white py-0 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-white p-5">
        {productHref ? (
          <Link href={productHref} className="h-full w-full">
            <Image
              src={image}
              alt={name}
              width={400}
              height={400}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : (
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {badge ? (
          <span className="absolute left-3 top-3 rounded bg-green-700 px-2 py-1 text-[10px] font-semibold text-white">
            {badge}
          </span>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col px-3 pb-3 pt-1">
        <p className="text-[11px] font-semibold text-green-700">
          {category ?? "Product"}
        </p>

        {productHref ? (
          <Link href={productHref}>
            <h3 className="mt-1 min-h-10 text-[13px] font-semibold leading-5 text-gray-950 transition-colors line-clamp-2 hover:text-green-700">
              {name}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 min-h-10 text-[13px] font-semibold leading-5 text-gray-950 line-clamp-2">
            {name}
          </h3>
        )}

        <p className="mt-1 truncate text-[11px] text-gray-500">
          Brand: {brand ?? "Generic"}
          {unit ? ` | ${unit}` : ""}
        </p>

        <div className="mt-1.5 flex items-center gap-1 text-amber-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-[11px] font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
          {reviewCount ? (
            <span className="text-[11px] text-gray-500">({reviewCount})</span>
          ) : null}
        </div>

        <div className="mt-2 flex items-end gap-2">
          <p className="text-base font-bold text-gray-950">Rs. {price}</p>

          {originalPrice ? (
            <p className="pb-0.5 text-xs text-gray-400 line-through">
              Rs. {originalPrice}
            </p>
          ) : null}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Button
            disabled={!isAvailable}
            className="h-8 flex-1 rounded bg-green-700 text-xs text-white hover:bg-green-800 disabled:bg-gray-300"
          >
            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
            Add to Cart
          </Button>

          <button
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-green-200 text-green-700 transition-colors hover:bg-green-50"
            aria-label={`Add ${name} to wishlist`}
          >
            <Heart size={15} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
