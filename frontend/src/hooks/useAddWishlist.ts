import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToWishlist } from "@/services/wishlist.service";
import { useLanguage } from "@/i18n/useLanguage";

export const useAddWishlist = () => {
    const { t } = useLanguage();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWishlist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });

            toast.success(t.wishlist.toast.added);
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                t.wishlist.toast.addFailed
            );
        },
    });
};