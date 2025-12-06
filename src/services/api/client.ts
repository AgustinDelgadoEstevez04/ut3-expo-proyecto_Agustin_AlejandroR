import axios, { AxiosInstance, AxiosError } from 'axios';
import { ENV } from '@/config/env';

/**
 * Cliente HTTP configurado con Axios
 */
class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: ENV.SPOONACULAR_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Agregar API key a todos los requests
        config.params = {
          ...config.params,
          apiKey: ENV.SPOONACULAR_API_KEY,
        };
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Error con respuesta del servidor
          console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
          // Error de red
          console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
export const client = apiClient.getAxiosInstance();