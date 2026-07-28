import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { removeFromWishlist } from "@/services/wishlist.service";

export const useRemoveWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromWishlist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });

            toast.success("Removed from wishlist");
        },

        onError: () => {
            toast.error("Failed to remove from wishlist");
        },
    });
};