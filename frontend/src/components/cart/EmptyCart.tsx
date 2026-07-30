"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart className="mb-4 h-20 w-20 text-gray-300" />

            <h2 className="text-2xl font-bold">
                Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
                Looks like you haven't added any products yet.
            </p>

            <Link href="/shop">
                <Button className="mt-6">
                    Continue Shopping
                </Button>
            </Link>
        </div>
    );
}