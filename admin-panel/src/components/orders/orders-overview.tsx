"use client";

import {
  ShoppingCart,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

import type { Order } from "@/hooks/use-orders";

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function Card({
  title,
  value,
  icon,
  color,
}: CardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

interface Props {
  orders: Order[];
}

export default function OrdersOverview({
  orders,
}: Props) {
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "PENDING"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status === "DELIVERED"
  ).length;

  const revenue = orders
    .filter(
      (order) =>
        order.status !== "CANCELLED"
    )
    .reduce(
      (total, order) =>
        total + Number(order.grandTotal),
      0
    );

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Total Orders"
        value={totalOrders.toLocaleString(
          "en-IN"
        )}
        color="bg-green-100"
        icon={
          <ShoppingCart
            className="text-green-700"
            size={28}
          />
        }
      />

      <Card
        title="Pending Orders"
        value={pendingOrders.toLocaleString(
          "en-IN"
        )}
        color="bg-yellow-100"
        icon={
          <Clock3
            className="text-yellow-700"
            size={28}
          />
        }
      />

      <Card
        title="Delivered"
        value={deliveredOrders.toLocaleString(
          "en-IN"
        )}
        color="bg-blue-100"
        icon={
          <CheckCircle2
            className="text-blue-700"
            size={28}
          />
        }
      />

      <Card
        title="Revenue"
        value={`₹${revenue.toLocaleString(
          "en-IN"
        )}`}
        color="bg-emerald-100"
        icon={
          <IndianRupee
            className="text-emerald-700"
            size={28}
          />
        }
      />

    </div>
  );
}