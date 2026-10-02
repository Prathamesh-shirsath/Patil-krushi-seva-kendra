import { z } from "zod";

// ================= FIREBASE PHONE OTP =================

export const LoginSchema = z.object({
    idToken: z
        .string()
        .min(1, "Firebase ID Token is required"),
});

// ================= MOBILE + PASSWORD REGISTER =================

export const RegisterSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),

    phone: z
        .string()
        .trim()
        .regex(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        ),

    password: z
        .string()
        .min(
            8,
            "Password must be at least 8 characters"
        ),
});

// ================= MOBILE + PASSWORD LOGIN =================

export const PhoneLoginSchema = z.object({
    phone: z
        .string()
        .trim()
        .regex(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit mobile number"
        ),

    password: z
        .string()
        .min(1, "Password is required"),
});

export type LoginInput =
    z.infer<typeof LoginSchema>;

export type RegisterInput =
    z.infer<typeof RegisterSchema>;

export type PhoneLoginInput =
    z.infer<typeof PhoneLoginSchema>;