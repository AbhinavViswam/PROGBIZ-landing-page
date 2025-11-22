import axiosClient from "@/config/axiosClient";

export const getFaq = async () => {
  const res = await axiosClient.get("/faq");
  return res?.data;
};

export const createFaq = async (payload: {
  question: string;
  answer: string;
}) => {
  const res = await axiosClient.post("/faq", payload);
  return res?.data;
};

export const deleteFaq = async (id: string) => {
  const res = await axiosClient.delete(`/faq/${id}`);
  return res?.data;
};
