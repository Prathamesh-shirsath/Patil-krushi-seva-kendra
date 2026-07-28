import api from "@/lib/axios";

export const getWishlist = async () => {
    const { data } = await api.get("/wishlist");
    return data.data;
};

export const addToWishlist = async (productId: string) => {
    const { data } = await api.post(`/wishlist/${productId}`);
    return data;
};

export const removeFromWishlist = async (productId: string) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
};