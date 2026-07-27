"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface User {
    id: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    image: string | null;
    role: "ADMIN" | "CUSTOMER";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const res = await api.get("/auth/me");

            console.log("AUTH USER:", res.data);

            if (res.data.success) {
                setUser(res.data.user);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.log("AUTH ERROR", err);
            setUser(null);
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


