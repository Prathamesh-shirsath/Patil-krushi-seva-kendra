"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem } from "@/services/cart.service";
import { toast } from "sonner";

export const useRemoveCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeCartItem,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });

            queryClient.invalidateQueries({
                queryKey: ["cart-count"],
            });

            toast.success("Item removed.");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Unable to remove item."
            );
        },
    });
};