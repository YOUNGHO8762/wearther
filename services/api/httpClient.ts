import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

import { BASE_URL } from '@/services/api/endpoint';

class HttpClient {
  private instance;

  constructor(config?: CreateAxiosDefaults) {
    this.instance = axios.create(config);
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.instance.get<T>(url, config);
    return data;
  }
}

export const apiClient = new HttpClient({
  baseURL: BASE_URL,
});
