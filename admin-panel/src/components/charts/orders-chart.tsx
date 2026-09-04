"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
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
    <Card className="w-full min-w-0 rounded-3xl shadow-sm">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <h2 className="mb-6 text-lg font-semibold sm:text-xl">
          Orders Overview
        </h2>

        {/* Chart */}
        <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={0}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius="45%"
                outerRadius="70%"
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}