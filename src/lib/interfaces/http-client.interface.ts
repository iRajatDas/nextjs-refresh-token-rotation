export interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
}

export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface IHttpClient {
  get<T = unknown>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>>;
  delete<T = unknown>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>>;
}
