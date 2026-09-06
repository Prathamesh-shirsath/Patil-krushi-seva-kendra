export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED";

export type PaymentMethod = "RAZORPAY" | "COD";

export interface OrderCustomer {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
}

export interface OrderAddress {
  id: string;
  orderId: string;
  fullName: string;
  phone: string;
  state: string;
  district: string;
  taluka: string | null;
  village: string;
  city: string | null;
  pincode: string;
  addressLine: string;
  landmark: string | null;
}

export interface OrderProduct {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  price: string;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  brandId: string;
  packSize: string;
  status: boolean;
  usedForCrops: string[];
  stock: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  createdAt: string;
  productName: string;
  product: OrderProduct;
}

export interface Payment {
  id: string;
  orderId: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  razorpaySignature: string | null;
  status: PaymentStatus;
  amount: string;
  createdAt: string;
  updatedAt: string;
  failureReason: string | null;
  transactionId: string | null;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  deliveryCharge: string;
  discount: string;
  grandTotal: string;
  paymentMethod: PaymentMethod;
  subTotal: string;
  user: OrderCustomer;
  items: OrderItem[];
  OrderAddress: OrderAddress | null;
  payment: Payment | null;
}

export interface OrderApiResponse {
  success: true;
  message?: string;
  data: Order;
}
