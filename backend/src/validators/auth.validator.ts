import { z } from "zod";

export const LoginSchema = z.object({
    idToken: z
        .string()
        .min(1, "Firebase ID Token is required"),
});

export type LoginInput = z.infer<typeof LoginSchema>;