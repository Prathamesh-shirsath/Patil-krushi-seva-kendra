"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
import { resumePendingCartAction } from "@/lib/pending-cart-action";
import { useLanguage } from "@/i18n/useLanguage";
import { toast } from "sonner";

export function useEmailAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const { t } = useLanguage();
    const { refreshUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const finishAuthentication = async (successMessage: string) => {
        const authenticatedUser = await refreshUser();

        if (!authenticatedUser) {
            setError("Sign in succeeded, but your session could not be verified. Please try again.");
            return;
        }

        let cartActionResumed = false;

        try {
            cartActionResumed = await resumePendingCartAction();
        } catch (resumeError) {
            console.error("Unable to resume pending cart action:", resumeError);
            setError("You are signed in, but the selected item could not be added. Please try again.");
            return;
        }

        if (cartActionResumed) {
            try {
                await Promise.all([
                    queryClient.invalidateQueries({ queryKey: ["cart"] }),
                    queryClient.invalidateQueries({ queryKey: ["cart-count"] }),
                ]);
            } catch (cacheError) {
                console.error("Unable to refresh cart after sign in:", cacheError);
            }

            toast.success(t.common.toast.addedToCart);
        }

        setSuccess(successMessage);
        router.refresh();
        router.replace(
            cartActionResumed
                ? "/cart"
                : searchParams?.get("redirect") || "/"
        );
    };

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

            await api.post(
                "/auth/phone-login",
                {
                    phone: normalizedPhone,
                    password,
                }
            );

            await finishAuthentication("Login successful.");
        } catch (err: unknown) {
            console.error("Mobile Login Error:", err);

            setError(
                isAxiosError<{ message?: string }>(err)
                    ? err.response?.data?.message ||
                        "Invalid mobile number or password."
                    : "Sign in could not be completed. Please try again."
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

            await api.post(
                "/auth/register",
                {
                    name: name.trim(),
                    phone: normalizedPhone,
                    password,
                }
            );

            await finishAuthentication("Registration successful.");
        } catch (err: unknown) {
            console.error("Registration Error:", err);

            setError(
                isAxiosError<{ message?: string }>(err)
                    ? err.response?.data?.message || "Registration failed."
                    : "Registration could not be completed. Please try again."
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