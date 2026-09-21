"use client";

import {
  Eye,
  Search,
  SquarePen,
} from "lucide-react";
import { useState } from "react";

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

import OrderCard from "./order-card";
import OrderDetailsSheet from "./order-details-sheet";

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
  return Number(amount ?? 0).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  );
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
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [open, setOpen] = useState(false);

  const openOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleOrderUpdated = async (
    updatedOrder: Order
  ) => {
    setSelectedOrder(updatedOrder);
    await onOrdersUpdated();
  };

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
      {/* MOBILE */}

      <div className="grid gap-4 lg:hidden">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onView={() => openOrder(order)}
            onEdit={() => openOrder(order)}
          />
        ))}
      </div>

      {/* DESKTOP */}

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
                    (total, item) =>
                      total +
                      Number(item.quantity || 0),
                    0
                  ) || 0;

                const customerName =
                  order.user?.name ||
                  order.OrderAddress?.fullName ||
                  "Guest User";

                const phone =
                  order.user?.phone ||
                  order.OrderAddress?.phone ||
                  "-";

                return (
                  <TableRow
                    key={order.id}
                    className="transition-colors hover:bg-green-50"
                  >
                    <TableCell className="font-semibold text-slate-800">
                      #
                      {order.id
                        .slice(-8)
                        .toUpperCase()}
                    </TableCell>

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

                    <TableCell className="text-slate-600">
                      {phone}
                    </TableCell>

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

                    <TableCell className="font-semibold text-green-700">
                      ₹
                      {formatAmount(
                        order.grandTotal
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={paymentBadge(
                          order.paymentStatus
                        )}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={orderBadge(
                          order.status
                        )}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-slate-600">
                      {formatDate(
                        order.createdAt
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            openOrder(order)
                          }
                          title="View order"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="rounded-xl"
                          onClick={() =>
                            openOrder(order)
                          }
                          title="Edit order status"
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ResponsiveTable>

        <div className="flex items-center justify-between border-t border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {orders.length}
            </span>{" "}
            Orders
          </p>
        </div>
      </div>

      <OrderDetailsSheet
        open={open}
        onOpenChange={setOpen}
        order={selectedOrder}
        onOrderUpdated={handleOrderUpdated}
      />
    </>
  );
}