"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";

export const useClearCart = () => {
    const queryClient = useQueryClient();
    const { t } = useLanguage();

    return useMutation({
        mutationFn: clearCart,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            toast.success(t.cart.toast.cleared);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                t.cart.toast.clearFailed
            );
        },
    });
};