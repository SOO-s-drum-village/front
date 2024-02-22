import { SortDirection } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": `application/json`,
  },
  withCredentials: true,
});

baseInstance.interceptors.response.use(({ data }) => data);

interface ApiResponse<T> {
  success: boolean;
  data?: T | null;
  // "dataType": null,
  timestamp: number;
  // "code": "UNKNOWN_ERROR",
  code: string;
  statusCode: 200 | 201 | 400 | 500;
  message?: string;
}

export type ListRequest = {
  page: number;
  size?: number;
  direction?: SortDirection;
};

interface ApiRequestMethods {
  get<T>(url: string, request?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, body?: any): Promise<T>;
  put<T>(url: string, body?: any): Promise<T>;
  patch<T>(url: string, body?: any): Promise<T>;
  delete<T>(url: string, id: any): Promise<T>;
}

export const apiRequest: ApiRequestMethods = {
  get: (url, request) => {
    console.log("🧸 get", { url, request });
    return baseInstance.get(url, request);
  },
  post: (url, body) => {
    console.log("🧸 post", { url, body });
    return baseInstance.post(url, body);
  },
  put: (url, body) => {
    console.log("🧸 put", { url, body });
    return baseInstance.put(url, body);
  },
  patch: (url, body) => {
    console.log("🧸 patch", { url, body });
    return baseInstance.patch(url, body);
  },
  delete: (url, id) => {
    console.log("🧸 delete", { url, id });
    return baseInstance.delete(`${url}/${id}`);
  },
};
