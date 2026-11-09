import { Request, Response } from "express";
import { ZodError } from "zod";
import * as userService from "../services/user.service";
import { updateProfileSchema } from "../validators/user.validator";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const user = await userService.getProfile(userId);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { userId } = res.locals.user;

        const body = updateProfileSchema.parse(req.body);

        const user = await userService.updateProfile(userId, body);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: user,
        });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0]?.message ?? "Invalid profile data.",
            });
        }

        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update profile. Please try again.",
        });
    }
};