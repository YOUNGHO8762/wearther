import {
  ADDRESS_DETAILS_URL,
  SEARCH_ADDRESS_URL,
} from '@/services/api/endpoint';
import { httpClient } from '@/services/api/httpClient';
import {
  FetchLocationByPlaceIDResponse,
  FetchAddressResponse,
} from '@/types/address';

export const fetchAddresses = async (input: string) => {
  const response = await httpClient.get<FetchAddressResponse>(
    SEARCH_ADDRESS_URL,
    {
      params: {
        input,
      },
    },
  );
  return response.predictions;
};

export const fetchLocationByPlaceID = async (placeID: string) => {
  const response = await httpClient.get<FetchLocationByPlaceIDResponse>(
    ADDRESS_DETAILS_URL,
    {
      params: {
        placeID,
      },
    },
  );

  return response.result.geometry.location;
};
