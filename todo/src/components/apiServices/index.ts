import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { route } from "../routes/route";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Shared promise prevents multiple simultaneous refresh requests
let refreshPromise: Promise<void> | null = null;

client.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    // Only handle 401 errors, never retry the same request twice
    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't refresh for login, register, refresh, or logout
    const url = originalRequest.url ?? "";

    if (
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Reuse an existing refresh request
      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post("/auth/refresh")
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      // Retry the ORIGINAL failed request
      return client(originalRequest);
    } catch {
      window.location.replace(route.loginPath);

      // Refresh failed: user must authenticate again
      return Promise.reject(error);
    }
  },
);

export const http = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    client.get<T>(url, config).then((r) => r.data),

  post: <T = unknown>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => client.post<T>(url, body, config).then((r) => r.data),

  put: <T = unknown>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => client.put<T>(url, body, config).then((r) => r.data),

  patch: <T = unknown>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => client.patch<T>(url, body, config).then((r) => r.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    client.delete<T>(url, config).then((r) => r.data),
};
