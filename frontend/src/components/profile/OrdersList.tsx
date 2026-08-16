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

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

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

export default function OrdersList() {
  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status === "Confirmed" ||
      order.status === "Shipped" ||
      order.status === "Pending"
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
              value={String(totalOrders)}
            />

            <HeroStat
              label="Active"
              value={String(activeOrders)}
            />

            <HeroStat
              label="Delivered"
              value={String(deliveredOrders)}
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
          value={String(totalOrders)}
        />

        <StatCard
          icon={<Truck className="h-5 w-5" />}
          title="In Transit"
          value="1"
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          title="Successfully Delivered"
          value={String(deliveredOrders)}
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
          {totalOrders} Orders
        </span>

      </div>

      {/* ================= ORDERS ================= */}

      <div className="space-y-6">

        {orders.map((order) => {

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
                        {order.id}
                      </h3>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />

                        {order.status}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      Ordered on {order.date}

                      <span className="mx-1 text-slate-300">
                        •
                      </span>

                      {order.items}{" "}
                      {order.items === 1 ? "item" : "items"}
                    </p>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Order Total
                    </p>

                    <p className="mt-1 text-2xl font-black text-emerald-700">
                      {order.total}
                    </p>

                  </div>

                </div>

              </div>

              {/* ================= PRODUCTS ================= */}

              <div className="p-5 sm:p-6">

                <div className="space-y-3">

                  {order.products.map((product) => (

                    <div
                      key={product.name}
                      className="group/product flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-3 transition-all duration-200 hover:border-emerald-100 hover:bg-emerald-50/30"
                    >

                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 ring-1 ring-emerald-100">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />

                        <Package className="h-7 w-7 text-emerald-600" />

                      </div>

                      <div className="min-w-0 flex-1">

                        <h4 className="truncate text-sm font-bold text-slate-800">
                          {product.name}
                        </h4>

                        <p className="mt-1 text-xs text-slate-400">
                          Quantity: {product.quantity}
                        </p>

                      </div>

                      <p className="text-sm font-black text-slate-800">
                        {product.price}
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
                        {order.address}
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
                        {order.payment}
                      </p>

                    </div>

                  </div>

                </div>

                {/* ================= ACTIONS ================= */}

                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                  {/* View Details */}

                  <Link
                    href={`/orders/${order.id.replace("#", "")}`}
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

                  {order.status === "Shipped" && (
                    <Link
                      href={`/orders/${order.id.replace("#", "")}/track`}
                      className="w-full sm:w-auto"
                    >
                      <Button className="h-11 w-full rounded-xl bg-emerald-700 px-6 font-bold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto">
                        <Truck className="mr-2 h-4 w-4" />
                        Track Order
                      </Button>
                    </Link>
                  )}

                  {/* Buy Again */}

                  {order.status === "Delivered" && (
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