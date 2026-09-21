import "../config/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "../lib/prisma";
import { generateToken } from "../utils/jwt";
import bcrypt from "bcrypt";

// ================= INTERFACES =================

export interface FirebaseLoginData {
  idToken: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface EmailLoginData {
  email: string;
  password: string;
}

// ================= FIREBASE PHONE LOGIN =================

export const loginUser = async ({
  idToken,
}: FirebaseLoginData) => {
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
        {
          firebaseUid: decoded.uid,
        },
        {
          phone: decoded.phone_number,
        },
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

// ================= EMAIL REGISTER =================

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterData) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "CUSTOMER",
      emailVerified: false,
    },
  });

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

// ================= EMAIL LOGIN =================

export const emailLoginUser = async ({
  email,
  password,
}: EmailLoginData) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user || !user.password) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

// ================= GET CURRENT USER =================

export const getCurrentUser = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

// ================= LOGOUT =================

export const logoutUser = async () => {
  return true;
};