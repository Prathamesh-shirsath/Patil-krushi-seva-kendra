"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  search: string;
  status: string;
  payment: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentChange: (value: string) => void;
  onClear: () => void;
}

export default function OrdersFilters({
  search,
  status,
  payment,
  onSearchChange,
  onStatusChange,
  onPaymentChange,
  onClear,
}: Props) {
  const hasFilters =
    search.trim() !== "" ||
    status !== "ALL" ||
    payment !== "ALL";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">

        {/* Search */}

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search Order ID, customer or phone..."
            className="h-11 rounded-2xl border-slate-200 pl-11 pr-4"
          />
        </div>

        {/* Status */}

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className="h-11 min-w-[160px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-green-500"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CONFIRMED">
              Confirmed
            </option>

            <option value="SHIPPED">
              Shipped
            </option>

            <option value="DELIVERED">
              Delivered
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>
        </div>

        {/* Payment */}

        <select
          value={payment}
          onChange={(e) =>
            onPaymentChange(e.target.value)
          }
          className="h-11 min-w-[160px] rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-green-500"
        >
          <option value="ALL">
            All Payments
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="SUCCESS">
            Success
          </option>

          <option value="FAILED">
            Failed
          </option>

          <option value="REFUNDED">
            Refunded
          </option>
        </select>

        {/* Clear */}

        {hasFilters && (
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            className="h-11 rounded-2xl border-slate-200"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}

      </div>
    </div>
  );
}