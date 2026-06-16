import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  name,
  price,
  image,
}: Props) {
  return (
    <Card
      className="
        group
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-xl
        hover:-translate-y-1
      "
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Wishlist */}
        <button
          className="
            absolute
            top-3
            right-3
            bg-white
            p-2
            rounded-full
            shadow-md
          "
        >
          <Heart size={18} />
        </button>

        {/* Badge */}
        <span
          className="
            absolute
            top-3
            left-3
            bg-green-600
            text-white
            text-xs
            px-2
            py-1
            rounded
          "
        >
          New
        </span>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">
          {name}
        </h3>

        <p className="text-green-600 font-bold text-xl mt-2">
          ₹{price}
        </p>

        <Button
          className="w-full mt-4"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
}