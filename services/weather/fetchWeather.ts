import { WEATHER_URL } from '@/services/api/endpoint';
import { weatherClient } from '@/services/api/httpClient';
import { Geolocation } from '@/types/geolocation/geolocation';
import { WeatherResponse } from '@/types/weather/weatherResponse';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const fetchWeather = async (geolocation: Geolocation) => {
  if (!API_KEY) {
    throw new Error('Weather API key is missing.');
  }

  const response = await weatherClient.get<WeatherResponse>(WEATHER_URL, {
    params: {
      lat: geolocation.latitude,
      lon: geolocation.longitude,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  });

  return response;
};

export default fetchWeather;
