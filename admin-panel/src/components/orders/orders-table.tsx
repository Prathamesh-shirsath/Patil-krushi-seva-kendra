"use client";
import { useState } from "react";
import {
  Eye,
  SquarePen,
  MoreHorizontal,
} from "lucide-react";
import ResponsiveTable from "@/components/common/responsive-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useOrders } from "@/hooks/use-orders";
import OrderDetailsSheet from "./order-details-sheet";
import OrderCard from "./order-card";

function paymentBadge(status: string) {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "FAILED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

function orderBadge(status: string) {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "SHIPPED":
      return "bg-blue-100 text-blue-700";

    case "CONFIRMED":
      return "bg-purple-100 text-purple-700";

    case "PENDING":
      return "bg-orange-100 text-orange-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function OrdersTable() {
  const { orders, loading } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
        No Orders Found
      </div>
    );
  }

  return (
    <>
        {/* ===========================
          Mobile View
      =========================== */}

      <div className="grid gap-4 lg:hidden">

        {orders.map((order) => (

          <div
            key={order.id}
            className="cursor-pointer"
            onClick={() => {
              setSelectedOrder(order);
              setOpen(true);
            }}
          >
            <OrderCard order={order} />
          </div>

        ))}

      </div>

      {/* ===========================
          Desktop View
      =========================== */}

      <div className="hidden lg:block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <ResponsiveTable>

          <Table>

            <TableHeader>

              <TableRow className="bg-slate-50">

                <TableHead className="font-semibold">
                  Order ID
                </TableHead>

                <TableHead className="font-semibold">
                  Customer
                </TableHead>

                <TableHead className="font-semibold">
                  Phone
                </TableHead>

                <TableHead className="font-semibold">
                  Items
                </TableHead>

                <TableHead className="font-semibold">
                  Amount
                </TableHead>

                <TableHead className="font-semibold">
                  Payment
                </TableHead>

                <TableHead className="font-semibold">
                  Status
                </TableHead>

                <TableHead className="font-semibold">
                  Date
                </TableHead>

                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>
            {orders.map((order) => (

  <TableRow
    key={order.id}
    className="transition-colors hover:bg-green-50"
  >

    {/* Order ID */}

    <TableCell className="font-semibold text-slate-800">
      #{order.id.slice(-8).toUpperCase()}
    </TableCell>

    {/* Customer */}

    <TableCell>

      <div className="space-y-1">

        <p className="font-medium text-slate-900">
          {order.user?.name || "Guest User"}
        </p>

        <p className="text-xs text-slate-500">
          {order.user?.email || ""}
        </p>

      </div>

    </TableCell>

    {/* Phone */}

    <TableCell className="text-slate-600">
      {order.user?.phone || "-"}
    </TableCell>

    {/* Items */}

    <TableCell>

      <Badge
        variant="outline"
        className="rounded-full"
      >
        {order.items?.length || 0} Items
      </Badge>

    </TableCell>

    {/* Amount */}

    <TableCell className="font-semibold text-green-700">
      ₹{order.totalAmount}
    </TableCell>

    {/* Payment */}

    <TableCell>

      <Badge
        className={paymentBadge(order.paymentStatus)}
      >
        {order.paymentStatus}
      </Badge>

    </TableCell>

    {/* Status */}

    <TableCell>

      <Badge
        className={orderBadge(order.status)}
      >
        {order.status}
      </Badge>

    </TableCell>

    {/* Date */}

    <TableCell className="text-slate-600">

      {new Date(order.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )}

    </TableCell>

    {/* Actions */}

    <TableCell>

      <div className="flex justify-end gap-2">

        {/* View */}

        <Button
          size="icon"
          variant="outline"
          className="rounded-xl"
          onClick={() => {
            setSelectedOrder(order);
            setOpen(true);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>

        {/* Edit */}

        <Button
          size="icon"
          variant="outline"
          className="rounded-xl"
        >
          <SquarePen className="h-4 w-4" />
        </Button>

        {/* More */}

        <Button
          size="icon"
          variant="ghost"
          className="rounded-xl"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>

      </div>

    </TableCell>

  </TableRow>

))}
            </TableBody>

          </Table>

        </ResponsiveTable>

        {/* Footer */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 p-5 sm:flex-row">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold">
              {orders.length}
            </span>{" "}
            Orders
          </p>

          <div className="flex items-center gap-2">

            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              Previous
            </Button>

            <Button
              size="sm"
              className="rounded-xl bg-green-600 hover:bg-green-700"
            >
              1
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              Next
            </Button>

          </div>

        </div>

      </div>

      {/* Order Details Drawer */}

      <OrderDetailsSheet
        open={open}
        onOpenChange={setOpen}
        order={selectedOrder}
      />

    </>
  );
}