import axiosClient from "@/config/axiosClient";

export const login = async (payload: any) => {
  const res = await axiosClient.post("/login", payload);
  return res.data;
};
export const getUser = async () => {
  const res = await axiosClient.get("/user");
  return res.data;
};
export const logoutUser = async () => {
  const res = await axiosClient.get("/logout");
  return res.data
};
