import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { FetchReverseGeocodeResponse } from '@/types/geolocation';

const GEOCODING_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = process.env.MAP_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return createParamsErrorResponse(['위도', '경도']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Map API');
    }

    const response = await axios.get<FetchReverseGeocodeResponse>(
      GEOCODING_BASE_URL,
      {
        params: {
          latlng: `${lat},${lon}`,
          key: API_KEY,
          language: 'ko',
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
