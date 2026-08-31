import { api } from "@/lib/axios";

export interface Category {
    id: string;

    name: string;

    slug: string;

    image?: string | null;

    status: boolean;

    productsCount?: number | string;

    brandsCount?: number | string;

    description?: string | null;

    products?: any[];

    _count?: {
        products?: number;
        brands?: number;
    };

    createdAt?: string;

    updatedAt?: string;
}

/*
|--------------------------------------------------------------------------
| GET CATEGORIES
|--------------------------------------------------------------------------
*/

export async function getCategories(): Promise<Category[]> {
    const response = await api.get("/categories");

    return Array.isArray(
        response.data?.data
    )
        ? response.data.data
        : [];
}

/*
|--------------------------------------------------------------------------
| CREATE CATEGORY
|--------------------------------------------------------------------------
*/

export async function createCategory(
    formData: FormData
) {
    const response = await api.post(
        "/categories",
        formData
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| UPDATE CATEGORY
|--------------------------------------------------------------------------
*/

export async function updateCategory({
    id,
    formData,
}: {
    id: string;
    formData: FormData;
}) {
    if (!id) {
        throw new Error(
            "Category ID is required."
        );
    }

    const response = await api.put(
        `/categories/${encodeURIComponent(id)}`,
        formData
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| DELETE CATEGORY
|--------------------------------------------------------------------------
*/

export async function deleteCategory(
    id: string
) {
    if (!id) {
        throw new Error(
            "Category ID is required."
        );
    }

    const response = await api.delete(
        `/categories/${encodeURIComponent(id)}`
    );

    return response.data;
}