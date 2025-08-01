import { REVERSE_GEOCODE_URL } from '@/services/api/endpoint';
import { httpClient } from '@/services/api/httpClient';
import { Geolocation, FetchReverseGeocodeResponse } from '@/types/geolocation';

export const fetchReverseGeocode = async (geolocation: Geolocation) => {
  const response = await httpClient.get<FetchReverseGeocodeResponse>(
    REVERSE_GEOCODE_URL,
    {
      params: {
        lat: geolocation.latitude,
        lon: geolocation.longitude,
      },
    },
  );

  return response;
};
