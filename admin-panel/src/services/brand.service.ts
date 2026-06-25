import { api } from "@/lib/axios";

export async function getBrands() {
    const response =
        await api.get("/brands");

    return response.data.data;
}

export async function createBrand(
    data: FormData
) {
    const response =
        await api.post(
            "/brands",
            data,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    return response.data;
}

export async function updateBrand(
    id: string,
    data: FormData
) {
    const response =
        await api.put(
            `/brands/${id}`,
            data,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    return response.data;
}

export async function deleteBrand(
    id: string
) {
    const response =
        await api.delete(
            `/brands/${id}`
        );

    return response.data;
}