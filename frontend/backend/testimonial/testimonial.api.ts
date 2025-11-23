import axiosClient from "@/config/axiosClient";

export const getTestimonials = async () => {
  const res = await axiosClient.get("/testimonial");
  return res?.data;
};

export const createTestimonial = async (payload: {
  name: string;
  role: string;
  description: string;
}) => {
  const formData = {
    name: payload?.name,
    role: payload?.role,
    description: payload?.description,
  };
  const res = await axiosClient.post("/testimonial", formData);

  return res?.data;
};

export const updateTestimonial = async (
  id: string,
  payload: {
    name?: string;
    role?: string;
    description?: string;
  }
) => {
  const formData = {
    name: payload?.name,
    role: payload?.role,
    description: payload?.description,
  };

  const res = await axiosClient.put(`/testimonial/${id}`, formData);

  return res?.data;
};

export const deleteTestimonial = async (id: string) => {
  const res = await axiosClient.delete(`/testimonial/${id}`);
  return res?.data;
};
