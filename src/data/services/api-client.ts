import { API_CONFIG, RequestConfig } from "@/configs/api-config";
import { ApiError, ApiResponse } from "../models/api";
import { notFound } from "next/navigation";

class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  public static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new ApiClient();
    }
    return this.instance;
  }

  private createUrl(endpoint: string, params?: Record<string, string>): URL {
    const url = new URL(`${API_CONFIG.baseUrl}${endpoint}`);
    url.searchParams.append("api_key", API_CONFIG.apiKey!);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url;
  }

  private async handleAPIStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    }
    let errorMessage: string;
    let errorCode: string | undefined;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || response.statusText;
      errorCode = errorData.code;
    } catch {
      errorMessage = response.statusText;
    }

    const error: ApiError = {
      status: response.status,
      message: errorMessage,
      code: errorCode,
    };

    if (response.status === 404) {
      notFound();
    }

    throw error;
  }

  private handle500(message: string) {
    alert(message ?? "Network error");
  }

  private handleAPIError(error: ApiError) {
    const status = error?.status;

    if (status === 500) {
      this.handle500(error.message);
    } else if (!error.code) {
      console.error("API call error:", error.message);
    }

    return Promise.reject(error);
  }

  private createRequestConfig(config: RequestConfig = {}): RequestInit {
    const { method = "GET", headers = {}, data, ...rest } = config;

    const requestConfig: RequestInit = {
      method,
      headers: {
        ...API_CONFIG.defaultHeaders,
        ...headers,
      },
      ...rest,
    };

    if (method !== "GET" && data !== undefined) {
      requestConfig.body = JSON.stringify(data);
    }

    if (method === "GET") {
      requestConfig.next = { revalidate: API_CONFIG.revalidate };
    }

    return requestConfig;
  }

  public async request<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<ApiResponse<T>> {
    const url = this.createUrl(endpoint, config.params);
    const requestConfig = this.createRequestConfig(config);

    try {
      const response = await fetch(url, requestConfig);
      return this.handleAPIStatus(response);
    } catch (error) {
      return this.handleAPIError(error as ApiError);
    }
  }

  public async get<T>(endpoint: string, config = {}) {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  public async post<T>(endpoint: string, data: any, config = {}) {
    return this.request<T>(endpoint, { ...config, method: "POST", data });
  }

  public async put<T>(endpoint: string, data?: any, config = {}) {
    return this.request<T>(endpoint, { ...config, method: "PUT", data });
  }

  public async patch<T>(endpoint: string, data?: any, config = {}) {
    return this.request<T>(endpoint, { ...config, method: "PATCH", data });
  }

  public async delete<T>(endpoint: string, config = {}) {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const apiClient = ApiClient.getInstance();
