import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';

import { extractErrorMessage } from '@/lib/utils';
import { GoogleMapsStatus } from '@/types/googleMaps';
import { ServerError } from '@/types/httpClient';

const DEFAULT_SERVER_ERROR_MESSAGE = '서버 내부 오류가 발생했습니다.';

export function createErrorResponse(
  errorMessage: string,
  statusCode: number,
): NextResponse {
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}

export function createParamsErrorResponse(
  paramsName?: string | string[],
): NextResponse {
  const paramNames = Array.isArray(paramsName)
    ? paramsName.join(', ')
    : (paramsName ?? '');

  const message = paramNames
    ? `${paramNames} 파라미터가 필요합니다.`
    : '파라미터가 필요합니다.';

  return createErrorResponse(message, 400);
}

export function createAPIKeyErrorResponse(serviceName = 'API'): NextResponse {
  return createErrorResponse(`${serviceName} 키가 설정되지 않았습니다.`, 500);
}

export function createServerErrorResponse(
  message: string = DEFAULT_SERVER_ERROR_MESSAGE,
) {
  return createErrorResponse(message, 500);
}

export function isServerError(error: unknown): error is ServerError {
  if (!isAxiosError<Partial<ServerError['response']['data']>>(error)) {
    return false;
  }

  return (
    typeof error.response?.data?.error_message === 'string' ||
    typeof error.response?.data?.message === 'string'
  );
}

const GOOGLE_MAPS_STATUS_TO_HTTP: Record<
  Exclude<GoogleMapsStatus, 'OK' | 'ZERO_RESULTS'>,
  number
> = {
  INVALID_REQUEST: 400,
  REQUEST_DENIED: 500,
  NOT_FOUND: 404,
  OVER_QUERY_LIMIT: 429,
  OVER_DAILY_LIMIT: 429,
  UNKNOWN_ERROR: 500,
};

export function createGoogleMapsErrorResponse(response: {
  status: GoogleMapsStatus;
  error_message?: string;
}): NextResponse | null {
  if (response.status === 'OK' || response.status === 'ZERO_RESULTS') {
    return null;
  }

  return createErrorResponse(
    response.error_message ?? `Google Maps API 오류: ${response.status}`,
    GOOGLE_MAPS_STATUS_TO_HTTP[response.status] ?? 500,
  );
}

export function createCatchErrorResponse(error: unknown) {
  if (isServerError(error)) {
    return createErrorResponse(
      error.response.data.error_message ??
        error.response.data.message ??
        DEFAULT_SERVER_ERROR_MESSAGE,
      error.response.status ?? 500,
    );
  }
  return createServerErrorResponse(
    extractErrorMessage(error, DEFAULT_SERVER_ERROR_MESSAGE),
  );
}
