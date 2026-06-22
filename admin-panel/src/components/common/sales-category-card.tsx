
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const categories = [
  {
    name: "Pesticides",
    sales: 78,
  },
  {
    name: "Fertilizers",
    sales: 65,
  },
  {
    name: "Seeds",
    sales: 52,
  },
  {
    name: "Organic Products",
    sales: 35,
  },
];

export default function SalesCategoryCard() {
  return (
    <Card className="rounded-3xl shadow-sm">

      <CardContent className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Sales By Category
        </h2>

        <div className="space-y-6">

          {categories.map((category) => (
            <div key={category.name}>

              <div className="mb-2 flex items-center justify-between">

                <span className="font-medium">
                  {category.name}
                </span>

                <span className="text-sm text-slate-500">
                  {category.sales}%
                </span>

              </div>

              <Progress value={category.sales} />

            </div>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}

