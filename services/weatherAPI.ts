import { WEATHER_URL } from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import { Geolocation } from '@/types/geolocation';
import { FetchWeatherResponse } from '@/types/weather';

export const fetchWeather = async (geolocation: Geolocation) => {
  const response = await apiClient.get<FetchWeatherResponse>(WEATHER_URL, {
    params: {
      lat: geolocation.latitude,
      lon: geolocation.longitude,
    },
  });

  return response;
};
