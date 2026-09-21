const API_URL =
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:5000/api";

export async function getBrands() {
    const response = await fetch(
        `${API_URL}/api/brands`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch brands (${response.status})`
        );
    }

    const data = await response.json();

    return data.data;
}