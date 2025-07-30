import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchWeather } from '@/services/weatherAPI';
import { Geolocation } from '@/types/geolocation';
import { FetchWeatherResponse } from '@/types/weather';

export default function useWeather(geolocation: Geolocation | null) {
  const [weather, setWeather] = useState<FetchWeatherResponse | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      try {
        const response = await fetchWeather(geolocation);
        setWeather(response);
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    })();
  }, [geolocation]);

  return weather;
}
