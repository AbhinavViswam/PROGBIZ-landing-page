import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api` || "http://localhost:3001/api",
  withCredentials: true, // sends cookies (token)
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally auto-logout
      console.warn("Unauthorized. Redirecting to login...");
    }

    return Promise.reject(
      error.response?.data || {
        success: false,
        message: "Network error",
      }
    );
  }
);

export default axiosClient;
