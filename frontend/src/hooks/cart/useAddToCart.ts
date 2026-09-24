"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";

type AddToCartInput = {
  productId: string;
  quantity: number;
  variantId?: string;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: (data: AddToCartInput) =>
      addToCart(
        data.productId,
        data.quantity,
        data.variantId
      ),

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