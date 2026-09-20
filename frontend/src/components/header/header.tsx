"use client";

import { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getWishlist } from "@/services/wishlist.service";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  useEffect(() => {
    const handleWishlistUpdate = () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    };

    window.addEventListener(
      "wishlist-updated",
      handleWishlistUpdate
    );

    return () => {
      window.removeEventListener(
        "wishlist-updated",
        handleWishlistUpdate
      );
    };
  }, [queryClient]);

  return query;
};