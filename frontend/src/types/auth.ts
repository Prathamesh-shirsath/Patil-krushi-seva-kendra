// src/types/auth.ts

export type UserRole = "ADMIN" | "CUSTOMER";

export interface User {
    id: string;

    // Firebase
    firebaseUid: string | null;
    phone: string | null;

    // Profile
    name: string | null;
    email: string | null;
    emailVerified: boolean;
    image: string | null;

    // Role
    role: UserRole;

    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;

    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;

    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}