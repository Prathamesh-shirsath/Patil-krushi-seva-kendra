
import { api } from "@/lib/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};
