import { api } from "@/lib/axios";

export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    status: boolean;
    productsCount?: string;
    brandsCount?: string;
    description?: string;
    products?: any[];
    _count?: {
        products: number;
    };
    createdAt?: string;
    updatedAt?: string;
}

export async function getCategories() {
    const response = await api.get("/categories");
    return (response.data?.data || []) as Category[];
}

export async function createCategory(formData: FormData) {
    const response = await api.post("/categories", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function updateCategory({ id, formData }: { id: string; formData: FormData }) {
    const response = await api.put(`/categories/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function deleteCategory(id: string) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}
