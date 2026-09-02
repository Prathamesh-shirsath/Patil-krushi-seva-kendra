"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "@/services/cart.service";
import { toast } from "sonner";

export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            itemId,
            quantity,
        }: {
            itemId: string;
            quantity: number;
        }) => updateCartItem(itemId, quantity),

        onSuccess: async () => {
            // Cart page ka data instantly refresh
            await queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            // Cart count query bhi refresh
            await queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            // 🔥 Header badge ko instantly update karo
            window.dispatchEvent(new Event("cart-updated"));
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Unable to update cart."
            );
        },
    });
};