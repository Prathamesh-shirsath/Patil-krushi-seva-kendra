
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

const data = [
  {
    name: "Delivered",
    value: 156,
    color: "#16a34a",
  },
  {
    name: "Processing",
    value: 52,
    color: "#3b82f6",
  },
  {
    name: "Shipped",
    value: 28,
    color: "#f59e0b",
  },
  {
    name: "Cancelled",
    value: 12,
    color: "#ef4444",
  },
  {
    name: "Returned",
    value: 8,
    color: "#8b5cf6",
  },
];

export default function OrdersChart() {
  return (
    <Card className="rounded-3xl shadow-sm">

      <CardContent className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Orders Overview
        </h2>

        <div className="h-[320px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                innerRadius={80}
                outerRadius={110}
                dataKey="value"
              >

                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}
