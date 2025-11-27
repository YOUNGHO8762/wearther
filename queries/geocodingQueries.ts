import { queryOptions } from '@tanstack/react-query';

import { fetchReverseGeocode } from '@/services/geocodingAPI';
import { Geolocation } from '@/types/geolocation';

const geocodingQueries = {
  all: () => ['geocoding'],
  reverseGeocodes: () => [...geocodingQueries.all(), 'reverseGeocode'],
  reverseGeocode: (geolocation: Geolocation) =>
    queryOptions({
      staleTime: Infinity,
      gcTime: Infinity,
      queryKey: [...geocodingQueries.reverseGeocodes(), geolocation],
      queryFn: () => fetchReverseGeocode(geolocation),
      select: (data) => data.results[0].formatted_address,
    }),
};

export default geocodingQueries;
