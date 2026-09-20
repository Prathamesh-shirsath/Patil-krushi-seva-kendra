import { prisma } from "../lib/prisma";

const normalizePincode = (
    pincode: string
) => pincode.trim();

export const getDeliveryPincodes =
    async () => {
        return prisma.deliveryPincode.findMany({
            orderBy: [
                {
                    isActive: "desc",
                },
                {
                    createdAt: "desc",
                },
            ],
        });
    };

export const createDeliveryPincode =
    async (pincode: string) => {
        const normalized =
            normalizePincode(pincode);

        if (!/^\d{6}$/.test(normalized)) {
            throw new Error(
                "Pincode must be exactly 6 digits."
            );
        }

        const existing =
            await prisma.deliveryPincode.findUnique(
                {
                    where: {
                        pincode: normalized,
                    },
                }
            );

        if (existing) {
            throw new Error(
                "This pincode already exists."
            );
        }

        return prisma.deliveryPincode.create({
            data: {
                pincode: normalized,
                isActive: true,
            },
        });
    };

export const updateDeliveryPincode =
    async (
        id: string,
        data: {
            pincode?: string;
            isActive?: boolean;
        }
    ) => {
        const existing =
            await prisma.deliveryPincode.findUnique(
                {
                    where: { id },
                }
            );

        if (!existing) {
            throw new Error(
                "Delivery pincode not found."
            );
        }

        const updateData: {
            pincode?: string;
            isActive?: boolean;
        } = {};

        if (data.pincode !== undefined) {
            const normalized =
                normalizePincode(data.pincode);

            if (!/^\d{6}$/.test(normalized)) {
                throw new Error(
                    "Pincode must be exactly 6 digits."
                );
            }

            const duplicate =
                await prisma.deliveryPincode.findFirst(
                    {
                        where: {
                            pincode: normalized,
                            id: {
                                not: id,
                            },
                        },
                    }
                );

            if (duplicate) {
                throw new Error(
                    "This pincode already exists."
                );
            }

            updateData.pincode =
                normalized;
        }

        if (data.isActive !== undefined) {
            updateData.isActive =
                data.isActive;
        }

        return prisma.deliveryPincode.update(
            {
                where: { id },
                data: updateData,
            }
        );
    };

export const deleteDeliveryPincode =
    async (id: string) => {
        const existing =
            await prisma.deliveryPincode.findUnique(
                {
                    where: { id },
                }
            );

        if (!existing) {
            throw new Error(
                "Delivery pincode not found."
            );
        }

        await prisma.deliveryPincode.delete({
            where: { id },
        });
    };

export const isDeliveryAvailable =
    async (pincode: string) => {
        const normalized =
            normalizePincode(pincode);

        if (!/^\d{6}$/.test(normalized)) {
            return false;
        }

        const deliveryPincode =
            await prisma.deliveryPincode.findFirst(
                {
                    where: {
                        pincode: normalized,
                        isActive: true,
                    },
                    select: {
                        id: true,
                    },
                }
            );

        return Boolean(
            deliveryPincode
        );
    };