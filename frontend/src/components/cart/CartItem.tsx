"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import QuantitySelector from "./QuantitySelector";

import { CartItem as CartItemType } from "@/types/cart";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { useRemoveCart } from "@/hooks/cart/useRemoveCart";

interface Props {
    item: CartItemType;
}

export default function CartItem({ item }: Props) {
    const updateCart = useUpdateCart();
    const removeCart = useRemoveCart();

    const increase = () => {
        if (item.quantity >= item.product.stock) return;

        updateCart.mutate({
            itemId: item.id,
            quantity: item.quantity + 1,
        });
    };

    const decrease = () => {
        if (item.quantity <= 1) return;

        updateCart.mutate({
            itemId: item.id,
            quantity: item.quantity - 1,
        });
    };

    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm md:flex-row">
            {/* Product Image */}
            <div className="relative h-28 w-28 overflow-hidden rounded-lg border">
                <Image
                    src={item.product.image || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold">
                        {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {item.product.brand.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Pack Size: {item.product.packSize}
                    </p>

                    <p className="mt-2 text-lg font-bold text-green-700">
                        ₹{item.product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs text-gray-500">
                        Stock: {item.product.stock}
                    </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <QuantitySelector
                        quantity={item.quantity}
                        loading={updateCart.isPending}
                        onIncrease={increase}
                        onDecrease={decrease}
                    />

                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={removeCart.isPending}
                        onClick={() => removeCart.mutate(item.id)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}