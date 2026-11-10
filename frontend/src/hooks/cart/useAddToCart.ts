"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/useLanguage";
import { useAuth } from "@/providers/AuthProvider";
import { savePendingCartAction } from "@/lib/pending-cart-action";

type AddToCartInput = {
  productId: string;
  quantity: number;
  variantId?: string;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useLanguage();
  const { user, loading: authLoading, refreshUser } = useAuth();

  const mutation = useMutation({
    mutationFn: (data: AddToCartInput) =>
      addToCart(
        data.productId,
        data.quantity,
        data.variantId
      ),

    onSuccess: () => {
      window.dispatchEvent(new Event("cart-updated"));

      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart-count"],
      });

      toast.success(t.common.toast.addedToCart);
    },

    onError: (error: unknown, variables) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        try {
          savePendingCartAction(variables);
          toast.info(t.common.toast.loginRequiredForCart);
          router.push("/login?continueShopping=1&redirect=%2Fcart");
        } catch (storageError) {
          console.error(
            "Unable to preserve cart action before sign-in:",
            storageError
          );
          toast.error(t.common.toast.addToCartFailed);
        }

        return;
      }

      toast.error(
        isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message ??
              t.common.toast.addToCartFailed
          : t.common.toast.addToCartFailed
      );
    },
  });

  const add = async (data: AddToCartInput) => {
    const activeUser = authLoading ? await refreshUser() : user;

    if (!activeUser) {
      try {
        savePendingCartAction(data);
        toast.info(t.common.toast.loginRequiredForCart);
        router.push("/login?continueShopping=1&redirect=%2Fcart");
      } catch (error) {
        console.error(
          "Unable to preserve cart action before sign-in:",
          error
        );
        toast.error(t.common.toast.addToCartFailed);
      }

      return;
    }

    mutation.mutate(data);
  };

  return {
    ...mutation,
    add,
  };
};