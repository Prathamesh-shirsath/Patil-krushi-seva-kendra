export interface ProductVariant {
    packSize: string;
    price: number;
}

export interface Product {
    id: string;

    name: string;

    categoryId: string;

    brandId: string;

    description: string;

    usedForCrops?: string[];

    packSize: string;

    price: number;

    variants?: ProductVariant[];

    image?: string;

    status: boolean;

    createdAt?: string;
}