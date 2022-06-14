import axios from "axios";
import store from "@/store";

const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const DefaultAPIInstance = axios.create(defaultConfig);
export const AuthAPIInstance = axios.create(defaultConfig);

AuthAPIInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.credentials.token}`;
  return config;
});

AuthAPIInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      await store.dispatch("auth/refreshToken");

      return await AuthAPIInstance.request(originalRequest);
    }

    throw error;
  }
);
