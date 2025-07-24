import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import {
  createAPIKeyErrorResponse,
  createCatchErrorResponse,
  createParamsErrorResponse,
} from '@/lib/serverUtils';
import { FetchAddressSearchResponse } from '@/types/address';

const PLACES_AUTOCOMPLETE_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json';
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
      components: 'country:kr',
    };

    const response = await axios.get<FetchAddressSearchResponse>(
      PLACES_AUTOCOMPLETE_URL,
      { params },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return createCatchErrorResponse(error);
  }
}
