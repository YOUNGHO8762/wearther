import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { isValidLatitude, isValidLongitude } from '@/lib/utils';
import { GEOCODING_URL } from '@/services/api/endpoint';
import { mapApiClient } from '@/services/api/httpClient';
import { FetchReverseGeocodeResponse } from '@/types/geolocation';

const API_KEY = process.env.MAP_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
      return createParamsErrorResponse(['위도', '경도']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Map API');
    }

    const response = await mapApiClient.get<FetchReverseGeocodeResponse>(
      GEOCODING_URL,
      {
        params: {
          latlng: `${lat},${lon}`,
          key: API_KEY,
          language: 'ko',
        },
      },
    );

    return NextResponse.json(response);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
