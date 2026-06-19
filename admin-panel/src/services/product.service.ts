import { api } from "@/lib/axios";

export async function getProducts() {
    const response = await api.get("/products");

    return response.data.data;
}

export async function createProduct(data: any) {
    const response = await api.post("/products", data);

    return response.data;
}