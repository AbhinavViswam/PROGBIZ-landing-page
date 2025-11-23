import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createFaq, deleteFaq, getFaq } from "./faq.api";

export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const data = await getFaq();
      return data;
    },
    staleTime: 1000 * 30,
  });
};

export const useCreateFaq = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { question: string; answer: string }) =>
      createFaq(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

export const useDeleteFaq = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
