import { useEffect, useState } from 'react';

import fetchWeather from '@/services/weather/fetchWeather';
import { Geolocation } from '@/types/geolocation/geolocation';
import { WeatherState } from '@/types/weather/weatherState';

const useWeather = (geolocation: Geolocation | null) => {
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      const response = await fetchWeather(geolocation);
      setWeather({
        main: response.main,
        weather: response.weather[0],
        wind: response.wind,
      });
    })();
  }, [geolocation]);

  return weather;
};

export default useWeather;
