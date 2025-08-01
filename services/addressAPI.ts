import {
  ADDRESS_DETAILS_URL,
  SEARCH_ADDRESS_URL,
} from '@/services/api/endpoint';
import { httpClient } from '@/services/api/httpClient';
import {
  FetchAddressDetailsResponse,
  FetchAddressSearchResponse,
} from '@/types/address';

export const fetchAddressSearch = async (input: string) => {
  const response = await httpClient.get<FetchAddressSearchResponse>(
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
  const response = await httpClient.get<FetchAddressDetailsResponse>(
    ADDRESS_DETAILS_URL,
    {
      params: {
        placeID,
      },
    },
  );

  return response;
};
