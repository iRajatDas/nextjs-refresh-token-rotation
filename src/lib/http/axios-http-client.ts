import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { IHttpClient, HttpClientConfig, HttpResponse } from "../interfaces/http-client.interface";

export class AxiosHttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(config?: HttpClientConfig) {
    this.client = axios.create({
      baseURL: config?.baseURL,
      headers: config?.headers,
      withCredentials: config?.withCredentials ?? true,
      timeout: config?.timeout,
    });
  }

  public setInterceptors(
    requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    errorInterceptor?: (error: AxiosError) => Promise<never>
  ): void {
    if (requestInterceptor) {
      this.client.interceptors.request.use(requestInterceptor);
    }
    if (responseInterceptor || errorInterceptor) {
      this.client.interceptors.response.use(responseInterceptor, errorInterceptor);
    }
  }

  private mapResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
    };
  }

  async get<T = unknown>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>> {
    const response = await this.client.get<T>(url, config as AxiosRequestConfig);
    return this.mapResponse(response);
  }

  async post<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>> {
    const response = await this.client.post<T>(url, data, config as AxiosRequestConfig);
    return this.mapResponse(response);
  }

  async put<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>> {
    const response = await this.client.put<T>(url, data, config as AxiosRequestConfig);
    return this.mapResponse(response);
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<HttpResponse<T>> {
    const response = await this.client.patch<T>(url, data, config as AxiosRequestConfig);
    return this.mapResponse(response);
  }

  async delete<T = unknown>(url: string, config?: HttpClientConfig): Promise<HttpResponse<T>> {
    const response = await this.client.delete<T>(url, config as AxiosRequestConfig);
    return this.mapResponse(response);
  }
}
