import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeFromWishlist } from "@/services/wishlist.service";
import { useLanguage } from "@/i18n/useLanguage";

export const useRemoveWishlist = () => {
    const { t } = useLanguage();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });

            toast.success(t.wishlist.toast.removed);
        },

        onError: () => {
            toast.error(t.wishlist.toast.removeFailed);
        },
    });
};