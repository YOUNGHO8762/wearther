import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';

import { extractErrorMessage } from './utils';

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
  return createErrorResponse(`${serviceName} 키가 설정되지 않았습니다.`, 401);
}

export function createServerErrorResponse(
  message: string = DEFAULT_SERVER_ERROR_MESSAGE,
) {
  return createErrorResponse(message, 500);
}

export function createCatchErrorResponse(error: unknown) {
  if (isAxiosError(error)) {
    return createErrorResponse(
      error.response?.data.error_message ??
        error.response?.data.message ??
        DEFAULT_SERVER_ERROR_MESSAGE,
      error.response?.status ?? 500,
    );
  }

  return createServerErrorResponse(
    extractErrorMessage(error, DEFAULT_SERVER_ERROR_MESSAGE),
  );
}
