"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    const { t } = useLanguage();

    return useMutation({
        mutationFn: ({
            productId,
            quantity,
        }: {
            productId: string;
            quantity: number;
        }) => addToCart(productId, quantity),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            toast.success(t.common.toast.addedToCart);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                t.common.toast.addToCartFailed
            );
        },
    });
};