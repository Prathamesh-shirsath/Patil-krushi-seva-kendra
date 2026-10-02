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

    // =====================================================
    // MOBILE + PASSWORD LOGIN
    // =====================================================

    const login = async (
        phone: string,
        password: string
    ) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const normalizedPhone =
                phone.trim().replace(/\s+/g, "");

            const response = await api.post(
                "/auth/phone-login",
                {
                    phone: normalizedPhone,
                    password,
                }
            );

            console.log(
                "Mobile Login Response:",
                response.data
            );

            await refreshUser();

            setSuccess("Login successful.");

            router.refresh();

            const targetRedirect =
                searchParams?.get("redirect") || "/";

            router.replace(targetRedirect);
        } catch (err: any) {
            console.error(
                "Mobile Login Error:",
                {
                    status:
                        err?.response?.status,
                    data:
                        err?.response?.data,
                    message:
                        err?.message,
                }
            );

            setError(
                err?.response?.data?.message ||
                    "Invalid mobile number or password."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // MOBILE + PASSWORD REGISTER
    // =====================================================

    const register = async (
        name: string,
        phone: string,
        password: string
    ) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const normalizedPhone =
                phone.trim().replace(/\s+/g, "");

            const response = await api.post(
                "/auth/register",
                {
                    name: name.trim(),
                    phone: normalizedPhone,
                    password,
                }
            );

            console.log(
                "Registration Response:",
                response.data
            );

            await refreshUser();

            setSuccess(
                "Registration successful."
            );

            router.refresh();

            const targetRedirect =
                searchParams?.get("redirect") || "/";

            router.replace(targetRedirect);
        } catch (err: any) {
            console.error(
                "Registration Error:",
                {
                    status:
                        err?.response?.status,
                    data:
                        err?.response?.data,
                    message:
                        err?.message,
                }
            );

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