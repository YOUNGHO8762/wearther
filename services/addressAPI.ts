import {
  ADDRESS_DETAILS_URL,
  SEARCH_ADDRESS_URL,
} from '@/services/api/endpoint';
import { apiClient } from '@/services/api/httpClient';
import {
  FetchAddressDetailsResponse,
  FetchAddressSearchResponse,
} from '@/types/address';

export const fetchAddressSearch = async (input: string) => {
  const response = await apiClient.get<FetchAddressSearchResponse>(
    SEARCH_ADDRESS_URL,
    {
      params: {
        input,
      },
    },
  );
  return response.predictions;
};

export const fetchAddressDetails = async (placeID: string) => {
  const response = await apiClient.get<FetchAddressDetailsResponse>(
    ADDRESS_DETAILS_URL,
    {
      params: {
        placeID,
      },
    },
  );

  return response;
};
