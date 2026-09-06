import api from "@/lib/axios";
import type {
  Order,
  OrderApiResponse,
  PaymentMethod,
} from "@/types/order";

export type {
  Order,
  OrderAddress,
  OrderApiResponse,
  OrderCustomer,
  OrderItem,
  OrderProduct,
  OrderStatus,
  Payment,
  PaymentMethod,
  PaymentStatus,
} from "@/types/order";

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
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface CreateOrderResponse {
  success: boolean;
  data: {
    order: Order;
    razorpayOrder?: RazorpayOrderData;
    keyId?: string;
    isCod?: true;
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
): Promise<OrderApiResponse> => {
  const response = await api.post("/orders/verify-payment", payload);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
};

export const getUserOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders/user/my-orders");
  return response.data.data;
};
