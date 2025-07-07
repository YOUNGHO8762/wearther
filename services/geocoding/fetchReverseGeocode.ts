import { GEOCODING_URL } from '@/services/api/endpoint';
import { mapsClient } from '@/services/api/httpClient';
import { Geolocation } from '@/types/geolocation/geolocation';
import { ReverseGeocodeResponse } from '@/types/geolocation/reverseGeocodeResponse';

const API_KEY = process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY;

const fetchReverseGeocode = async (geolocation: Geolocation) => {
  if (!API_KEY) {
    throw new Error('Reverse Geocoding API key is missing.');
  }

  const response = await mapsClient.get<ReverseGeocodeResponse>(GEOCODING_URL, {
    params: {
      latlng: `${geolocation.latitude},${geolocation.longitude}`,
      key: API_KEY,
    },
  });

  return response;
};

export default fetchReverseGeocode;
