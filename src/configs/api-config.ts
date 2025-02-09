export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestConfig extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  params?: Record<string, string>;
  data?: unknown;
  headers?: Record<string, string>;
}

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY,
  defaultHeaders: {
    "Content-Type": "application/json",
  },
  revalidate: 60 * 60,
  methods: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  } as const,
} as const;
