import api from "@/lib/axios";
import type { UpdateProfileDto, UserProfile } from "@/types/user";

export const getProfile = async (): Promise<UserProfile> => {
    const { data: response } = await api.get<{
        success: boolean;
        message?: string;
        data?: UserProfile;
    }>("/users/me");

    if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to load profile.");
    }

    return response.data;
};

export const updateProfile = async (
    payload: UpdateProfileDto
): Promise<UserProfile> => {
    const { data: response } = await api.put<{
        success: boolean;
        message?: string;
        data?: UserProfile;
    }>("/users/me", payload);

    if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to update profile.");
    }

    return response.data;
};