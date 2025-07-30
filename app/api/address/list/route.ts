import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { PLACE_AUTOCOMPLETE_URL } from '@/services/api/endpoint';
import { mapHttpClient } from '@/services/api/httpClient';
import { FetchAddressSearchResponse } from '@/types/address';

const API_KEY = process.env.MAP_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');

    if (!input) {
      return createParamsErrorResponse(['검색어']);
    }

    if (!API_KEY) {
      return createAPIKeyErrorResponse('Map API');
    }

    const params = {
      input,
      key: API_KEY,
      language: 'ko',
      types: 'geocode',
    };

    const response = await mapHttpClient.get<FetchAddressSearchResponse>(
      PLACE_AUTOCOMPLETE_URL,
      { params },
    );

    return NextResponse.json(response);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
