"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  User,
  XCircle,
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
  onOrderUpdated?: (
    updatedOrder: Order
  ) => void;
}

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
];

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

function formatDate(date?: string) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatDateTime(date?: string) {
  if (!date) return "-";

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

function orderBadge(status: string) {
  switch (status) {
    case "DELIVERED":
      return "border-green-200 bg-green-50 text-green-700";

    case "SHIPPED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "CONFIRMED":
      return "border-purple-200 bg-purple-50 text-purple-700";

    case "PENDING":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "CANCELLED":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function paymentBadge(status: string) {
  switch (status) {
    case "SUCCESS":
      return "border-green-200 bg-green-50 text-green-700";

    case "PENDING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    case "FAILED":
      return "border-red-200 bg-red-50 text-red-700";

    case "REFUNDED":
      return "border-purple-200 bg-purple-50 text-purple-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function getStatusIndex(status: string) {
  return ORDER_STATUSES.indexOf(status);
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-0.5 text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
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

  useEffect(() => {
    if (!order) return;

    setSelectedStatus(order.status);
    setSuccessMessage("");
    setErrorMessage("");
  }, [order]);

  const address = order?.OrderAddress;

  const isFinalStatus =
    order?.status === "DELIVERED" ||
    order?.status === "CANCELLED";

  const statusChanged =
    !!order &&
    selectedStatus !== order.status;

  const currentStatusIndex = useMemo(() => {
    if (!order) return -1;

    return getStatusIndex(order.status);
  }, [order]);

  if (!order) {
    return null;
  }

  const customerName =
    order.user?.name ||
    address?.fullName ||
    "Guest User";

  const customerPhone =
    order.user?.phone ||
    address?.phone ||
    "-";

  const customerEmail =
    order.user?.email ||
    "-";

  const itemCount =
    order.items?.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    ) || 0;

  const handleUpdateStatus =
    async () => {
      if (
        updating ||
        !statusChanged ||
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
              status: selectedStatus,
            }
          );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
            "Failed to update order status."
          );
        }

        const updatedOrder =
          response.data.data;

        if (updatedOrder) {
          onOrderUpdated?.(
            updatedOrder
          );
        }

        setSuccessMessage(
          "Order status updated successfully."
        );
      } catch (error: any) {
        console.error(
          "Update status error:",
          error
        );

        setSelectedStatus(order.status);

        setErrorMessage(
          error?.response?.data?.message ||
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
        className="w-full overflow-hidden border-l border-slate-200 bg-slate-50 p-0 sm:max-w-2xl"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
          <SheetHeader className="space-y-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <ShoppingBag className="h-4 w-4" />
                  </div>

                  <SheetTitle className="truncate text-lg font-bold text-slate-950">
                    Order #
                    {order.id
                      .slice(-8)
                      .toUpperCase()}
                  </SheetTitle>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Placed{" "}
                  {formatDateTime(
                    order.createdAt
                  )}
                </p>
              </div>

              <Badge
                variant="outline"
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${orderBadge(
                  order.status
                )}`}
              >
                {order.status}
              </Badge>
            </div>
          </SheetHeader>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="h-[calc(100vh-81px)] overflow-y-auto">
          <div className="space-y-4 p-5 pb-32 sm:p-6 sm:pb-32">

            {/* =================================================
                QUICK SUMMARY
            ================================================= */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Items
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {itemCount}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Total
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-700">
                  ₹
                  {formatAmount(
                    order.grandTotal
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Payment
                </p>

                <Badge
                  variant="outline"
                  className={`mt-1 rounded-full text-[10px] ${paymentBadge(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </Badge>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Method
                </p>

                <p className="mt-1 truncate text-sm font-bold text-slate-900">
                  {order.paymentMethod ||
                    "-"}
                </p>
              </div>
            </div>

            {/* =================================================
                STATUS PROGRESS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <Truck className="h-5 w-5" />
                }
                title="Order Progress"
                description="Current delivery status"
              />

              {order.status ===
                "CANCELLED" ? (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <XCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Order Cancelled
                    </p>

                    <p className="mt-0.5 text-xs text-red-600">
                      This order can no longer be
                      updated.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="grid grid-cols-4">
                    {ORDER_STATUSES.map(
                      (status, index) => {
                        const completed =
                          currentStatusIndex >=
                          index;

                        const current =
                          order.status ===
                          status;

                        return (
                          <div
                            key={status}
                            className="relative flex flex-col items-center"
                          >
                            {index <
                              ORDER_STATUSES.length -
                              1 && (
                                <div
                                  className={`absolute left-1/2 top-4 h-0.5 w-full ${currentStatusIndex >
                                      index
                                      ? "bg-emerald-500"
                                      : "bg-slate-200"
                                    }`}
                                />
                              )}

                            <div
                              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${completed
                                  ? "border-emerald-500 bg-emerald-500 text-white"
                                  : "border-slate-200 bg-white text-slate-300"
                                }`}
                            >
                              {completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Circle className="h-3 w-3" />
                              )}
                            </div>

                            <p
                              className={`mt-2 text-center text-[10px] font-semibold ${current
                                  ? "text-emerald-700"
                                  : completed
                                    ? "text-slate-700"
                                    : "text-slate-400"
                                }`}
                            >
                              {status}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* =================================================
                CUSTOMER
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <User className="h-5 w-5" />
                }
                title="Customer"
                description="Customer contact information"
              />

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-emerald-700 shadow-sm">
                    {customerName
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {customerName}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      Customer
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 p-3">
                    <p className="text-[11px] text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-800">
                      <Phone className="h-3.5 w-3.5 text-emerald-600" />
                      {customerPhone}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3">
                    <p className="text-[11px] text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-800">
                      {customerEmail}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                ADDRESS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <MapPin className="h-5 w-5" />
                }
                title="Delivery Address"
                description="Shipping information"
              />

              {address ? (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    {address.fullName}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {address.addressLine}
                    <br />

                    {address.village}

                    {address.taluka
                      ? `, ${address.taluka}`
                      : ""}

                    {address.city
                      ? `, ${address.city}`
                      : ""}

                    <br />

                    {address.district},{" "}
                    {address.state} -{" "}
                    {address.pincode}
                  </p>

                  {address.landmark && (
                    <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
                      <p className="text-xs text-amber-700">
                        <span className="font-semibold">
                          Landmark:
                        </span>{" "}
                        {address.landmark}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 text-xs font-medium text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" />
                    {address.phone}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                  Delivery address not available.
                </div>
              )}
            </section>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <Package className="h-5 w-5" />
                }
                title="Ordered Products"
                description={`${itemCount} item${itemCount === 1
                    ? ""
                    : "s"
                  } in this order`}
              />

              <div className="space-y-3">
                {order.items?.map(
                  (item) => {
                    const productName =
                      item.productName ||
                      item.product?.name ||
                      "Product";

                    const lineTotal =
                      Number(
                        item.price
                      ) *
                      Number(
                        item.quantity
                      );

                    const image =
                      item.product
                        ?.image;

                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                          {image ? (
                            <img
                              src={image}
                              alt={
                                productName
                              }
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-6 w-6 text-slate-300" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                            {productName}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span>
                              Qty{" "}
                              {item.quantity}
                            </span>

                            <span className="text-slate-300">
                              •
                            </span>

                            <span>
                              ₹
                              {formatAmount(
                                item.price
                              )}{" "}
                              / item
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-slate-900">
                            ₹
                            {formatAmount(
                              lineTotal
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </section>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <CreditCard className="h-5 w-5" />
                }
                title="Payment"
                description="Transaction information"
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm text-slate-500">
                    Payment Status
                  </span>

                  <Badge
                    variant="outline"
                    className={`rounded-full px-3 ${paymentBadge(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 p-3">
                    <p className="text-[11px] text-slate-400">
                      Method
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {order.paymentMethod ||
                        "-"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-3">
                    <p className="text-[11px] text-slate-400">
                      Amount
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-700">
                      ₹
                      {formatAmount(
                        order.payment
                          ?.amount ??
                        order.grandTotal
                      )}
                    </p>
                  </div>
                </div>

                {order.payment
                  ?.razorpayPaymentId && (
                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-[11px] text-slate-400">
                        Razorpay Payment ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-700">
                        {
                          order.payment
                            .razorpayPaymentId
                        }
                      </p>
                    </div>
                  )}

                {order.payment
                  ?.transactionId && (
                    <div className="rounded-xl border border-slate-100 p-3">
                      <p className="text-[11px] text-slate-400">
                        Transaction ID
                      </p>

                      <p className="mt-1 break-all font-mono text-xs text-slate-700">
                        {
                          order.payment
                            .transactionId
                        }
                      </p>
                    </div>
                  )}

                {order.payment
                  ?.failureReason && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                      {
                        order.payment
                          .failureReason
                      }
                    </div>
                  )}
              </div>
            </section>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <span className="text-base font-bold">
                    ₹
                  </span>
                }
                title="Order Summary"
                description="Price breakdown"
              />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-medium text-slate-800">
                    ₹
                    {formatAmount(
                      order.subTotal
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Delivery
                  </span>

                  <span className="font-medium text-slate-800">
                    ₹
                    {formatAmount(
                      order.deliveryCharge
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Discount
                  </span>

                  <span className="font-medium text-emerald-600">
                    - ₹
                    {formatAmount(
                      order.discount
                    )}
                  </span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">
                        Grand Total
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-950">
                        ₹
                        {formatAmount(
                          order.grandTotal
                        )}
                      </p>
                    </div>

                    <Badge className="border-0 bg-emerald-100 text-emerald-700">
                      {order.paymentStatus ===
                        "SUCCESS"
                        ? "Paid"
                        : order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                EDIT STATUS
            ================================================= */}

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeader
                icon={
                  <Truck className="h-5 w-5" />
                }
                title="Update Order"
                description="Change the current order status"
              />

              {isFinalStatus ? (
                <div
                  className={`rounded-xl border p-4 ${order.status ===
                      "CANCELLED"
                      ? "border-red-200 bg-red-50"
                      : "border-emerald-200 bg-emerald-50"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {order.status ===
                      "CANCELLED" ? (
                      <XCircle className="mt-0.5 h-5 w-5 text-red-600" />
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    )}

                    <div>
                      <p
                        className={`text-sm font-semibold ${order.status ===
                            "CANCELLED"
                            ? "text-red-800"
                            : "text-emerald-800"
                          }`}
                      >
                        Order{" "}
                        {order.status.toLowerCase()}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Final orders cannot be
                        changed.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    New Status
                  </label>

                  <div className="flex gap-2">
                    <select
                      value={selectedStatus}
                      onChange={(event) => {
                        setSelectedStatus(
                          event.target.value
                        );
                        setSuccessMessage(
                          ""
                        );
                        setErrorMessage("");
                      }}
                      disabled={updating}
                      className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
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

                    <Button
                      type="button"
                      onClick={
                        handleUpdateStatus
                      }
                      disabled={
                        updating ||
                        !statusChanged
                      }
                      className="h-11 shrink-0 rounded-xl bg-emerald-600 px-5 hover:bg-emerald-700"
                    >
                      {updating
                        ? "Updating..."
                        : "Update"}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>

                  {successMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}