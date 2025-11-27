import { queryOptions } from '@tanstack/react-query';

import { fetchWeather } from '@/services/weatherAPI';
import { Geolocation } from '@/types/geolocation';

const weatherQueries = {
  all: () => ['weather'],
  weather: (geolocation: Geolocation) =>
    queryOptions({
      staleTime: 1000 * 60 * 30,
      queryKey: [...weatherQueries.all(), geolocation],
      queryFn: () => fetchWeather(geolocation),
    }),
};

export default weatherQueries;
