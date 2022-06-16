import axios from "axios";
import store from "@/store";

const defaultConfig = {
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const formConfig = {
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

const tokenInterceptor = (config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.credentials.token}`;
  return config;
};

const errorInterceptor = async (error) => {
  const originalRequest = error.config;

  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    await store.dispatch("auth/refreshToken");

    return await AuthAPIInstance.request(originalRequest);
  }

  throw error;
};

export const DefaultAPIInstance = axios.create(defaultConfig);
export const AuthAPIInstance = axios.create(defaultConfig);
export const FormAuthAPIInstance = axios.create(formConfig);

AuthAPIInstance.interceptors.request.use(tokenInterceptor);
AuthAPIInstance.interceptors.response.use((config) => config, errorInterceptor);

FormAuthAPIInstance.interceptors.request.use(tokenInterceptor);
FormAuthAPIInstance.interceptors.response.use(
  (config) => config,
  errorInterceptor
);
