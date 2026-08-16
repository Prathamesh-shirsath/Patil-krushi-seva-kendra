export interface ProductVariant {
    id?: string;
    packSize: string;
    price: number;
}

export interface Product {
    id: string;

    name: string;
    slug: string;
    description: string;

    image?: string | null;

    categoryId: string;
    categoryName?: string;

    brandId: string;
    brandName?: string;

    packSize: string;

    price: number;

    stock: number;

    usedForCrops: string[];

    status: boolean;

    variants: ProductVariant[];

    createdAt: string;
    updatedAt: string;
}

export interface CreateProductDto {
    name: string;

    description: string;

    categoryId: string;

    brandId: string;

    packSize: string;

    price: number;

    stock: number;

    image?: File | null;

    usedForCrops: string[];

    status: boolean;

    variants: ProductVariant[];
}

export interface UpdateProductDto
    extends Partial<CreateProductDto> { }