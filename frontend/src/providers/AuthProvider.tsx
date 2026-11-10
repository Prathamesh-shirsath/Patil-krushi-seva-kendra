"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export interface AuthUser {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    image: string | null;
    role: "ADMIN" | "CUSTOMER";
}

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    refreshUser: () => Promise<AuthUser | null>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async (): Promise<AuthUser | null> => {
        try {
            const res = await api.get("/auth/me");

            console.log("AUTH USER:", res.data);

            if (res.data.success) {
                const authenticatedUser =
                    res.data.user as AuthUser;
                setUser(authenticatedUser);
                return authenticatedUser;
            } else {
                setUser(null);
                return null;
            }
        } catch (err) {
            console.log("AUTH ERROR", err);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    };











    
    const logout = async () => {
        try {
            await signOut(auth);
            await api.post("/auth/logout");
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};

