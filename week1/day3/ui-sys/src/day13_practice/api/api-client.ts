import Axios, { type InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "https://server.aptech.io";

export const apiClient = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStorage = localStorage.getItem("auth-storage")
      ? JSON.parse(localStorage.getItem("auth-storage")!)
      : null;

    const access_token = authStorage?.state?.access_token;

    if (config.headers === undefined) {
      config.headers = new Axios.AxiosHeaders();
    }

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    config.headers.Accept = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/login") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Authentication failed, redirecting to login");
      localStorage.removeItem("auth-storage");
      window.location.href = "/day13practice/login";
      return Promise.reject(error);
    }

    if (error.response?.status === 400) {
      return Promise.reject("Invalid request. Please check data rules.");
    }

    if (error.response?.status === 503) {
      return Promise.reject("Service Unavailable. Please try again later.");
    }

    if (error.response?.status === 500) {
      return Promise.reject("Internal Server Error. Please try again later.");
    }

    if (error.response?.status === 504) {
      return Promise.reject("Gateway Timeout. Please try again later.");
    }

    if (error.response?.status === 429) {
      // skip
    }

    // For all other errors, just reject
    return Promise.reject(error);
  }
);

export default apiClient;
