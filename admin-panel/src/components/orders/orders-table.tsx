"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  SquarePen,
  MoreHorizontal,
  Search,
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

import type { Order } from "@/hooks/use-orders";

import OrderDetailsSheet from "./order-details-sheet";
import OrderCard from "./order-card";

interface Props {
  orders: Order[];
  loading: boolean;
  onOrdersUpdated: () => Promise<void>;
}

function paymentBadge(status: string) {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-700";

    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "FAILED":
      return "bg-red-100 text-red-700";

    case "REFUNDED":
      return "bg-purple-100 text-purple-700";

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

function formatAmount(
  amount: number | string | null | undefined
) {
  const value = Number(amount ?? 0);

  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default function OrdersTable({
  orders,
  loading,
  onOrdersUpdated,
}: Props) {
  const router = useRouter();

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [open, setOpen] =
    useState(false);

  const openOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  
  const router = useRouter();

   

  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="flex flex-col items-center gap-3">

          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-green-600" />

          <p className="text-slate-500">
            Loading Orders...
          </p>

        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | No Orders / No Filter Results
  |--------------------------------------------------------------------------
  */

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
          <Search className="h-6 w-6 text-slate-400" />
        </div>

        <p className="mt-4 text-lg font-semibold text-slate-700">
          No Orders Found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or filters.
        </p>

      </div>
    );
  }

  return (
    <>
      {/* =========================================================
          MOBILE VIEW
      ========================================================= */}

      <div className="grid gap-4 lg:hidden">

        {orders.map((order) => (
          <div
            key={order.id}
            className="cursor-pointer"
            onClick={() =>
              openOrder(order)
            }
          >
            <OrderCard
              order={order}
            />
          </div>
        ))}

      </div>

      {/* =========================================================
          DESKTOP VIEW
      ========================================================= */}

      <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">

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

              {orders.map((order) => {

                const itemCount =
                  order.items?.reduce(
                    (
                      total,
                      item
                    ) =>
                      total +
                      item.quantity,
                    0
                  ) || 0;

                const customerName =
                  order.user?.name ||
                  order.OrderAddress
                    ?.fullName ||
                  "Guest User";

                const phone =
                  order.user?.phone ||
                  order.OrderAddress
                    ?.phone ||
                  "-";

                return (
                  <TableRow
                    key={order.id}
                    className="transition-colors hover:bg-green-50"
                  >

                    {/* =================================================
                        ORDER ID
                    ================================================= */}

                    <TableCell className="font-semibold text-slate-800">

                      #
                      {order.id
                        .slice(-8)
                        .toUpperCase()}

                    </TableCell>

                    {/* =================================================
                        CUSTOMER
                    ================================================= */}

                    <TableCell>

                      <div className="space-y-1">

                        <p className="font-medium text-slate-900">
                          {customerName}
                        </p>

                        {order.user?.email && (
                          <p className="text-xs text-slate-500">
                            {order.user.email}
                          </p>
                        )}

                      </div>

                    </TableCell>

                    {/* =================================================
                        PHONE
                    ================================================= */}

                    <TableCell className="text-slate-600">
                      {phone}
                    </TableCell>

                    {/* =================================================
                        ITEMS
                    ================================================= */}

                    <TableCell>

                      <Badge
                        variant="outline"
                        className="rounded-full"
                      >
                        {itemCount}{" "}
                        {itemCount === 1
                          ? "Item"
                          : "Items"}
                      </Badge>

                    </TableCell>

                    {/* =================================================
                        AMOUNT
                    ================================================= */}

                    <TableCell className="font-semibold text-green-700">

                      ₹
                      {formatAmount(
                        order.grandTotal
                      )}

                    </TableCell>

                    {/* =================================================
                        PAYMENT
                    ================================================= */}

                    <TableCell>

                      <Badge
                        className={paymentBadge(
                          order.paymentStatus
                        )}
                      >
                        {order.paymentStatus}
                      </Badge>

                    </TableCell>

                    {/* =================================================
                        ORDER STATUS
                    ================================================= */}

                    <TableCell>

                      <Badge
                        className={orderBadge(
                          order.status
                        )}
                      >
                        {order.status}
                      </Badge>

                    </TableCell>

                    {/* =================================================
                        DATE
                    ================================================= */}

                    <TableCell className="whitespace-nowrap text-slate-600">

                      {formatDate(
                        order.createdAt
                      )}

                    </TableCell>

                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <TableCell>

                      <div className="flex justify-end gap-2">

                        {/* View */}

                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            router.push(
                              `/orders/${order.id}`
                            )
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Edit */}

                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="rounded-xl"
                          disabled
                          title="Status update will be enabled after admin authentication"
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>

                        {/* More */}

                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="rounded-xl"
                          disabled
                          title="More actions coming soon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                      </div>

                    </TableCell>

                  </TableRow>
                );
              })}

            </TableBody>

          </Table>

        </ResponsiveTable>

        {/* =========================================================
            FOOTER
        ========================================================= */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 p-5 sm:flex-row">

          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-900">
              {orders.length}
            </span>

            {" "}Orders

          </p>

          <div className="flex items-center gap-2">

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled
            >
              Previous
            </Button>

            <Button
              type="button"
              size="sm"
              className="rounded-xl bg-green-600 hover:bg-green-700"
            >
              1
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl"
              disabled
            >
              Next
            </Button>

          </div>

        </div>

      </div>

      {/* =========================================================
          ORDER DETAILS
      ========================================================= */}

      <OrderDetailsSheet
        open={open}
        onOpenChange={setOpen}
        order={selectedOrder}
        onOrderUpdated={async (updatedOrder) => {
          setSelectedOrder(updatedOrder);
          await onOrdersUpdated();
        }}
      />
    </>
  );
}