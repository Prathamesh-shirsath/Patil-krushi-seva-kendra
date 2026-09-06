"use client";

import {
  Package,
  Truck,
  CheckCircle2,
  Clock3,
  ChevronRight,
  ShoppingBag,
  MapPin,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { getUserOrders } from "@/services/order.service";
import type { Order, OrderStatus } from "@/types/order";
import Link from "next/link";

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: typeof Clock3; className: string }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
  },

  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: Clock3,
    className:
      "border-red-200 bg-red-50 text-red-700",
  },
};

export default function OrdersList() {
  const { user, loading: authLoading } = useAuth();
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError,
  } = useQuery({
    queryKey: ["user-orders", user?.id],
    queryFn: getUserOrders,
    enabled: !authLoading && Boolean(user),
  });

  const isLoading = authLoading || ordersLoading;
  const hasOrdersData = Boolean(user) && !isLoading && !isError;
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "DELIVERED" && order.status !== "CANCELLED"
  ).length;

  const inTransitOrders = orders.filter(
    (order) => order.status === "SHIPPED"
  ).length;

  return (
    <div className="space-y-7">

      {/* ================= PREMIUM HERO ================= */}

      <section className="relative overflow-hidden rounded-[32px] border border-emerald-900/40 bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#047857] p-8 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.45)] sm:p-10">

        <div className="relative z-10 max-w-3xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-50 backdrop-blur-xl">
            <Package className="h-4 w-4" />
            Premium Orders
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/75 sm:text-base">
            Track your agricultural products, manage your
            purchases and view your complete order history.
          </p>

          <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">

            <HeroStat
              label="Total Orders"
              value={hasOrdersData ? String(totalOrders) : "—"}
            />

            <HeroStat
              label="Active"
              value={hasOrdersData ? String(activeOrders) : "—"}
            />

            <HeroStat
              label="Delivered"
              value={hasOrdersData ? String(deliveredOrders) : "—"}
            />

          </div>

        </div>

        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

        <div className="absolute right-10 top-10 hidden h-28 w-28 rounded-full border border-white/10 sm:block" />

        <Package className="absolute bottom-8 right-8 hidden h-32 w-32 text-white/[0.04] sm:block" />

      </section>

      {/* ================= STATS ================= */}

      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          icon={<ShoppingBag className="h-5 w-5" />}
          title="Total Orders"
          value={hasOrdersData ? String(totalOrders) : "—"}
        />

        <StatCard
          icon={<Truck className="h-5 w-5" />}
          title="In Transit"
          value={hasOrdersData ? String(inTransitOrders) : "—"}
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          title="Successfully Delivered"
          value={hasOrdersData ? String(deliveredOrders) : "—"}
        />

      </div>

      {/* ================= SECTION HEADER ================= */}

      <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            Purchase History
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest purchases from Patil Krushi Seva Kendra.
          </p>

        </div>

        <span className="inline-flex w-fit rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700">
          {hasOrdersData
            ? `${totalOrders} Orders`
            : isLoading
            ? "Loading orders..."
            : "Orders unavailable"}
        </span>

      </div>

      {/* ================= ORDERS ================= */}

      <div className="space-y-6">

        {isLoading && <OrdersStateCard message="Loading your orders..." />}

        {!isLoading && !user && (
          <OrdersStateCard message="Please sign in to view your orders." />
        )}

        {!isLoading && user && isError && (
          <OrdersStateCard message="We couldn't load your orders. Please try again." />
        )}

        {!isLoading && user && !isError && orders.length === 0 && (
          <OrdersStateCard message="You haven't placed any orders yet." />
        )}

        {!isLoading && !isError && orders.map((order) => {

          const status = statusConfig[order.status];

          const StatusIcon = status.icon;

          return (
            <Card
              key={order.id}
              className="group overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-0 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_25px_55px_-20px_rgba(6,78,59,0.28)]"
            >

              {/* ================= ORDER HEADER ================= */}

              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/90 via-white to-emerald-50/30 p-5 sm:p-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-lg font-black tracking-tight text-emerald-950">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </h3>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />

                        {status.label}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      Ordered on {formatOrderDate(order.createdAt)}

                      <span className="mx-1 text-slate-300">
                        •
                      </span>

                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Order Total
                    </p>

                    <p className="mt-1 text-2xl font-black text-emerald-700">
                      {formatCurrency(order.grandTotal)}
                    </p>

                  </div>

                </div>

              </div>

              {/* ================= PRODUCTS ================= */}

              <div className="p-5 sm:p-6">

                <div className="space-y-3">

                  {order.items.map((item) => (

                    <div
                      key={item.id}
                      className="group/product flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 transition-all duration-200 hover:border-emerald-100 hover:bg-emerald-50/30"
                    >

                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 ring-1 ring-emerald-100">

                        {item.product.image && (
                          <img
                            src={item.product.image}
                            alt={item.productName}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        )}

                        <Package className="h-7 w-7 text-emerald-600" />

                      </div>

                      <div className="min-w-0 flex-1">

                        <h4 className="truncate text-sm font-bold text-slate-800">
                          {item.productName}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          Quantity: {item.quantity}
                        </p>

                      </div>

                      <p className="text-sm font-black text-slate-800">
                        {formatCurrency(item.price)}
                      </p>

                    </div>

                  ))}

                </div>

                {/* ================= DETAILS ================= */}

                <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Delivery Address
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                        {formatOrderAddress(order)}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Payment
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {getPaymentLabel(order)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                  {/* View Details */}

                  <Link
                    href={`/orders/${order.id}`}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-xl border-slate-200 px-5 font-semibold text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:w-auto"
                    >
                      View Details

                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Track Order */}

                  {(order.status === "CONFIRMED" ||
                    order.status === "SHIPPED") && (
                    <Link
                      href={`/orders/${order.id}/track`}
                      className="w-full sm:w-auto"
                    >
                      <Button className="h-11 w-full rounded-xl bg-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto">
                        <Truck className="mr-2 h-4 w-4" />
                        Track Order
                      </Button>
                    </Link>
                  )}

                  {/* Buy Again */}

                  {order.status === "DELIVERED" && (
                    <Button className="h-11 w-full rounded-xl bg-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto">

                      Buy Again

                      <ArrowRight className="ml-2 h-4 w-4" />

                    </Button>
                  )}

                </div>

              </div>

            </Card>
          );
        })}

      </div>

    </div>
  );
}

function formatOrderDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: string) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function formatOrderAddress(order: Order) {
  const address = order.OrderAddress;

  if (!address) {
    return "Delivery address unavailable.";
  }

  return [
    address.fullName,
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

function getPaymentLabel(order: Order) {
  if (order.paymentMethod === "COD") {
    return "Cash on Delivery";
  }

  if (order.paymentStatus === "SUCCESS") {
    return "Paid Online (Razorpay)";
  }

  if (order.paymentStatus === "FAILED") {
    return "Online Payment Failed";
  }

  if (order.paymentStatus === "REFUNDED") {
    return "Payment Refunded";
  }

  return "Online Payment Pending";
}

function OrdersStateCard({ message }: { message: string }) {
  return (
    <Card className="rounded-[30px] border border-slate-200/80 bg-white p-8 text-center shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
        <Package className="h-6 w-6" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-600">{message}</p>
    </Card>
  );
}

/* ================= HERO STAT ================= */

function HeroStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur-xl">

      <p className="text-[11px] font-medium uppercase tracking-wider text-emerald-100/60">
        {label}
      </p>

      <p className="mt-1 text-xl font-black text-white">
        {value}
      </p>

    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <Card className="group rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_40px_-15px_rgba(6,78,59,0.25)]">

      <div className="flex items-center justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 text-emerald-700 ring-1 ring-emerald-100">
          {icon}
        </div>

        <span className="text-2xl font-black text-emerald-950">
          {value}
        </span>

      </div>

      <p className="mt-4 text-sm font-semibold text-slate-500">
        {title}
      </p>

    </Card>
  );
}
