import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET or BETTER_AUTH_SECRET must be configured."
  );
}

export interface JwtPayload {
  userId: string;
  firebaseUid: string;
  role: "ADMIN" | "CUSTOMER";
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};