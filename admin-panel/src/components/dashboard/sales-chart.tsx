"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 22000 },
  { month: "Apr", revenue: 26000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 42000 },
];

export default function SalesChart() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-3xl border bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold sm:text-xl">
          Sales Overview
        </h2>

        <p className="text-sm text-slate-500">
          Revenue analytics
        </p>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full min-w-0 sm:h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="salesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#16a34a"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#16a34a"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />

            <YAxis
              width={50}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              fill="url(#salesGradient)"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}