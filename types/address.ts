export interface SearchAddressResponse {
  predictions: {
    description: string;
    place_id: string;
  }[];
}

export interface AddressDetailsResponse {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  };
}
