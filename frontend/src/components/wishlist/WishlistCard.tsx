"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useRemoveWishlist } from "@/hooks/useRemoveWishlist";

interface Props {
  wishlistId: string;
  listView?: boolean;

  product: {
    id: string;
    slug: string;
    name: string;
    image?: string;
    price: number;
    packSize?: string;

    brand?: {
      name: string;
    };

    category?: {
      name: string;
    };
  };
}

export default function WishlistCard({
  product,
  listView = false,
}: Props) {
  const removeMutation = useRemoveWishlist();

  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-white shadow transition hover:shadow-xl ${listView ? "flex gap-6 p-5" : ""
        }`}
    >
      <div
        className={`relative overflow-hidden ${listView
            ? "h-44 w-44 rounded-2xl"
            : "h-64 w-full"
          }`}
      >
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {product.category?.name ?? "Category"}
          </Badge>

          <span className="text-sm text-muted-foreground">
            {product.brand?.name ?? ""}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold">
          {product.name}
        </h3>

        {product.packSize && (
          <p className="mt-2 text-sm text-muted-foreground">
            Pack Size : {product.packSize}
          </p>
        )}

        <div className="mt-5 text-3xl font-bold text-green-700">
          ₹{product.price}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
          <Button>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add Cart
          </Button>

          <Link
            href={`/product/${product.slug}`}
            className="w-full"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          className="mt-3 text-red-600 hover:text-red-700"
          disabled={removeMutation.isPending}
          onClick={() =>
            removeMutation.mutate(product.id)
          }
        >
          <Heart className="mr-2 h-4 w-4 fill-current" />

          {removeMutation.isPending
            ? "Removing..."
            : "Remove"}
        </Button>
      </div>
    </div>
  );
}