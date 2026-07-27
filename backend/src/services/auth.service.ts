import "../config/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";

export interface FirebaseLoginData {
    idToken: string;
}

export const loginUser = async ({ idToken }: FirebaseLoginData) => {
    const decoded = await getAuth().verifyIdToken(idToken);

    if (!decoded.uid) {
        throw new Error("Invalid Firebase token.");
    }

    if (!decoded.phone_number) {
        throw new Error("Phone number not found.");
    }

    let user = await prisma.user.findFirst({
        where: {
            OR: [
                { firebaseUid: decoded.uid },
                { phone: decoded.phone_number },
            ],
        },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                firebaseUid: decoded.uid,
                phone: decoded.phone_number,
                name: decoded.name ?? "",
                email: decoded.email ?? null,
                image: decoded.picture ?? null,
            },
        });
    } else if (!user.firebaseUid) {
        user = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                firebaseUid: decoded.uid,
            },
        });
    }

    // Generate JWT
    const token = generateToken({
        userId: user.id,
        firebaseUid: user.firebaseUid!,
        role: user.role,
    });

    return {
        user,
        token,
    };
};

export const getCurrentUser = async (firebaseUid: string) => {
    return prisma.user.findFirst({
        where: {
            firebaseUid,
        },
    });
};

export const logoutUser = async () => {
    return true;
};