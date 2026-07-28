import api from "@/lib/axios";
import { UpdateProfileDto, UserProfile } from "@/types/user";

export const getProfile = async (): Promise<UserProfile> => {
    const { data } = await api.get("/users/me");
    return data;
};

export const updateProfile = async (
    payload: UpdateProfileDto
): Promise<UserProfile> => {
    const { data } = await api.patch("/users/me", payload);
    return data;
};