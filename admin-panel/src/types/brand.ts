export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
    status: boolean;

    createdAt: string;

    _count?: {
        products: number;
    };
}