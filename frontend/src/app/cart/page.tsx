"use client";

import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import CartSkeleton from "@/components/cart/CartSkeleton";
import EmptyCart from "@/components/cart/EmptyCart";

import { useCart } from "@/hooks/cart/useCart";

export default function CartPage() {
  const { data, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <CartSkeleton />
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList items={data.items} />
        </div>

        <CartSummary summary={data.summary} />
      </div>
    </div>
  );
}