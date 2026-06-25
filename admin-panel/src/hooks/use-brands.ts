import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
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

export function useUpdateBrand() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: FormData;
        }) =>
            updateBrand(
                id,
                data
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });
}

export function useDeleteBrand() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBrand,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["brands"],
            });
        },
    });
}


