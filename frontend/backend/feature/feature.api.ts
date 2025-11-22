import axiosClient from "@/config/axiosClient";

export const getFeatures = async () => {
  const res = await axiosClient.get("/feature");
  return res?.data;
};

export const createFeature = async (payload: {
  title: string;
  subtitle: string;
  content: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("subtitle", payload.subtitle);
  formData.append("content", payload.content);
  formData.append("imgurl", payload.file);
  const res = await axiosClient.post("/feature", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data;
};

export const updateFeature = async (
  id: string,
  payload: {
    title?: string;
    subtitle?: string;
    content?: string;
    file?: File;
  }
) => {
  const formData = new FormData();
  if (payload.title) formData.append("title", payload.title);
  if (payload.subtitle) formData.append("subtitle", payload.subtitle);
  if (payload.content) formData.append("content", payload.content);
  if (payload.file) formData.append("imgurl", payload.file);
  const res = await axiosClient.put(`/feature/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res?.data;
};

export const deleteFeature = async (id: string) => {
  const res = await axiosClient.delete(`/feature/${id}`);
  return res?.data;
};
