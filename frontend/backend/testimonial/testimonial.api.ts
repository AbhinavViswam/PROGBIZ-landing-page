import axiosClient from "@/config/axiosClient";

export const getTestimonials = async () => {
  const res = await axiosClient.get("/testimonial");
  return res?.data;
};

export const createTestimonial = async (payload: {
  name: string;
  role: string;
  description: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("role", payload.role);
  formData.append("description", payload.description);
  formData.append("avatarurl", payload.file);

  const res = await axiosClient.post("/testimonial", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res?.data;
};

export const updateTestimonial = async (
  id: string,
  payload: {
    name?: string;
    role?: string;
    description?: string;
    file?: File;
  }
) => {
  const formData = new FormData();

  if (payload.name) formData.append("name", payload.name);
  if (payload.role) formData.append("role", payload.role);
  if (payload.description) formData.append("description", payload.description);
  if (payload.file) formData.append("avatarurl", payload.file);

  const res = await axiosClient.put(`/testimonial/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res?.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await axiosClient.delete(`/testimonial/${id}`);
  return res?.data;
};
