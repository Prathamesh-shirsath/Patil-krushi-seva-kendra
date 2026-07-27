import { api } from "@/lib/axios";
import type { Banner } from "@/types/banner";

export async function getBanners(): Promise<Banner[]> {
  const response = await api.get("/banners");

  return response.data.data;
}

export async function createBanner(formData: FormData) {
  const response = await api.post("/banners", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data as Banner;
}

export async function updateBanner(id: string, formData: FormData) {
  const response = await api.put(`/banners/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data as Banner;
}
