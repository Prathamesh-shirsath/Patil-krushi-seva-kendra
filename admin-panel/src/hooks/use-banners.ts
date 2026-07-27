import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBanner,
  getBanners,
  updateBanner,
} from "@/services/banner.service";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
}

export function useCreateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBanner,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["banners"] }),
  });
}

export function useUpdateBanner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateBanner(id, formData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["banners"] }),
  });
}
