import {
  ADDRESS_DETAILS_URL,
  SEARCH_ADDRESS_URL,
} from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import { AddressDetailsResponse, SearchAddressResponse } from '@/types/address';

export const fetchSearchAddress = async (input: string) => {
  const response = await apiClient.get<SearchAddressResponse>(
    SEARCH_ADDRESS_URL,
    {
      params: {
        input,
      },
    },
  );
  return response;
};

export const fetchAddressDetails = async (placeID: string) => {
  const response = await apiClient.get<AddressDetailsResponse>(
    ADDRESS_DETAILS_URL,
    {
      params: {
        placeID,
      },
    },
  );

  return response;
};
