import axios from "axios";
import { CartResponse } from "../types/cart";

const API = process.env.NEXT_PUBLIC_API_URL;

export const getCart = async (): Promise<CartResponse> => {
    const { data } = await axios.get(`${API}/cart`, {
        withCredentials: true,
    });

    return data.data;
};

export const getCartCount = async (): Promise<number> => {
    const { data } = await axios.get(`${API}/cart/count`, {
        withCredentials: true,
    });

    return data.data.count;
};

export const addToCart = async (
    productId: string,
    quantity = 1
) => {
    const { data } = await axios.post(
        `${API}/cart`,
        {
            productId,
            quantity,
        },
        {
            withCredentials: true,
        }
    );

    return data.data;
};

export const updateCartItem = async (
    itemId: string,
    quantity: number
) => {
    const { data } = await axios.patch(
        `${API}/cart/${itemId}`,
        {
            quantity,
        },
        {
            withCredentials: true,
        }
    );

    return data.data;
};

export const removeCartItem = async (
    itemId: string
) => {
    await axios.delete(`${API}/cart/${itemId}`, {
        withCredentials: true,
    });
};

export const clearCart = async () => {
    await axios.delete(`${API}/cart`, {
        withCredentials: true,
    });
};