import axios, { type AxiosRequestConfig } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

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
