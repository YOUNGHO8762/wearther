import { useSuspenseQuery } from '@tanstack/react-query';

import weatherQueries from '@/queries/weatherQueries';
import { Geolocation } from '@/types/geolocation';

export default function useWeather(geolocation: Geolocation) {
  const { data: weather } = useSuspenseQuery(
    weatherQueries.weather(geolocation),
  );

  return weather;
}
