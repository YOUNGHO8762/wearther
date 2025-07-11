import { REVERSE_GEOCODE_URL } from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import { Geolocation, ReverseGeocodeResponse } from '@/types/geolocation';

export const fetchReverseGeocode = async (geolocation: Geolocation) => {
  const response = await apiClient.get<ReverseGeocodeResponse>(
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
