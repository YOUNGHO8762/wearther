import { GoogleMapsStatus } from '@/types/googleMaps';

export interface Predictions {
  description: string;
  place_id: string;
}

export interface FetchAddressResponse {
  predictions: Predictions[];
  status: GoogleMapsStatus;
  error_message?: string;
}

export interface FetchLocationByPlaceIDResponse {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
  status: GoogleMapsStatus;
  error_message?: string;
}
