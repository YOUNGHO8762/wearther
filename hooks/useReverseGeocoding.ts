import { useSuspenseQuery } from '@tanstack/react-query';

import geocodingQueries from '@/queries/geocodingQueries';
import { Geolocation } from '@/types/geolocation';

export default function useReverseGeocoding(geolocation: Geolocation) {
  const { data: address, error } = useSuspenseQuery(
    geocodingQueries.reverseGeocode(geolocation),
  );

  return { address, error };
}
