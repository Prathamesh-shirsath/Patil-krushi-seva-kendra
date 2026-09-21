
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";

export function useEmailAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await api.post("/auth/email-login", {
                email: email.trim().toLowerCase(),
                password,
            });

            await refreshUser();

            setSuccess("Login successful.");

            router.refresh();

            const targetRedirect =
                searchParams?.get("redirect") || "/";

            router.replace(targetRedirect);
        } catch (err: any) {
            console.error("Email Login Error:", {
                status: err?.response?.status,
                data: err?.response?.data,
                message: err?.message,
            });

            setError(
                err?.response?.data?.message ||
                    "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string
    ) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await api.post("/auth/register", {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            });

            await refreshUser();

            setSuccess("Registration successful.");

            router.refresh();

            const targetRedirect =
                searchParams?.get("redirect") || "/";

            router.replace(targetRedirect);
        } catch (err: any) {
            console.error("Registration Error:", {
                status: err?.response?.status,
                data: err?.response?.data,
                message: err?.message,
            });

            setError(
                err?.response?.data?.message ||
                    "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        login,
        register,
    };
}