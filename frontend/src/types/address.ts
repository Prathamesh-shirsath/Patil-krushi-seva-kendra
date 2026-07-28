export interface Address {
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
    updatedAt: string;
}

export interface AddressPayload {
    fullName: string;
    phone: string;

    state: string;
    district: string;
    taluka?: string;
    village: string;
    city?: string;

    pincode: string;

    addressLine: string;
    landmark?: string;

    isDefault?: boolean;
}