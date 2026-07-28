import api from "@/lib/axios";
import { Address, AddressPayload } from "@/types/address";

const extractAddresses = (response: any): Address[] => {
    // API returns array directly
    if (Array.isArray(response)) return response;

    // { data: [...] }
    if (Array.isArray(response?.data)) return response.data;

    // { addresses: [...] }
    if (Array.isArray(response?.addresses)) return response.addresses;

    // { data: { addresses: [...] } }
    if (Array.isArray(response?.data?.addresses)) {
        return response.data.addresses;
    }

    return [];
};

export const getAddresses = async (): Promise<Address[]> => {
    const response = await api.get("/addresses");
    return extractAddresses(response.data);
};

export const createAddress = async (
    payload: AddressPayload
): Promise<Address> => {
    const { data } = await api.post("/addresses", payload);

    return data.data ?? data.address ?? data;
};

export const updateAddress = async (
    id: string,
    payload: AddressPayload
): Promise<Address> => {
    const { data } = await api.put(`/addresses/${id}`, payload);

    return data.data ?? data.address ?? data;
};

export const deleteAddress = async (id: string): Promise<void> => {
    await api.delete(`/addresses/${id}`);
};

export const setDefaultAddress = async (
    id: string
): Promise<Address> => {
    const { data } = await api.patch(`/addresses/${id}/default`);

    return data.data ?? data.address ?? data;
};