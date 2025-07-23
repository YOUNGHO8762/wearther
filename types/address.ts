export interface FetchSearchAddressResponse {
  predictions: {
    description: string;
    place_id: string;
  }[];
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
