"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Delivered",
    value: 55,
  },
  {
    name: "Processing",
    value: 25,
  },
  {
    name: "Cancelled",
    value: 20,
  },
];

const COLORS = [
  "#16a34a",
  "#3b82f6",
  "#ef4444",
];

export default function OrdersChart() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Orders Overview
        </h2>

        <p className="text-sm text-slate-500">
          Order status distribution
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={80}
              outerRadius={120}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}