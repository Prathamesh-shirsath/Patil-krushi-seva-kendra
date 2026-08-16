"use client";

import { useEffect, useState } from "react";

import {
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Printer,
  Download,
  CheckCircle2,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Order } from "@/hooks/use-orders";

import { api } from "@/lib/axios";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;

  /*
  |--------------------------------------------------------------------------
  | Called after successful status update
  |--------------------------------------------------------------------------
  */

  onOrderUpdated?: (
    updatedOrder: Order
  ) => void;
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
  return Number(
    amount ?? 0
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

export default function OrderDetailsSheet({
  open,
  onOpenChange,
  order,
  onOrderUpdated,
}: Props) {
  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [updating, setUpdating] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Sync selected status when order changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (order) {
      setSelectedStatus(
        order.status
      );

      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [order]);

  if (!order) {
    return null;
  }

  const address =
    order.OrderAddress;

  /*
  |--------------------------------------------------------------------------
  | Final statuses cannot be changed
  |--------------------------------------------------------------------------
  */

  const isFinalStatus =
    order.status === "DELIVERED" ||
    order.status === "CANCELLED";

  const statusChanged =
    selectedStatus !==
    order.status;

  /*
  |--------------------------------------------------------------------------
  | UPDATE STATUS
  |--------------------------------------------------------------------------
  */

  const handleUpdateStatus =
    async () => {
      if (
        !statusChanged ||
        updating ||
        isFinalStatus
      ) {
        return;
      }

      try {
        setUpdating(true);
        setSuccessMessage("");
        setErrorMessage("");

        const response =
          await api.put(
            `/orders/${order.id}/status`,
            {
              status:
                selectedStatus,
            }
          );

        if (
          !response.data?.success
        ) {
          throw new Error(
            response.data?.message ||
            "Failed to update order status."
          );
        }

        const updatedOrder =
          response.data.data;

        /*
        |--------------------------------------------------------------------------
        | Update parent/table
        |--------------------------------------------------------------------------
        */

        if (updatedOrder) {
          onOrderUpdated?.(
            updatedOrder
          );
        }

        /*
        |--------------------------------------------------------------------------
        | Success
        |--------------------------------------------------------------------------
        */

        setSuccessMessage(
          "Order status updated successfully."
        );
      } catch (error: any) {
        console.error(
          "Update status error:",
          error
        );

        /*
        |--------------------------------------------------------------------------
        | Revert dropdown if update failed
        |--------------------------------------------------------------------------
        */

        setSelectedStatus(
          order.status
        );

        setErrorMessage(
          error?.response?.data
            ?.message ||
          error?.message ||
          "Failed to update order status."
        );
      } finally {
        setUpdating(false);
      }
    };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">
            Order Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* =====================================================
              CUSTOMER
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <User className="h-5 w-5 text-green-600" />

              <h3 className="text-lg font-semibold">
                Customer Information
              </h3>

            </div>

            <div className="space-y-3">

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Name
                </span>

                <span className="text-right font-medium">
                  {order.user?.name ||
                    address?.fullName ||
                    "Guest User"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Phone
                </span>

                <span>
                  {order.user?.phone ||
                    address?.phone ||
                    "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Email
                </span>

                <span className="max-w-[250px] truncate">
                  {order.user?.email ||
                    "-"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Order ID
                </span>

                <span className="max-w-[250px] truncate text-right text-sm font-semibold">
                  {order.id}
                </span>
              </div>

            </div>

          </div>

          {/* =====================================================
              SHIPPING ADDRESS
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <MapPin className="h-5 w-5 text-green-600" />

              <h3 className="text-lg font-semibold">
                Shipping Address
              </h3>

            </div>

            {address ? (
              <div className="space-y-2 text-sm">

                <p className="font-medium">
                  {address.fullName}
                </p>

                <p>
                  {address.addressLine}
                </p>

                <p>
                  {address.village}

                  {address.taluka
                    ? `, ${address.taluka}`
                    : ""}
                </p>

                {address.city && (
                  <p>
                    {address.city}
                  </p>
                )}

                <p>
                  {address.district},{" "}
                  {address.state}
                </p>

                <p>
                  PIN:{" "}
                  {address.pincode}
                </p>

                {address.landmark && (
                  <p>
                    Landmark:{" "}
                    {address.landmark}
                  </p>
                )}

                <p>
                  Phone:{" "}
                  {address.phone}
                </p>

              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Address not available
                </p>
              </div>
            )}

          </div>

          {/* =====================================================
              PRODUCTS
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <Package className="h-5 w-5 text-green-600" />

              <h3 className="text-lg font-semibold">
                Ordered Products
              </h3>

            </div>

            {order.items &&
              order.items.length > 0 ? (
              <div className="space-y-4">

                {order.items.map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3"
                    >

                      <div className="min-w-0">

                        <p className="truncate font-medium">
                          {item.productName ||
                            item.product
                              ?.name ||
                            "Product"}
                        </p>

                        <p className="text-sm text-slate-500">
                          Qty:{" "}
                          {item.quantity}
                        </p>

                        <p className="text-xs text-slate-400">
                          ₹
                          {formatAmount(
                            item.price
                          )}{" "}
                          / item
                        </p>

                      </div>

                      <p className="shrink-0 font-semibold">
                        ₹
                        {formatAmount(
                          Number(
                            item.price
                          ) *
                          item.quantity
                        )}
                      </p>

                    </div>
                  )
                )}

              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  No products found for this order.
                </p>

              </div>
            )}

          </div>

          {/* =====================================================
              PAYMENT
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <CreditCard className="h-5 w-5 text-green-600" />

              <h3 className="text-lg font-semibold">
                Payment Details
              </h3>

            </div>

            <div className="space-y-3">

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Method
                </span>

                <span className="font-medium">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Status
                </span>

                <Badge
                  className={paymentBadge(
                    order.paymentStatus
                  )}
                >
                  {order.paymentStatus}
                </Badge>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">
                  Payment Amount
                </span>

                <span className="font-semibold">
                  ₹
                  {formatAmount(
                    order.payment
                      ?.amount ??
                    order.grandTotal
                  )}
                </span>
              </div>

              {order.payment
                ?.razorpayPaymentId && (
                  <div className="flex justify-between gap-4">

                    <span className="text-slate-500">
                      Razorpay Payment
                    </span>

                    <span className="max-w-[220px] truncate text-right text-sm font-medium">
                      {
                        order.payment
                          .razorpayPaymentId
                      }
                    </span>

                  </div>
                )}

              {order.payment
                ?.transactionId && (
                  <div className="flex justify-between gap-4">

                    <span className="text-slate-500">
                      Transaction ID
                    </span>

                    <span className="max-w-[220px] truncate text-right text-sm font-medium">
                      {
                        order.payment
                          .transactionId
                      }
                    </span>

                  </div>
                )}

              {order.payment
                ?.failureReason && (
                  <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    {
                      order.payment
                        .failureReason
                    }
                  </div>
                )}

            </div>

          </div>

          {/* =====================================================
              ORDER SUMMARY
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <IndianRupeeIcon />

              <h3 className="text-lg font-semibold">
                Order Summary
              </h3>

            </div>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span>
                  ₹
                  {formatAmount(
                    order.subTotal
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Delivery
                </span>

                <span>
                  ₹
                  {formatAmount(
                    order.deliveryCharge
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Discount
                </span>

                <span className="text-green-600">
                  - ₹
                  {formatAmount(
                    order.discount
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">

                <div className="flex justify-between">

                  <span className="font-semibold">
                    Grand Total
                  </span>

                  <span className="text-xl font-bold text-green-700">
                    ₹
                    {formatAmount(
                      order.grandTotal
                    )}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              ORDER STATUS
          ===================================================== */}

          <div className="rounded-2xl border border-slate-200 p-5">

            <div className="mb-4 flex items-center gap-2">

              <Truck className="h-5 w-5 text-green-600" />

              <h3 className="text-lg font-semibold">
                Order Status
              </h3>

            </div>

            {/* Current status */}

            <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 p-4">

              <Badge
                className={orderBadge(
                  selectedStatus
                )}
              >
                {selectedStatus}
              </Badge>

              <span className="text-sm text-slate-500">
                {new Date(
                  order.createdAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

            </div>

            {/* Status selector */}

            {!isFinalStatus && (
              <div className="space-y-3">

                <label className="text-sm font-medium text-slate-700">
                  Change Order Status
                </label>

                <select
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(
                      event.target.value
                    )
                  }
                  disabled={updating}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
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
            )}

            {isFinalStatus && (
              <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                This order is{" "}
                <span className="font-semibold">
                  {order.status}
                </span>{" "}
                and cannot be changed.
              </div>
            )}

            {/* Success */}

            {successMessage && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">

                <CheckCircle2 className="h-4 w-4" />

                {successMessage}

              </div>
            )}

            {/* Error */}

            {errorMessage && (
              <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

          </div>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>

            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
            >
              <Download className="mr-2 h-4 w-4" />
              Invoice
            </Button>

            <Button
              type="button"
              onClick={
                handleUpdateStatus
              }
              disabled={
                updating ||
                !statusChanged ||
                isFinalStatus
              }
              className="rounded-xl bg-green-600 hover:bg-green-700"
            >
              {updating
                ? "Updating..."
                : "Update Status"}
            </Button>

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

function IndianRupeeIcon() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
      ₹
    </span>
  );
}