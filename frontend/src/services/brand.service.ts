export async function getBrands() {
    const response = await fetch(
        "http://localhost:5000/api/brands",
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    return data.data;
}