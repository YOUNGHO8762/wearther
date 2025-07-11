import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { fetchWeather } from '@/services/weatherAPI';
import { Geolocation } from '@/types/geolocation';
import { ForecastWeather, WeatherState } from '@/types/weather';

function filterTodayForecast(
  forecastList: ForecastWeather[],
): ForecastWeather[] {
  const now = dayjs();
  const today = now.startOf('day');
  const tomorrow = today.add(1, 'day');

  return forecastList.filter((item) => {
    const forecastDate = dayjs(item.dt_txt);
    const forecastDay = forecastDate.startOf('day');

    return (
      (forecastDay.isSame(today) ||
        (forecastDay.isSame(tomorrow) && forecastDate.hour() === 0)) &&
      forecastDate.isAfter(now)
    );
  });
}

const useWeather = (geolocation: Geolocation | null) => {
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      const response = await fetchWeather(geolocation);
      setWeather({
        forecast: filterTodayForecast(response.forecast.list),
        current: {
          main: response.current.main,
          weather: response.current.weather[0],
          wind: response.current.wind,
        },
      });
    })();
  }, [geolocation]);

  return weather;
};

export default useWeather;
