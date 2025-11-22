import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFeature,
  deleteFeature,
  getFeatures,
  updateFeature,
} from "./feature.api";

export const useFeatures = () => {
  return useQuery({
    queryKey: ["features"],
    queryFn: getFeatures,
    staleTime: 1000 * 30, // 30s
  });
};

export const useCreateFeature = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createFeature,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
    },
  });
};

export const useUpdateFeature = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateFeature(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
    },
  });
};

export const useDeleteFeature = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFeature(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["features"] });
    },
  });
};
