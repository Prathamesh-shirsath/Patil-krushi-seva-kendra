import { z } from "zod";

export const createAddressSchema = z.object({
    fullName: z.string().trim().min(2).max(100),

    phone: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number"),

    state: z.string().trim().min(2),
    district: z.string().trim().min(2),
    taluka: z.string().trim().optional(),
    village: z.string().trim().min(2),
    city: z.string().trim().optional(),

    pincode: z
        .string()
        .regex(/^\d{6}$/, "Invalid pincode"),

    addressLine: z.string().trim().min(5).max(250),

    landmark: z.string().trim().optional(),

    isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;