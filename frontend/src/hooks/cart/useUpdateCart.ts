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

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Unable to update cart."
            );
        },
    });
};