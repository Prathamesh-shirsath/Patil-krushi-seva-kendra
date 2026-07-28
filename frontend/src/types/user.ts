export interface UserProfile {
    id: string;
    name: string | null;
    phone: string;
    email: string | null;
    image: string | null;
    role: "ADMIN" | "CUSTOMER";
}

export interface UpdateProfileDto {
    name: string;
    email?: string;
}