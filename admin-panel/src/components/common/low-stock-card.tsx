
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    name: "Bayer Confidor",
    stock: 3,
  },
  {
    name: "UPL Saaf",
    stock: 5,
  },
  {
    name: "Actara",
    stock: 2,
  },
];

export default function LowStockCard() {
  return (
    <Card className="rounded-3xl shadow-sm">

      <CardContent className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Low Stock Products
        </h2>

        <div className="space-y-5">

          {products.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between"
            >
              <span className="font-medium">
                {product.name}
              </span>

              <Badge variant="destructive">
                {product.stock} Left
              </Badge>

            </div>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}

