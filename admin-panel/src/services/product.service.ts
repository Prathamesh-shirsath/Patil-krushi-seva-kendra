import { api } from "@/lib/axios";


// Get Products
export async function getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    brandId?: string;
    categoryId?: string;
}) {
    const response = await api.get("/products", {
        params,
    });

    return response.data;
}

// Get Single Product
export async function getProduct(slug: string) {
    const response = await api.get(`/products/${slug}`);

    return response.data;
}

// Create Product
export async function createProduct(data: FormData) {
    const response = await api.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

// Update Product
export async function updateProduct(
    id: string,
    data: FormData
) {
    const response = await api.put(`/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

// Delete Product
export async function deleteProduct(id: string) {
    const response = await api.delete(`/products/${id}`);

    return response.data;
}