import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { extractErrorMessage } from '@/lib/utils';
import { fetchReverseGeocode } from '@/services/geocodingAPI';
import { Geolocation } from '@/types/geolocation';

export default function useReverseGeocoding(geolocation: Geolocation | null) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!geolocation) {
      return;
    }

    (async () => {
      try {
        const response = await fetchReverseGeocode(geolocation);
        setAddress(response.results[0].formatted_address);
      } catch (error) {
        toast.error(extractErrorMessage(error));
      }
    })();
  }, [geolocation]);

  return address;
}
