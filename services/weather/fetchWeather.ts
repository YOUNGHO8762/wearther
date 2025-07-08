import { WEATHER_URL } from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import { Geolocation } from '@/types/geolocation/geolocation';
import { WeatherResponse } from '@/types/weather/weatherResponse';

const fetchWeather = async (geolocation: Geolocation) => {
  const response = await apiClient.get<WeatherResponse>(WEATHER_URL, {
    params: {
      lat: geolocation.latitude,
      lon: geolocation.longitude,
    },
  });

  return response;
};

export default fetchWeather;
