"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";

const data = [
  {
    date: "12 May",
    sales: 20000,
  },
  {
    date: "13 May",
    sales: 35000,
  },
  {
    date: "14 May",
    sales: 48000,
  },
  {
    date: "15 May",
    sales: 60000,
  },
  {
    date: "16 May",
    sales: 32000,
  },
  {
    date: "17 May",
    sales: 40000,
  },
  {
    date: "18 May",
    sales: 65000,
  },
];

export default function SalesChart() {
  return (
    <Card className="w-full min-w-0 rounded-3xl shadow-sm">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              Sales Overview
            </h2>

            <p className="text-sm text-slate-500">
              Weekly sales analytics
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[280px] w-full min-w-0 sm:h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={0}
          >
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={8}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
                width={45}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Sales",
                ]}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#15803d"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
                activeDot={{
                  r: 7,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}