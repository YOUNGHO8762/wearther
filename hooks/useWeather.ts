import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchWeather } from '@/services/weatherAPI';
import { Geolocation } from '@/types/geolocation';
import { ForecastWeather, WeatherState } from '@/types/weather';

const isTodayAfter = (date: dayjs.Dayjs | Date | string): boolean => {
  const now = dayjs();
  const targetDate = dayjs(date);

  const isTodayAfterNow =
    targetDate.isSame(now, 'day') && targetDate.isAfter(now);

  const isTomorrowMidnightAfterNow =
    targetDate.isSame(now.add(1, 'day'), 'day') &&
    targetDate.hour() === 0 &&
    targetDate.isAfter(now);

  return isTodayAfterNow || isTomorrowMidnightAfterNow;
};

const filterTodayForecast = (
  forecastList: ForecastWeather[],
): ForecastWeather[] => {
  return forecastList.filter((item) => isTodayAfter(item.dt_txt));
};

export default function useWeather(geolocation: Geolocation | null) {
  const [weather, setWeather] = useState<WeatherState | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      try {
        const response = await fetchWeather(geolocation);
        setWeather({
          forecast: filterTodayForecast(response.forecast.list),
          current: {
            main: response.current.main,
            weather: response.current.weather[0],
            wind: response.current.wind,
          },
        });
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    })();
  }, [geolocation]);

  return weather;
}
