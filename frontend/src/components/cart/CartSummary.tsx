"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CartSummary as CartSummaryType } from "@/types/cart";
import { useClearCart } from "@/hooks/cart/useClearCart";

interface Props {
    summary?: CartSummaryType;
}

const defaultSummary: CartSummaryType = {
    totalItems: 0,
    subTotal: 0,
    deliveryCharge: 0,
    discount: 0,
    grandTotal: 0,
};

export default function CartSummary({ summary }: Props) {
    const clearCart = useClearCart();

    const s = summary ?? defaultSummary;

    return (
        <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
                Order Summary
            </h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>{s.totalItems}</span>
                </div>

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{s.subTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                    <span>Delivery Charge</span>

                    {s.deliveryCharge === 0 ? (
                        <span className="font-medium text-green-600">
                            FREE
                        </span>
                    ) : (
                        <span>
                            ₹{s.deliveryCharge.toLocaleString("en-IN")}
                        </span>
                    )}
                </div>

                <div className="flex justify-between">
                    <span>Discount</span>

                    <span className="text-green-600">
                        - ₹{s.discount.toLocaleString("en-IN")}
                    </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total</span>

                    <span>
                        ₹{s.grandTotal.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            <Button asChild className="mt-6 w-full">
                <Link href="/checkout">
                    Proceed to Checkout
                </Link>
            </Button>

            <Button
                variant="outline"
                className="mt-3 w-full"
                disabled={clearCart.isPending}
                onClick={() => clearCart.mutate()}
            >
                Clear Cart
            </Button>
        </div>
    );
}