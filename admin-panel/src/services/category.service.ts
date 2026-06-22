import { api } from "@/lib/axios";

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export async function getCategories() {
    const response = await api.get("/categories");
    return response.data.data as Category[];
}
