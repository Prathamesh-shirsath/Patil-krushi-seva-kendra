import { z } from "zod";

export const LoginSchema = z.object({
    idToken: z.string().min(1, "Firebase ID Token is required"),
});

export const RegisterSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const EmailLoginSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type EmailLoginInput = z.infer<typeof EmailLoginSchema>;