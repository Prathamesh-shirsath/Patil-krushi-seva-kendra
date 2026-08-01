export interface CreateCartItemInput {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}

export interface CartSummary {
  totalItems: number;
  subTotal: number;
  deliveryCharge: number;
  discount: number;
  grandTotal: number;
}