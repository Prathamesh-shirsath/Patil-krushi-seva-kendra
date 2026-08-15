"use client";

import {
  Download,
  Plus,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onRefresh: () => Promise<void>;
  loading: boolean;
}

export default function OrdersHeader({
  onRefresh,
  loading,
}: Props) {
  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">

        <span>Dashboard</span>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-green-600">
          Orders
        </span>

      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Orders
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customer orders, payments and deliveries.
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">

          <Button
            variant="outline"
            className="rounded-2xl border-slate-200"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading
                  ? "animate-spin"
                  : ""
                }`}
            />

            {loading
              ? "Refreshing..."
              : "Refresh"}
          </Button>

          <Button
            variant="outline"
            className="rounded-2xl border-slate-200"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          {/*<Button
            className="rounded-2xl bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>*/}

        </div>

      </div>

    </div>
  );
}