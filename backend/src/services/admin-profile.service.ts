import { prisma } from "../lib/prisma";

export const getAdminProfile = async (userId: string) => {
  const admin = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!admin) {
    throw new Error("ADMIN_NOT_FOUND");
  }

  return admin;
};

export const updateAdminProfile = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
  }
) => {
  const admin = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!admin) {
    throw new Error("ADMIN_NOT_FOUND");
  }

  if (data.email && data.email !== admin.email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
  }

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.image !== undefined && { image: data.image }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};