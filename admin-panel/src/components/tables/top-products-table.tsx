
"use client";

import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "UPL Saaf Fungicide",
    sold: 152,
    revenue: "₹38,500",
  },
  {
    name: "Bayer Confidor",
    sold: 121,
    revenue: "₹31,200",
  },
  {
    name: "IFFCO NPK",
    sold: 98,
    revenue: "₹24,850",
  },
  {
    name: "Syngenta Actara",
    sold: 84,
    revenue: "₹19,900",
  },
];

export default function TopProductsTable() {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Top Selling Products
          </h2>

          <button className="text-sm font-medium text-green-600">
            View All
          </button>
        </div>

        <div className="space-y-5">

          {products.map((product) => (
            <div
              key={product.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">
                  {product.name}
                </p>

                <p className="text-sm text-slate-500">
                  {product.sold} Sold
                </p>
              </div>

              <div className="font-semibold text-green-600">
                {product.revenue}
              </div>

            </div>
          ))}

        </div>

      </CardContent>
    </Card>
  );
}
