"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getOrderById } from "@/services/order.service";
import type { Order, OrderStatus, PaymentMethod, PaymentStatus } from "@/types/order";

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: typeof Clock3; description: string }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    description: "Your order has been placed and is awaiting confirmation.",
  },
  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    description: "Your order has been confirmed.",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    description: "Your order has been shipped.",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    description: "Your order has been delivered.",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: Clock3,
    description: "This order has been cancelled.",
  },
};

export default function TrackOrderPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const orderId = rawId ?? "";
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: Boolean(orderId),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto flex min-h-[70vh] max-w-[900px] items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-sm font-medium text-slate-600">
              Loading order status...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto flex min-h-[70vh] max-w-[900px] items-center justify-center px-4">
          <Card className="w-full rounded-[32px] border-slate-200 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-2xl font-black text-slate-900">
              Order Not Found
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This order was not found or you don't have access to it.
            </p>
            <Link href="/orders" className="mt-6 inline-block">
              <Button className="h-11 rounded-xl bg-emerald-700 px-6 font-bold text-white hover:bg-emerald-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Orders
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const trackingSteps = [
    {
      title: "Order Placed",
      description: "Your order was successfully placed.",
      date: formatDateTime(order.createdAt),
      icon: ShoppingBag,
      completed: true,
    },
    {
      title: `Current Status: ${status.label}`,
      description: "This is the latest status available for your order.",
      date: `Last updated ${formatDateTime(order.updatedAt)}`,
      icon: StatusIcon,
      completed: true,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-8">

        {/* Back */}
        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>

        {/* Premium Header */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#047857] p-7 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.45)] sm:p-10">

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-50 backdrop-blur-xl">
              <Truck className="h-4 w-4" />
              Order Status
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Track Your Order
                </h1>

                <p className="mt-2 text-sm text-emerald-50/70">
                  Order #{order.id}
                </p>
              </div>

            </div>

          </div>

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

          <Truck className="absolute bottom-6 right-8 hidden h-32 w-32 text-white/[0.04] sm:block" />

        </section>

        {/* Content */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px]">

          {/* Timeline */}
          <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)] sm:p-8">

            <div className="mb-8">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Order Progress
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Order Status Timeline
              </h2>

            </div>

            <div className="space-y-0">

              {trackingSteps.map((step, index) => {

                const Icon = step.icon;
                const last = index === trackingSteps.length - 1;

                return (
                  <div
                    key={step.title}
                    className="relative flex gap-5"
                  >

                    {!last && (
                      <div
                        className={`absolute left-[21px] top-11 h-[calc(100%-10px)] w-0.5 ${
                          step.completed
                            ? "bg-emerald-500"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        step.completed
                          ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"
                          : "border-2 border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 pb-9">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                        <h3
                          className={`font-black ${
                            step.completed
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <span className="text-xs font-semibold text-slate-400">
                          {step.date}
                        </span>

                      </div>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                        {step.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </Card>

          {/* Right Sidebar */}
          <div className="space-y-7">

            {/* Current Status */}
            <Card className="rounded-[30px] border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
                  <StatusIcon className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Current Status
                  </p>

                  <h3 className="mt-1 text-xl font-black text-emerald-950">
                    {status.label}
                  </h3>
                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4">

                <p className="text-sm leading-6 text-slate-500">
                  {status.description}
                </p>

              </div>

            </Card>

            {/* Delivery Address */}
            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Shipping
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-950">
                Delivery Address
              </h2>

              <div className="mt-5 flex gap-3 rounded-2xl bg-slate-50 p-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    {order.OrderAddress?.fullName ??
                      order.user.name ??
                      "Customer information unavailable"}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {formatOrderAddress(order)}
                  </p>

                  {(order.OrderAddress?.phone || order.user.phone || order.user.email) && (
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {[order.OrderAddress?.phone ?? order.user.phone, order.user.email]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  )}
                </div>

              </div>

            </Card>

            {/* Order Info */}
            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Order Details
              </p>

              <div className="mt-5 space-y-4">

                <InfoRow
                  label="Order ID"
                  value={order.id}
                />

                <InfoRow
                  label="Status"
                  value={status.label}
                />

                <InfoRow
                  label="Payment Method"
                  value={getPaymentMethodLabel(order.paymentMethod)}
                />

                <InfoRow
                  label="Payment Status"
                  value={formatPaymentStatus(order.paymentStatus)}
                />

              </div>

            </Card>

            {/* Back Button */}
            <Link href="/orders">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-slate-200 font-bold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>

          </div>

        </div>
      </div>
    </main>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-slate-800">
        {value}
      </span>

    </div>
  );
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatOrderAddress(order: Order) {
  const address = order.OrderAddress;

  if (!address) {
    return "Delivery address unavailable.";
  }

  return [
    address.addressLine,
    address.village,
    address.taluka,
    address.city,
    address.district,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ");
}

function getPaymentMethodLabel(paymentMethod: PaymentMethod) {
  return paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay";
}

function formatPaymentStatus(paymentStatus: PaymentStatus) {
  return paymentStatus.charAt(0) + paymentStatus.slice(1).toLowerCase();
}
