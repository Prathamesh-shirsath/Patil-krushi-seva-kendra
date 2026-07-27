"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";

import {
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier?: RecaptchaVerifier;
    }
}

export function usePhoneAuth() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const [confirmationResult, setConfirmationResult] =
        useState<ConfirmationResult | null>(null);

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [timer, setTimer] = useState(30);

    const setupRecaptcha = async () => {
        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch { }

            window.recaptchaVerifier = undefined;
        }

        const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
        });

        await verifier.render();

        window.recaptchaVerifier = verifier;

        return verifier;
    };

    const validatePhone = () => {
        const number = phone.replace(/\D/g, "");

        if (number.length !== 10) {
            throw new Error("Enter valid mobile number.");
        }

        return `+91${number}`;
    };

    const getFirebaseError = (code?: string) => {
        switch (code) {
            case "auth/invalid-phone-number":
                return "Invalid mobile number.";

            case "auth/invalid-verification-code":
                return "Invalid OTP.";

            case "auth/code-expired":
                return "OTP has expired.";

            case "auth/too-many-requests":
                return "Too many attempts. Please try again later.";

            case "auth/invalid-verification-id":
                return "Invalid verification session.";

            default:
                return "Something went wrong. Please try again.";
        }
    };

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        setTimer(30);

        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);
    };

    const sendOTP = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const formattedPhone = validatePhone();

            const verifier = await setupRecaptcha();

            const result = await signInWithPhoneNumber(
                auth,
                formattedPhone,
                verifier
            );

            setConfirmationResult(result);

            setStep("OTP");

            startTimer();

            setSuccess("OTP sent successfully.");
        } catch (err: any) {
            console.error(err);

            setError(getFirebaseError(err.code));

            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch { }

                window.recaptchaVerifier = undefined;
            }
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        try {
            if (!confirmationResult) {
                throw new Error("Please request OTP first.");
            }

            if (otp.length !== 6) {
                throw new Error("Enter valid 6 digit OTP.");
            }

            setLoading(true);
            setError("");
            setSuccess("");

            const credential = await confirmationResult.confirm(otp);

            const idToken = await credential.user.getIdToken(true);

            await api.post("/auth/login", {
                idToken,
            });

            await refreshUser();

            router.refresh();

            router.replace("/");

            setSuccess("Login successful.");
        } catch (err: any) {
            console.error(err);

            if (err?.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(getFirebaseError(err.code));
            }
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = async () => {
        if (timer > 0) return;

        await sendOTP();
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);

            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch { }

                window.recaptchaVerifier = undefined;
            }
        };
    }, []);

    return {
        phone,
        setPhone,
        otp,
        setOtp,
        loading,
        error,
        success,
        timer,
        step,
        sendOTP,
        verifyOTP,
        resendOTP,
    };
}