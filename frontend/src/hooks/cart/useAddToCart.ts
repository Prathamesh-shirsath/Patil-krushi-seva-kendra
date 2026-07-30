"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

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

            toast.success("Product added to cart.");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Unable to add product."
            );
        },
    });
};