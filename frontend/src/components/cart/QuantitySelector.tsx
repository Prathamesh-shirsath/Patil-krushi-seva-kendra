"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

interface QuantitySelectorProps {
    quantity: number;
    loading?: boolean;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default function QuantitySelector({
    quantity,
    loading = false,
    onIncrease,
    onDecrease,
}: QuantitySelectorProps) {
    const { t } = useLanguage();

    return (
        <div className="flex items-center rounded-lg border">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={loading || quantity <= 1}
                onClick={onDecrease}
                aria-label={t.cart.aria.decreaseQuantity}
            >
                <Minus className="h-4 w-4" />
            </Button>

            <span className="w-10 text-center text-sm font-medium">
                {quantity}
            </span>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={loading}
                onClick={onIncrease}
                aria-label={t.cart.aria.increaseQuantity}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
