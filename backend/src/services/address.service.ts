import { prisma } from "../lib/prisma";
import {
  CreateAddressInput,
  UpdateAddressInput,
} from "../validators/address.validator";

export const getAddresses = async (userId: string) => {
  return prisma.address.findMany({
    where: { userId },
    orderBy: [
      { isDefault: "desc" },
      { createdAt: "desc" },
    ],
  });
};

export const createAddress = async (
  userId: string,
  data: CreateAddressInput
) => {
  const body = data as Required<CreateAddressInput>;

  return prisma.$transaction(async (tx) => {
    if (body.isDefault) {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: {
        userId,
        fullName: body.fullName,
        phone: body.phone,
        state: body.state,
        district: body.district,
        city: body.city,
        pincode: body.pincode,
        addressLine: body.addressLine,
        landmark: body.landmark,
        isDefault: body.isDefault ?? false,
      },
    });
  });
};

export const updateAddress = async (
  id: string,
  userId: string,
  data: UpdateAddressInput
) => {
  return prisma.$transaction(async (tx) => {
    const address = await tx.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new Error("Address not found");
    }

    if (data.isDefault) {
      await tx.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }

    return tx.address.update({
      where: { id },
      data: {
        ...(data.fullName !== undefined && {
          fullName: data.fullName,
        }),
        ...(data.phone !== undefined && {
          phone: data.phone,
        }),
        ...(data.state !== undefined && {
          state: data.state,
        }),
        ...(data.district !== undefined && {
          district: data.district,
        }),
        ...(data.city !== undefined && {
          city: data.city,
        }),
        ...(data.pincode !== undefined && {
          pincode: data.pincode,
        }),
        ...(data.addressLine !== undefined && {
          addressLine: data.addressLine,
        }),
        ...(data.landmark !== undefined && {
          landmark: data.landmark,
        }),
        ...(data.isDefault !== undefined && {
          isDefault: data.isDefault,
        }),
      },
    });
  });
};

export const deleteAddress = async (
  id: string,
  userId: string
) => {
  const address = await prisma.address.findFirst({
    where: { id, userId },
  });

  if (!address) {
    throw new Error("Address not found");
  }

  await prisma.address.delete({
    where: { id },
  });
};

export const setDefaultAddress = async (
  id: string,
  userId: string
) => {
  return prisma.$transaction(async (tx) => {
    const address = await tx.address.findFirst({
      where: { id, userId },
    });

    if (!address) {
      throw new Error("Address not found");
    }

    await tx.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });

    return tx.address.update({
      where: { id },
      data: { isDefault: true },
    });
  });
};