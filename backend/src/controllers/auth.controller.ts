import { Request, Response } from "express";
import { ZodError } from "zod";
import * as authService from "../services/auth.service";
import { LoginSchema } from "../validators/auth.validator";

export const login = async (req: Request, res: Response) => {
    try {
        const { idToken } = LoginSchema.parse(req.body);

        const { user, token } = await authService.loginUser({
            idToken,
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
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

export const me = async (req: Request, res: Response) => {
    try {
        const authUser = res.locals.user;

        if (!authUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await authService.getCurrentUser(authUser.firebaseUid);

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

export const logout = async (_req: Request, res: Response) => {
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