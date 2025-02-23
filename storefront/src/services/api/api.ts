import { useLoader } from "@/composables/useLoader";
import { useToastStore } from "@/stores/ToastStore";

export class ApiService {
  private baseUrl: string;
  private loader = useLoader();

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      this.loader.startLoading(endpoint);
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `App Error ${response.status}`);
      }

      return response.json();
    } catch (error: any) {
      console.error("API Error:", error.message);
      const toastStore = useToastStore();
      toastStore.addError("API Error", error.message);
      throw error;
    } finally {
      this.loader.stopLoading(endpoint);
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  public post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService("https://fakestoreapi.com");
