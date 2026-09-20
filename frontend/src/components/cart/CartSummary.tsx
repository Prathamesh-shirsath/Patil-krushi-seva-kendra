"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CartSummary as CartSummaryType } from "@/types/cart";
import { useClearCart } from "@/hooks/cart/useClearCart";
import { useLanguage } from "@/i18n/useLanguage";

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
    const { t } = useLanguage();

    const s = summary ?? defaultSummary;

    return (
        <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold">
                {t.cart.summary.title}
            </h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>{t.cart.summary.totalItems}</span>
                    <span>{s.totalItems}</span>
                </div>

                <div className="flex justify-between">
                    <span>{t.cart.summary.subtotal}</span>
                    <span>₹{s.subTotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                    <span>{t.cart.summary.deliveryCharge}</span>

                    {s.deliveryCharge === 0 ? (
                        <span className="font-medium text-green-600">
                            {t.cart.summary.free}
                        </span>
                    ) : (
                        <span>
                            ₹{s.deliveryCharge.toLocaleString("en-IN")}
                        </span>
                    )}
                </div>

                <div className="flex justify-between">
                    <span>{t.cart.summary.discount}</span>

                    <span className="text-green-600">
                        - ₹{s.discount.toLocaleString("en-IN")}
                    </span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                    <span>{t.cart.summary.grandTotal}</span>

                    <span>
                        ₹{s.grandTotal.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            <Button asChild className="mt-6 w-full">
                <Link href="/checkout">
                    {t.cart.summary.checkout}
                </Link>
            </Button>

            <Button
                variant="outline"
                className="mt-3 w-full"
                disabled={clearCart.isPending}
                onClick={() => clearCart.mutate()}
            >
                {t.cart.summary.clear}
            </Button>
        </div>
    );
}