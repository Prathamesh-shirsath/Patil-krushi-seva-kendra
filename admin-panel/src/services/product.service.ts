import { api } from "@/lib/axios";

export async function getProducts() {
    const response = await api.get("/products");

    return response.data.data;
}

export async function createProduct(formData: FormData) {
    const response = await api.post(
        "/products",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}