import { api } from "@/lib/axios";

export interface Customer {
    id: string;

    name: string | null;

    phone: string | null;

    email: string | null;

    image: string | null;

    role: "CUSTOMER";

    createdAt: string;

    updatedAt: string;

    _count?: {
        orders: number;
        addresses: number;
        reviews: number;
        wishlists: number;
    };
}

export interface CustomerAddress {
    id: string;
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
    isDefault: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface CustomerOrderItem {
    id: string;
    quantity: number;
    price: number | string;
    productName: string;

    product?: {
        id: string;
        name: string;
        image?: string | null;
    } | null;
}

export interface CustomerOrder {
    id: string;
    status: string;
    paymentStatus: string;

    totalAmount: number | string;
    subTotal: number | string;
    deliveryCharge: number | string;
    discount: number | string;
    grandTotal: number | string;

    paymentMethod: string;

    createdAt: string;

    items: CustomerOrderItem[];

    OrderAddress?: CustomerAddress | null;

    payment?: {
        status: string;
        amount: number | string;
        transactionId?: string | null;
        razorpayOrderId?: string | null;
        razorpayPaymentId?: string | null;
    } | null;
}

export interface CustomerDetails
    extends Customer {
    addresses: CustomerAddress[];

    orders: CustomerOrder[];

    totalOrders: number;

    totalSpent: number;

    lastOrder:
    | CustomerOrder
    | null;
}

export interface CustomerListResponse {
    data: Customer[];

    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CustomerStats {
    totalCustomers: number;
    newCustomers: number;
    repeatCustomers: number;
    customersWithOrders: number;
    customersWithoutOrders: number;
}

/* ============================================================
   CUSTOMERS
============================================================ */

export async function getCustomers(
    params?: {
        page?: number;
        limit?: number;
        search?: string;
    }
): Promise<CustomerListResponse> {
    const response =
        await api.get(
            "/users/admin/customers",
            {
                params,
            }
        );

    return {
        data:
            response.data?.data ??
            [],

        pagination:
            response.data?.pagination ??
            {
                page:
                    params?.page ??
                    1,

                limit:
                    params?.limit ??
                    20,

                total: 0,

                totalPages: 1,
            },
    };
}

/* ============================================================
   CUSTOMER DETAILS
============================================================ */

export async function getCustomerDetails(
    id: string
): Promise<CustomerDetails> {
    const response =
        await api.get(
            `/users/admin/customers/${encodeURIComponent(
                id
            )}`
        );

    return response.data.data;
}

/* ============================================================
   CUSTOMER STATS
============================================================ */

export async function getCustomerStats(): Promise<CustomerStats> {
    const response =
        await api.get(
            "/users/admin/customers/stats"
        );

    return (
        response.data?.data ?? {
            totalCustomers: 0,
            newCustomers: 0,
            repeatCustomers: 0,
            customersWithOrders: 0,
            customersWithoutOrders: 0,
        }
    );
}