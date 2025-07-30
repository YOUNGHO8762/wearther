import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { PLACE_DETAIL_URL } from '@/services/api/endpoint';
import { mapHttpClient } from '@/services/api/httpClient';
import { FetchAddressDetailsResponse } from '@/types/address';

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

    const response = await mapHttpClient.get<FetchAddressDetailsResponse>(
      PLACE_DETAIL_URL,
      { params },
    );

    return NextResponse.json(response);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
