export interface ProductVariantInput {
    packSize: string;
    price: number;
}

export interface CreateProductInput {
    name: string;

    description: string;

    categoryId: string;

    brandId: string;

    packSize: string;

    price: number;

    stock: number;

    image?: string | null;

    usedForCrops: string[];

    status: boolean;

    variants?: ProductVariantInput[];
}

export interface UpdateProductInput
    extends Partial<CreateProductInput> { }