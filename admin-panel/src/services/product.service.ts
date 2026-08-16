import { api } from "@/lib/axios";
import type {
    Product,
    ProductVariant,
} from "@/types/product";

/*
|--------------------------------------------------------------------------
| Normalize Product
|--------------------------------------------------------------------------
|
| Backend may return:
|
| categoryId / brandId
|
| OR only:
|
| category: { id, name }
| brand: { id, name }
|
| This function supports both.
|
*/

function normalizeProduct(raw: any): Product {
    const categoryId =
        raw?.categoryId ??
        raw?.category?.id ??
        "";

    const brandId =
        raw?.brandId ??
        raw?.brand?.id ??
        "";

    const stock =
        raw?.stock !== undefined &&
            raw?.stock !== null
            ? Number(raw.stock)
            : 0;

    const price =
        raw?.price !== undefined &&
            raw?.price !== null
            ? Number(raw.price)
            : 0;

    const variants: ProductVariant[] =
        Array.isArray(raw?.variants)
            ? raw.variants.map(
                (variant: any) => ({
                    id:
                        variant?.id,

                    packSize:
                        variant?.packSize ??
                        "",

                    price:
                        Number(
                            variant?.price ??
                            0
                        ),
                })
            )
            : [];

    return {
        ...raw,

        id:
            raw?.id ?? "",

        name:
            raw?.name ?? "",

        slug:
            raw?.slug ?? "",

        description:
            raw?.description ?? "",

        image:
            raw?.image ?? null,

        /*
        |--------------------------------------------------------------------------
        | IMPORTANT
        |--------------------------------------------------------------------------
        */

        categoryId,

        categoryName:
            raw?.categoryName ??
            raw?.category?.name ??
            "",

        brandId,

        brandName:
            raw?.brandName ??
            raw?.brand?.name ??
            "",

        packSize:
            raw?.packSize ?? "",

        price,

        stock,

        usedForCrops:
            Array.isArray(
                raw?.usedForCrops
            )
                ? raw.usedForCrops
                : [],

        status:
            raw?.status !== undefined
                ? Boolean(raw.status)
                : true,

        variants,

        createdAt:
            raw?.createdAt ?? "",

        updatedAt:
            raw?.updatedAt ?? "",
    };
}

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/

export async function getProducts(
    params?: {
        page?: number;
        limit?: number;
        search?: string;
        brandId?: string;
        categoryId?: string;
        includeInactive?: boolean;
    }
) {
    const response =
        await api.get(
            "/products",
            {
                params,
            }
        );

    console.log(
        "GET PRODUCTS RESPONSE:",
        response.data
    );

    return {
        ...response.data,

        data:
            Array.isArray(
                response.data?.data
            )
                ? response.data.data.map(
                    normalizeProduct
                )
                : [],
    };
}

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
*/

export async function getProduct(
    idOrSlug: string
): Promise<Product> {

    const response =
        await api.get(
            `/products/${encodeURIComponent(
                idOrSlug
            )}`
        );

    console.log(
        "GET SINGLE PRODUCT RAW:",
        response.data
    );

    const normalized =
        normalizeProduct(
            response.data?.data
        );

    console.log(
        "GET SINGLE PRODUCT NORMALIZED:",
        normalized
    );

    return normalized;
}

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

export async function createProduct(
    data: FormData
) {
    const response =
        await api.post(
            "/products",
            data
        );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/

export async function updateProduct(
    id: string,
    data: FormData
) {
    const response =
        await api.put(
            `/products/${encodeURIComponent(
                id
            )}`,
            data
        );

    console.log(
        "UPDATE PRODUCT RESPONSE:",
        response.data
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/

export async function deleteProduct(
    id: string
) {
    const response =
        await api.delete(
            `/products/${encodeURIComponent(
                id
            )}`
        );

    return response.data;
}