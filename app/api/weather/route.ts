import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { FetchWeatherResponse } from '@/types/weather';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
      return createParamsErrorResponse(['위도', '경도']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Weather API');
    }

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get<FetchWeatherResponse['current']>(
        `${WEATHER_BASE_URL}/weather`,
        {
          params: {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            appid: API_KEY,
            units: 'metric',
            lang: 'kr',
          },
        },
      ),
      axios.get<FetchWeatherResponse['forecast']>(
        `${WEATHER_BASE_URL}/forecast`,
        {
          params: {
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            appid: API_KEY,
            units: 'metric',
            lang: 'kr',
          },
        },
      ),
    ]);

    return NextResponse.json({
      current: currentWeatherResponse.data,
      forecast: forecastResponse.data,
    });
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
