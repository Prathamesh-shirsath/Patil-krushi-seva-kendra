import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addToWishlist } from "@/services/wishlist.service";

export const useAddWishlist = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToWishlist,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["wishlist"],
            });

            toast.success("Added to wishlist");
        },

        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ??
                "Failed to add to wishlist"
            );
        },
    });
};