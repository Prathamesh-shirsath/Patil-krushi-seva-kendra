import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";

import "../config/firebase-admin";

// =====================================================
// ADMIN LIST
// =====================================================

export const getAdmins = async (
    _req: Request,
    res: Response
) => {
    try {
        const admins: Array<{
            id: string;
            name: string;
            email: string;
            status: "Active" | "Disabled";
            createdAt: string | null;
            lastLoginAt: string | null;
        }> = [];

        let pageToken: string | undefined;

        do {
            const result = await getAuth().listUsers(
                1000,
                pageToken
            );

            for (const user of result.users) {
                const isPasswordAdmin =
                    user.providerData.some(
                        (provider) =>
                            provider.providerId === "password"
                    );

                if (!isPasswordAdmin || !user.email) {
                    continue;
                }

                admins.push({
                    id: user.uid,
                    name: user.displayName ?? "",
                    email: user.email,
                    status: user.disabled
                        ? "Disabled"
                        : "Active",
                    createdAt:
                        user.metadata.creationTime ?? null,
                    lastLoginAt:
                        user.metadata.lastSignInTime ?? null,
                });
            }

            pageToken = result.pageToken;
        } while (pageToken);

        return res.status(200).json({
            success: true,
            admins,
        });
    } catch (error) {
        console.error("Get admins error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch administrators.",
        });
    }
};

// =====================================================
// CREATE ADMIN
// =====================================================

export const createAdmin = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Admin name is required.",
            });
        }

        if (!email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Admin email is required.",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Admin password is required.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 6 characters.",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        // =====================================================
        // CREATE FIREBASE EMAIL + PASSWORD USER
        // =====================================================

        const firebaseUser =
            await getAuth().createUser({
                email: normalizedEmail,
                password,
                displayName: name.trim(),
                disabled: false,
            });

        return res.status(201).json({
            success: true,
            message: "Admin created successfully.",
            admin: {
                id: firebaseUser.uid,
                name: firebaseUser.displayName ?? "",
                email: firebaseUser.email ?? "",
                status: firebaseUser.disabled
                    ? "Disabled"
                    : "Active",
                createdAt:
                    firebaseUser.metadata.creationTime ?? null,
                lastLoginAt:
                    firebaseUser.metadata.lastSignInTime ?? null,
            },
        });
    } catch (error: any) {
        console.error("Create admin error:", error);

        if (
            error?.code ===
            "auth/email-already-exists"
        ) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists.",
            });
        }

        if (
            error?.code === "auth/invalid-email"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address.",
            });
        }

        if (
            error?.code ===
            "auth/password-does-not-meet-requirements"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Password does not meet Firebase requirements.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create administrator.",
        });
    }
};

// =====================================================
// UPDATE ADMIN
// Name / Enable / Disable
// =====================================================

export const updateAdmin = async (
    req: Request,
    res: Response
) => {
    try {
        // ===================================================
        // FIX: Express params can be string | string[]
        // ===================================================

        const uid = Array.isArray(req.params.uid)
            ? req.params.uid[0]
            : req.params.uid;

        const { name, disabled } = req.body;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: "Admin ID is required.",
            });
        }

        const currentAdminUid =
            res.locals.user?.firebaseUid;

        // ===================================================
        // PREVENT SELF DISABLE
        // ===================================================

        if (
            currentAdminUid === uid &&
            typeof disabled === "boolean" &&
            disabled === true
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot disable your own admin account.",
            });
        }

        const updateData: {
            displayName?: string;
            disabled?: boolean;
        } = {};

        // ===================================================
        // UPDATE NAME
        // ===================================================

        if (typeof name === "string") {
            const trimmedName = name.trim();

            if (!trimmedName) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Admin name cannot be empty.",
                });
            }

            updateData.displayName = trimmedName;
        }

        // ===================================================
        // UPDATE STATUS
        // ===================================================

        if (typeof disabled === "boolean") {
            updateData.disabled = disabled;
        }

        if (
            Object.keys(updateData).length === 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "No update data provided.",
            });
        }

        // ===================================================
        // UPDATE FIREBASE USER
        // ===================================================

        const firebaseUser =
            await getAuth().updateUser(
                uid,
                updateData
            );

        return res.status(200).json({
            success: true,
            message: "Admin updated successfully.",
            admin: {
                id: firebaseUser.uid,
                name:
                    firebaseUser.displayName ?? "",
                email:
                    firebaseUser.email ?? "",
                status: firebaseUser.disabled
                    ? "Disabled"
                    : "Active",
                createdAt:
                    firebaseUser.metadata.creationTime ??
                    null,
                lastLoginAt:
                    firebaseUser.metadata.lastSignInTime ??
                    null,
            },
        });
    } catch (error: any) {
        console.error(
            "Update admin error:",
            error
        );

        if (
            error?.code ===
            "auth/user-not-found"
        ) {
            return res.status(404).json({
                success: false,
                message:
                    "Administrator not found.",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Failed to update administrator.",
        });
    }
};

// =====================================================
// DELETE ADMIN
// =====================================================

export const deleteAdmin = async (
    req: Request,
    res: Response
) => {
    try {
        // ===================================================
        // FIX: Express params can be string | string[]
        // ===================================================

        const uid = Array.isArray(req.params.uid)
            ? req.params.uid[0]
            : req.params.uid;

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: "Admin ID is required.",
            });
        }

        const currentAdminUid =
            res.locals.user?.firebaseUid;

        // ===================================================
        // PREVENT SELF DELETE
        // ===================================================

        if (currentAdminUid === uid) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot delete your own admin account.",
            });
        }

        // ===================================================
        // GET FIREBASE USER
        // ===================================================

        const firebaseUser =
            await getAuth().getUser(uid);

        // ===================================================
        // VERIFY EMAIL + PASSWORD ACCOUNT
        // ===================================================

        const isPasswordAdmin =
            firebaseUser.providerData.some(
                (provider) =>
                    provider.providerId === "password"
            );

        if (!isPasswordAdmin) {
            return res.status(400).json({
                success: false,
                message:
                    "This account is not an Email + Password admin.",
            });
        }

        // ===================================================
        // DELETE FIREBASE USER
        // ===================================================

        await getAuth().deleteUser(uid);

        return res.status(200).json({
            success: true,
            message:
                "Admin deleted successfully.",
            uid,
        });
    } catch (error: any) {
        console.error(
            "Delete admin error:",
            error
        );

        if (
            error?.code ===
            "auth/user-not-found"
        ) {
            return res.status(404).json({
                success: false,
                message:
                    "Administrator not found.",
            });
        }

        return res.status(500).json({
            success: false,
            message:
                "Failed to delete administrator.",
        });
    }
};