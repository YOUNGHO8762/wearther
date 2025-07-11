import { useEffect, useState } from 'react';

import { fetchReverseGeocode } from '@/services/geocodingAPI';
import { Geolocation } from '@/types/geolocation';

export function useReverseGeocoding(geolocation: Geolocation | null) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      const response = await fetchReverseGeocode(geolocation);
      setAddress(response.results[0].address_components[1].short_name);
    })();
  }, [geolocation]);

  return address;
}
