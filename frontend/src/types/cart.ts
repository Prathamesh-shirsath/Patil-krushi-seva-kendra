export interface CartProduct {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    price: number;
    packSize: string;
    stock: number;

    brand: {
        id: string;
        name: string;
    };
}

export interface CartItem {
    id: string;
    quantity: number;
    createdAt: string;

    product: CartProduct;
}

export interface CartSummary {
    totalItems: number;
    subTotal: number;
    deliveryCharge: number;
    discount: number;
    grandTotal: number;
}

export interface CartResponse {
    items: CartItem[];
    summary: CartSummary;
}