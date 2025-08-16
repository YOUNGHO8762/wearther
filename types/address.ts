export interface Predictions {
  description: string;
  place_id: string;
}

export interface FetchAddressResponse {
  predictions: Predictions[];
  status: string;
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
}
