import { api } from "@/lib/axios";

export async function getBrands() {
    const response = await api.get("/brands");

    return response.data.data;
}

export async function createBrand(data: any) {
    const response = await api.post("/brands", data);

    return response.data;
}