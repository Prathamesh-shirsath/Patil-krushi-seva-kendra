
import { Request, Response } from "express";
import { ZodError } from "zod";
import * as authService from "../services/auth.service";

import {
    LoginSchema,
    RegisterSchema,
    EmailLoginSchema,
} from "../validators/auth.validator";

// =====================================================
// FIREBASE PHONE OTP LOGIN
// =====================================================

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { idToken } = LoginSchema.parse(req.body);

        const { user, token } =
            await authService.loginUser({ idToken });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            user,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.flatten().fieldErrors,
            });
        }

        return res.status(401).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Authentication failed.",
        });
    }
};

// =====================================================
// EMAIL + PASSWORD REGISTER
// =====================================================

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const data = RegisterSchema.parse(req.body);

        const { user, token } =
            await authService.registerUser(data);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            user,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.flatten().fieldErrors,
            });
        }

        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Registration failed.",
        });
    }
};

// =====================================================
// EMAIL + PASSWORD LOGIN
// =====================================================

export const emailLogin = async (
    req: Request,
    res: Response
) => {
    try {
        const data = EmailLoginSchema.parse(req.body);

        const { user, token } =
            await authService.emailLoginUser(data);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.status(200).json({
            success: true,
            message: "Email login successful.",
            user,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.flatten().fieldErrors,
            });
        }

        return res.status(401).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Authentication failed.",
        });
    }
};

// =====================================================
// CURRENT USER
// =====================================================

export const me = async (
    _req: Request,
    res: Response
) => {
    try {
        const authUser = res.locals.user;

        if (!authUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await authService.getCurrentUser(
            authUser.userId
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Internal server error",
        });
    }
};

// =====================================================
// LOGOUT
// =====================================================

export const logout = async (
    _req: Request,
    res: Response
) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        success: true,
        message: "Logged out successfully.",
    });
};