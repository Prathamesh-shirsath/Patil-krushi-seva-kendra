import api from "@/lib/axios";

export type PaymentMethod = "RAZORPAY" | "COD";

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderAddressInput {
  fullName: string;
  phone: string;
  state: string;
  district: string;
  taluka?: string | null;
  village: string;
  city?: string | null;
  pincode: string;
  addressLine: string;
  landmark?: string | null;
}

export interface CreateOrderPayload {
  items: CreateOrderItemInput[];
  addressId?: string;
  address?: CreateOrderAddressInput;
  paymentMethod: PaymentMethod;
}

export interface RazorpayOrderData {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    order: {
      id: string;
      grandTotal: number | string;
      subTotal: number | string;
      deliveryCharge: number | string;
      discount: number | string;
      status: string;
      paymentStatus: string;
      paymentMethod: string;
      OrderAddress?: CreateOrderAddressInput;
      items?: any[];
    };
    razorpayOrder?: RazorpayOrderData;
    keyId?: string;
    isCod?: boolean;
  };
}

export interface VerifyPaymentPayload {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const response = await api.post("/orders", payload);
  return response.data;
};

export const verifyPayment = async (
  payload: VerifyPaymentPayload
): Promise<{ success: boolean; data: any }> => {
  const response = await api.post("/orders/verify-payment", payload);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<any> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
};

export const getUserOrders = async (): Promise<any[]> => {
  const response = await api.get("/orders/user/my-orders");
  return response.data.data;
};
