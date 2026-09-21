import axios from "axios";
import { auth } from "./firebase";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();

        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;