import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { isValidLatitude, isValidLongitude } from '@/lib/utils';
import { FORECAST_URL, WEATHER_URL } from '@/services/api/endpoint';
import { weatherApiClient } from '@/services/api/httpClient';
import { FetchWeatherResponse } from '@/types/weather';

const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!isValidLatitude(lat) || !isValidLongitude(lon)) {
      return createParamsErrorResponse(['위도', '경도']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Weather API');
    }

    const params = {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    };

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      weatherApiClient.get<FetchWeatherResponse['current']>(WEATHER_URL, {
        params,
      }),
      weatherApiClient.get<FetchWeatherResponse['forecast']>(FORECAST_URL, {
        params,
      }),
    ]);

    return NextResponse.json({
      current: currentWeatherResponse,
      forecast: forecastResponse,
    });
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
