import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { FetchAddressDetailsResponse } from '@/types/address';

const PLACES_DETAILS_URL =
  'https://maps.googleapis.com/maps/api/place/details/json';
const API_KEY = process.env.MAP_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeID = searchParams.get('placeID');

    if (!placeID) {
      return createParamsErrorResponse(['placeID']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Map API');
    }

    const params = {
      place_id: placeID,
      key: API_KEY,
      language: 'ko',
      fields: 'geometry',
    };

    const response = await axios.get<FetchAddressDetailsResponse>(
      PLACES_DETAILS_URL,
      { params },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
