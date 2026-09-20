import api from "@/lib/axios";

export const checkDeliveryPincode = async (
    pincode: string
): Promise<boolean> => {
    const response = await api.get(
        `/delivery-pincodes/check/${pincode}`
    );

    return Boolean(
        response.data?.data?.available
    );
};