"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem } from "@/services/cart.service";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";

export const useRemoveCart = () => {
    const queryClient = useQueryClient();
    const { t } = useLanguage();

    return useMutation({
        mutationFn: removeCartItem,

        onSuccess: async () => {
            // Cart data refresh
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            // Cart count refresh
            await queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            // 🔥 Header badge instantly update
            window.dispatchEvent(new Event("cart-updated"));

            toast.success(t.cart.toast.removed);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                t.cart.toast.removeFailed
            );
        },
    });
};