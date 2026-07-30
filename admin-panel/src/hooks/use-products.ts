import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "@/services/product.service";

export function useProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    brandId?: string;
    categoryId?: string;
}) {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
    });
}

export function useProduct(slug: string) {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProduct(slug),
        enabled: !!slug,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: FormData;
        }) => updateProduct(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}