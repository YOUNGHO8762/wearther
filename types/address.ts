export interface Predictions {
  description: string;
  place_id: string;
}

export interface FetchAddressSearchResponse {
  predictions: Predictions[];
  status: string;
}

export interface FetchAddressDetailsResponse {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
}
