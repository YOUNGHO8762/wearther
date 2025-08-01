import axios, { AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

import {
  BASE_URL,
  MAP_BASE_URL,
  WEATHER_BASE_URL,
} from '@/services/api/endpoint';

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

export const httpClient = new HttpClient({
  baseURL: BASE_URL,
});

export const mapHttpClient = new HttpClient({
  baseURL: MAP_BASE_URL,
});

export const weatherHttpClient = new HttpClient({
  baseURL: WEATHER_BASE_URL,
});
