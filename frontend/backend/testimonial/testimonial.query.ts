import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "./testimonial.api";

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 1000 * 30,
  });
};

export const useCreateTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateTestimonial(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTestimonial(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};
