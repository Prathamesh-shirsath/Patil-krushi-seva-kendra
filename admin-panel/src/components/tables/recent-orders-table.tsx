
"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const orders = [
  {
    id: "#ORD12456",
    amount: "₹2,450",
    status: "Delivered",
  },
  {
    id: "#ORD12455",
    amount: "₹850",
    status: "Processing",
  },
  {
    id: "#ORD12454",
    amount: "₹1,230",
    status: "Shipped",
  },
  {
    id: "#ORD12453",
    amount: "₹780",
    status: "Delivered",
  },
];

export default function RecentOrdersTable() {
  return (
    <Card className="rounded-3xl shadow-sm">

      <CardContent className="p-6">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>

          <button className="text-sm font-medium text-green-600">
            View All
          </button>

        </div>

        <div className="space-y-5">

          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between"
            >
              <div>

                <p className="font-semibold">
                  {order.id}
                </p>

                <p className="text-sm text-slate-500">
                  Order Amount
                </p>

              </div>

              <div className="flex items-center gap-3">

                <span className="font-medium">
                  {order.amount}
                </span>

                <Badge>
                  {order.status}
                </Badge>

              </div>

            </div>
          ))}

        </div>

      </CardContent>

    </Card>
  );
}
