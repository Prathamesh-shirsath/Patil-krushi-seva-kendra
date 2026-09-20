"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

export default function EmptyCart() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart className="mb-4 h-20 w-20 text-gray-300" />

            <h2 className="text-2xl font-bold">
                {t.cart.empty.title}
            </h2>

            <p className="mt-2 text-gray-500">
                {t.cart.empty.message}
            </p>

            <Link href="/shop">
                <Button className="mt-6">
                    {t.common.continueShopping}
                </Button>
            </Link>
        </div>
    );
}