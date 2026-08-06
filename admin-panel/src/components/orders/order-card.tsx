"use client";

import { Eye, SquarePen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  order: any;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm text-slate-500">
            Order ID
          </p>

          <h3 className="font-bold">
            {order.id}
          </h3>
        </div>

        <Badge>
          {order.status}
        </Badge>

      </div>

      <div className="mt-5 space-y-3">

        <div className="flex justify-between">
          <span className="text-slate-500">Customer</span>
          <span>{order.user?.name ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Phone</span>
          <span>{order.user?.phone ?? "-"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Amount</span>
          <span className="font-semibold">
            ₹{order.totalAmount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">
            Payment
          </span>

          <Badge variant="outline">
            {order.paymentStatus}
          </Badge>
        </div>

      </div>

      <div className="mt-6 flex gap-3">

        <Button className="flex-1 rounded-xl">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>

        <Button
          variant="outline"
          className="flex-1 rounded-xl"
        >
          <SquarePen className="mr-2 h-4 w-4" />
          Edit
        </Button>

      </div>

    </div>
  );
}