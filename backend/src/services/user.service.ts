import { prisma } from "../lib/prisma";
import { UpdateProfileInput } from "../validators/user.validator";

export const getProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            role: true,
            createdAt: true,

            addresses: {
                orderBy: {
                    isDefault: "desc",
                },
            },
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const updateProfile = async (
    userId: string,
    data: UpdateProfileInput
) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: data.name,
        },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
};