"use client";

import OrdersList from "@/components/profile/OrdersList";

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <OrdersList />
      </div>
    </main>
  );
}