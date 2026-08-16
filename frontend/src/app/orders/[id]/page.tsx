"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Download,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Shipped"
  | "Delivered";

type Product = {
  name: string;
  quantity: number;
  price: string;
  image: string;
};

type Order = {
  id: string;
  date: string;
  items: number;
  products: Product[];
  total: string;
  payment: string;
  status: OrderStatus;
  address: string;
};

const orders: Order[] = [
  {
    id: "#PKS-10245",
    date: "16 Aug 2026",
    items: 3,
    products: [
      {
        name: "Premium Crop Fertilizer",
        quantity: 1,
        price: "₹799",
        image: "/products/fertilizer.webp",
      },
      {
        name: "Cotton Seeds",
        quantity: 1,
        price: "₹650",
        image: "/products/cotton-seeds.webp",
      },
      {
        name: "Plant Growth Booster",
        quantity: 1,
        price: "₹400",
        image: "/products/growth-booster.webp",
      },
    ],
    total: "₹1,849",
    payment: "Paid Online",
    status: "Delivered",
    address: "Sambhaji Nagar, Maharashtra",
  },

  {
    id: "#PKS-10231",
    date: "12 Aug 2026",
    items: 2,
    products: [
      {
        name: "Organic Fertilizer",
        quantity: 1,
        price: "₹699",
        image: "/products/organic-fertilizer.webp",
      },
      {
        name: "Insect Control Solution",
        quantity: 1,
        price: "₹600",
        image: "/products/insecticide.webp",
      },
    ],
    total: "₹1,299",
    payment: "Cash on Delivery",
    status: "Shipped",
    address: "Sambhaji Nagar, Maharashtra",
  },

  {
    id: "#PKS-10198",
    date: "08 Aug 2026",
    items: 1,
    products: [
      {
        name: "Premium Vegetable Seeds",
        quantity: 1,
        price: "₹499",
        image: "/products/seeds.webp",
      },
    ],
    total: "₹499",
    payment: "Paid Online",
    status: "Confirmed",
    address: "Sambhaji Nagar, Maharashtra",
  },
];

const statusConfig = {
  Pending: {
    icon: Clock3,
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  Confirmed: {
    icon: CheckCircle2,
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  Shipped: {
    icon: Truck,
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
  },

  Delivered: {
    icon: CheckCircle2,
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

export default function OrderDetailsPage() {
  const params = useParams();

  const rawId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const orderId = rawId
    ? `#${rawId.replace("#", "")}`
    : "";

  const order = orders.find(
    (item) => item.id === orderId
  );

  /* ================= INVALID ORDER ================= */

  if (!order) {
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
              We couldn't find this order. Please return to
              your orders and select an available order.
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">

      <div className="mx-auto max-w-[1500px] px-4 py-8 lg:px-8">

        {/* ================= BACK ================= */}

        <Link
          href="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Orders
        </Link>

        {/* ================= PREMIUM HEADER ================= */}

        <section className="relative overflow-hidden rounded-[32px] border border-emerald-900/40 bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#047857] p-7 shadow-[0_20px_60px_-15px_rgba(6,78,59,0.45)] sm:p-9">

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-50 backdrop-blur-xl">
                <Package className="h-4 w-4" />
                Order Details
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                {order.id}
              </h1>

              <p className="mt-2 text-sm text-emerald-50/70">
                Placed on {order.date}
              </p>

            </div>

            <div className="flex flex-wrap gap-3">

              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold ${status.className}`}
              >
                <StatusIcon className="h-4 w-4" />
                {order.status}
              </span>

              <Button
                variant="outline"
                className="rounded-xl border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Invoice
              </Button>

            </div>

          </div>

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

          <Package className="absolute bottom-6 right-8 hidden h-32 w-32 text-white/[0.04] sm:block" />

        </section>

        {/* ================= CONTENT ================= */}

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px]">

          {/* ================= LEFT ================= */}

          <div className="space-y-7">

            {/* Products */}

            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)] sm:p-8">

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                    Purchased Items
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-slate-950">
                    Order Items ({order.items})
                  </h2>

                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  {order.items} Items
                </span>

              </div>

              <div className="mt-6 space-y-3">

                {order.products.map((product) => (

                  <div
                    key={product.name}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:border-emerald-100 hover:bg-emerald-50/30"
                  >

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-emerald-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <Package className="absolute h-7 w-7 text-emerald-600" />

                    </div>

                    <div className="min-w-0 flex-1">

                      <h3 className="truncate font-bold text-slate-800">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Quantity: {product.quantity}
                      </p>

                    </div>

                    <p className="font-black text-slate-900">
                      {product.price}
                    </p>

                  </div>

                ))}

              </div>

            </Card>

            {/* Shipping */}

            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)] sm:p-8">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Shipping
                  </p>

                  <h2 className="text-xl font-black text-slate-950">
                    Delivery Address
                  </h2>

                </div>

              </div>

              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-5">

                <p className="font-bold text-slate-800">
                  Customer
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {order.address}
                </p>

              </div>

            </Card>

            {/* Order Timeline */}

            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)] sm:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Order Progress
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Order Timeline
              </h2>

              <div className="mt-7 space-y-0">

                <TimelineItem
                  title="Order Placed"
                  description="Your order was successfully placed."
                  date={order.date}
                  completed
                />

                <TimelineItem
                  title="Order Confirmed"
                  description="The seller confirmed your order."
                  date={order.status !== "Pending" ? order.date : "Pending"}
                  completed={
                    order.status !== "Pending"
                  }
                />

                <TimelineItem
                  title="Shipped"
                  description="Your order has been shipped."
                  date={
                    order.status === "Shipped" ||
                    order.status === "Delivered"
                      ? "17 Aug 2026"
                      : "Pending"
                  }
                  completed={
                    order.status === "Shipped" ||
                    order.status === "Delivered"
                  }
                />

                <TimelineItem
                  title="Delivered"
                  description="Your order has been delivered successfully."
                  date={
                    order.status === "Delivered"
                      ? "18 Aug 2026"
                      : "Pending"
                  }
                  completed={
                    order.status === "Delivered"
                  }
                  last
                />

              </div>

            </Card>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-7">

            {/* Summary */}

            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Payment
              </p>

              <h2 className="mt-1 text-xl font-black text-slate-950">
                Order Summary
              </h2>

              <div className="mt-5 space-y-4">

                <SummaryRow
                  label="Subtotal"
                  value={order.total}
                />

                <SummaryRow
                  label="Shipping Charge"
                  value="₹0"
                />

                <SummaryRow
                  label="Discount"
                  value="- ₹0"
                  green
                />

                <div className="border-t border-slate-100 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-slate-800">
                      Total Amount
                    </span>

                    <span className="text-2xl font-black text-emerald-700">
                      {order.total}
                    </span>

                  </div>

                </div>

              </div>

            </Card>

            {/* Payment Info */}

            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Payment
                  </p>

                  <h2 className="text-xl font-black text-slate-950">
                    Payment Information
                  </h2>

                </div>

              </div>

              <div className="mt-6 space-y-4">

                <SummaryRow
                  label="Method"
                  value={order.payment}
                />

                <SummaryRow
                  label="Payment Status"
                  value={
                    order.payment === "Cash on Delivery"
                      ? "Pending"
                      : "Paid"
                  }
                  green={
                    order.payment !== "Cash on Delivery"
                  }
                />

                <SummaryRow
                  label="Transaction ID"
                  value={
                    order.payment === "Cash on Delivery"
                      ? "COD"
                      : "UPI5588744877"
                  }
                />

              </div>

            </Card>

            {/* Track Button */}

            {(order.status === "Shipped" ||
              order.status === "Confirmed") && (
              <Link
                href={`/orders/${order.id.replace("#", "")}/track`}
              >
                <Button className="h-12 w-full rounded-xl bg-emerald-700 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800">
                  <Truck className="mr-2 h-5 w-5" />
                  Track This Order
                </Button>
              </Link>
            )}

            <Link href="/orders">
              <Button
                variant="outline"
                className="mt-3 h-12 w-full rounded-xl border-slate-200 font-bold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
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

/* ================= TIMELINE ================= */

function TimelineItem({
  title,
  description,
  date,
  completed,
  last = false,
}: {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">

      {!last && (
        <div
          className={`absolute left-5 top-10 h-[calc(100%-5px)] w-0.5 ${
            completed
              ? "bg-emerald-500"
              : "bg-slate-200"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-emerald-700 text-white shadow-lg shadow-emerald-700/20"
            : "border-2 border-slate-200 bg-white text-slate-400"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Clock3 className="h-5 w-5" />
        )}
      </div>

      <div className="flex-1 pb-8">

        <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">

          <h3
            className={`font-black ${
              completed
                ? "text-slate-900"
                : "text-slate-400"
            }`}
          >
            {title}
          </h3>

          <span className="text-xs font-semibold text-slate-400">
            {date}
          </span>

        </div>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

/* ================= SUMMARY ROW ================= */

function SummaryRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span
        className={`text-right text-sm font-bold ${
          green
            ? "text-emerald-700"
            : "text-slate-800"
        }`}
      >
        {value}
      </span>

    </div>
  );
}