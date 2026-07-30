"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/services/cart.service";
import { toast } from "sonner";

export const useClearCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            toast.success("Cart cleared.");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Unable to clear cart."
            );
        },
    });
};