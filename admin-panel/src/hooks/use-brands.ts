import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getBrands,
    createBrand,
} from "@/services/brand.service";

export function useBrands() {
    return useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });
}

export function useCreateBrand() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBrand,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });
}