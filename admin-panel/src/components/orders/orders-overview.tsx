"use client";

import {
  ShoppingCart,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
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

          <h2 className="mt-2 text-3xl font-bold">
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

export default function OrdersOverview() {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Total Orders"
        value="1,245"
        color="bg-green-100"
        icon={<ShoppingCart className="text-green-700" size={28} />}
      />

      <Card
        title="Pending Orders"
        value="36"
        color="bg-yellow-100"
        icon={<Clock3 className="text-yellow-700" size={28} />}
      />

      <Card
        title="Delivered"
        value="1,102"
        color="bg-blue-100"
        icon={<CheckCircle2 className="text-blue-700" size={28} />}
      />

      <Card
        title="Revenue"
        value="₹4.8L"
        color="bg-emerald-100"
        icon={<IndianRupee className="text-emerald-700" size={28} />}
      />

    </div>
  );
}