"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const trackingSteps = [
  {
    title: "Order Placed",
    description: "Your order has been successfully placed.",
    date: "16 Aug 2026 • 10:24 AM",
    icon: ShoppingBag,
    completed: true,
  },
  {
    title: "Order Confirmed",
    description: "The seller has confirmed your order.",
    date: "16 Aug 2026 • 11:10 AM",
    icon: CheckCircle2,
    completed: true,
  },
  {
    title: "Packed",
    description: "Your products have been packed and are ready to ship.",
    date: "16 Aug 2026 • 04:30 PM",
    icon: Package,
    completed: true,
  },
  {
    title: "Shipped",
    description: "Your order is on the way.",
    date: "17 Aug 2026 • 09:15 AM",
    icon: Truck,
    completed: true,
  },
  {
    title: "Out for Delivery",
    description: "Your package will reach you soon.",
    date: "Expected today",
    icon: MapPin,
    completed: false,
  },
  {
    title: "Delivered",
    description: "Your order will be delivered to your address.",
    date: "Expected today",
    icon: CheckCircle2,
    completed: false,
  },
];

export default function TrackOrderPage() {
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
              Live Order Tracking
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Track Your Order
                </h1>

                <p className="mt-2 text-sm text-emerald-50/70">
                  Order #PKS-10231
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-5 py-3 backdrop-blur">
                <p className="text-xs font-medium text-emerald-100/60">
                  Estimated Delivery
                </p>

                <p className="mt-1 font-black text-white">
                  18 Aug 2026
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
                Shipment Progress
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950">
                Order Journey
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

                      {step.title === "Shipped" && (
                        <span className="mt-3 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                          Package is in transit
                        </span>
                      )}

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
                  <Truck className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Current Status
                  </p>

                  <h3 className="mt-1 text-xl font-black text-emerald-950">
                    Shipped
                  </h3>
                </div>

              </div>

              <div className="mt-5 rounded-2xl bg-white/80 p-4">

                <p className="text-sm leading-6 text-slate-500">
                  Your order has left the seller and is currently
                  on its way to your delivery location.
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
                    Customer
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Sambhaji Nagar, Maharashtra
                  </p>
                </div>

              </div>

            </Card>

            {/* Tracking Info */}
            <Card className="rounded-[30px] border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_-18px_rgba(15,23,42,0.2)]">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Shipment Details
              </p>

              <div className="mt-5 space-y-4">

                <InfoRow
                  label="Order ID"
                  value="#PKS-10231"
                />

                <InfoRow
                  label="Courier"
                  value="Patil Express"
                />

                <InfoRow
                  label="Tracking ID"
                  value="PKS983721"
                />

                <InfoRow
                  label="Payment"
                  value="Cash on Delivery"
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