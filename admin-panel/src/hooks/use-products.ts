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

// =====================================================
// PRODUCTS LIST
// =====================================================

export function useProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    brandId?: string;
    categoryId?: string;
    includeInactive?: boolean;
}) {
    return useQuery({
        queryKey: [
            "products",
            params,
        ],

        queryFn: () =>
            getProducts(params),

        staleTime: 0,

        refetchOnMount: true,

        refetchOnWindowFocus: false,
    });
}

// =====================================================
// SINGLE PRODUCT
// ID OR SLUG
// =====================================================

export function useProduct(
    idOrSlug: string
) {
    return useQuery({
        queryKey: [
            "product",
            idOrSlug,
        ],

        queryFn: () =>
            getProduct(idOrSlug),

        enabled:
            Boolean(idOrSlug),

        staleTime: 0,

        refetchOnMount: true,

        refetchOnWindowFocus: false,

        retry: 1,
    });
}

// =====================================================
// CREATE
// =====================================================

export function useCreateProduct() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: createProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

// =====================================================
// UPDATE
// =====================================================

export function useUpdateProduct() {
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
            updateProduct(
                id,
                data
            ),

        onSuccess: (
            response,
            variables
        ) => {

            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "product",
                    variables.id,
                ],
            });
        },
    });
}

// =====================================================
// DELETE
// =====================================================

export function useDeleteProduct() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}