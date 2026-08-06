"use client";

import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function OrdersFilters() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

        {/* Search */}

        <div className="relative sm:col-span-2 xl:col-span-2">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search Order ID, Customer, Phone..."
            className="h-11 w-full rounded-xl pl-10"
          />

        </div>

        {/* Status */}

        <select
          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            outline-none
            transition
            focus:border-green-500
            focus:ring-2
            focus:ring-green-100
          "
        >
          <option>All Status</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        {/* Payment */}

        <select
          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            text-sm
            outline-none
            transition
            focus:border-green-500
            focus:ring-2
            focus:ring-green-100
          "
        >
          <option>All Payments</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        {/* Reset */}

        <Button
          variant="outline"
          className="h-11 w-full rounded-xl xl:w-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

      </div>

    </div>
  );
}