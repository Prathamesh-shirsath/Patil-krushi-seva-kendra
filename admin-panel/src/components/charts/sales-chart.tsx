
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
    <Card className="rounded-3xl shadow-sm">

      <CardContent className="p-6">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Sales Overview
            </h2>

            <p className="text-sm text-slate-500">
              Weekly sales analytics
            </p>
          </div>

        </div>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="date"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#15803d"
                strokeWidth={3}
                dot={{
                  r: 5,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}
