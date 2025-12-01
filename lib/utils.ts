import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ClientError } from '@/types/httpClient';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClientError(error: unknown): error is ClientError {
  if (!isAxiosError<Partial<ClientError['response']['data']>>(error)) {
    return false;
  }

  return typeof error.response?.data?.error === 'string';
}

export function extractErrorMessage(
  error: unknown,
  defaultMessage = 'An unexpected error has occurred.',
): string {
  if (isClientError(error)) {
    return error.response.data.error;
  }

  return isAxiosError(error) ? error.message : defaultMessage;
}

export function isValidLatitude(latitude: string | null): boolean {
  if (!latitude || latitude.trim() === '') {
    return false;
  }

  const lat = parseFloat(latitude);

  if (Number.isNaN(lat)) {
    return false;
  }

  if (lat < -90 || lat > 90) {
    return false;
  }

  return true;
}

export function isValidLongitude(longitude: string | null): boolean {
  if (!longitude || longitude.trim() === '') {
    return false;
  }

  const lng = parseFloat(longitude);

  if (Number.isNaN(lng)) {
    return false;
  }

  if (lng < -180 || lng > 180) {
    return false;
  }

  return true;
}

export function getRoundNumber(value: number | undefined, defaultValue = '') {
  return value === undefined ? defaultValue : Math.round(value);
}

function calculateWindChill(temp: number, windSpeed: number): number {
  if (temp > 10 || windSpeed < 1.34) {
    return temp;
  }

  const windKmh = windSpeed * 3.6;
  return (
    13.12 +
    0.6215 * temp -
    11.37 * windKmh ** 0.16 +
    0.3965 * temp * windKmh ** 0.16
  );
}

function calculateHeatIndex(temp: number, humidity: number): number {
  if (temp < 27) return temp;

  const T = temp;
  const RH = humidity;

  let HI = 0.5 * (T + 61.0 + (T - 68.0) * 1.2 + RH * 0.094);

  if (HI >= 80) {
    HI =
      -42.379 +
      2.04901523 * T +
      10.14333127 * RH -
      0.22475541 * T * RH -
      0.00683783 * T * T -
      0.05481717 * RH * RH +
      0.00122874 * T * T * RH +
      0.00085282 * T * RH * RH -
      0.00000199 * T * T * RH * RH;
  }

  return ((HI - 32) * 5) / 9;
}

export function getClothingRecommendations(weather: {
  maxTemp: number;
  minTemp: number;
  humidity: number;
  windSpeed: number;
}): string[] {
  const { maxTemp, minTemp, humidity, windSpeed } = weather;

  const windChillMin = calculateWindChill(minTemp, windSpeed);
  const windChillMax = calculateWindChill(maxTemp, windSpeed);
  const heatIndexMax = calculateHeatIndex(maxTemp, humidity);

  const effectiveMinTemp = Math.min(minTemp, windChillMin);
  const effectiveMaxTemp = Math.max(maxTemp, heatIndexMax, windChillMax);
  const effectiveAvgTemp = (effectiveMinTemp + effectiveMaxTemp) / 2;

  const recommendations: string[] = [];

  if (effectiveMinTemp <= -15) {
    recommendations.push(
      '패딩 점퍼',
      '목도리',
      '장갑',
      '방한모',
      '두꺼운 바지',
      '방한화',
      '히트텍 내의',
    );
  } else if (effectiveMinTemp <= -10) {
    recommendations.push(
      '두꺼운 코트',
      '목도리',
      '장갑',
      '니트 모자',
      '기모 바지',
      '부츠',
      '내의',
    );
  } else if (effectiveMinTemp <= -5) {
    recommendations.push(
      '코트',
      '스웨터',
      '목도리',
      '장갑',
      '긴바지',
      '운동화',
      '얇은 내의',
    );
  } else if (effectiveMinTemp <= 0) {
    recommendations.push('두꺼운 자켓', '니트', '목도리', '긴바지', '운동화');
  } else if (effectiveAvgTemp <= 5) {
    recommendations.push('자켓', '스웨터', '긴바지', '운동화');
  } else if (effectiveAvgTemp <= 10) {
    recommendations.push('가디건', '긴팔 셔츠', '긴바지', '운동화');
  } else if (effectiveAvgTemp <= 15) {
    recommendations.push('얇은 가디건', '긴팔 티셔츠', '긴바지', '운동화');
  } else if (effectiveAvgTemp <= 20) {
    recommendations.push('긴팔 티셔츠', '얇은 바지', '운동화');
  } else if (effectiveAvgTemp <= 25) {
    recommendations.push('반팔 티셔츠', '얇은 바지', '운동화');
  } else if (effectiveAvgTemp <= 30) {
    recommendations.push('반팔 티셔츠', '반바지', '샌들');
  } else {
    recommendations.push('민소매', '반바지', '샌들', '모자', '선글라스');
  }

  if (humidity >= 70 && effectiveAvgTemp >= 20) {
    const breathableIndex = recommendations.findIndex(
      (item) =>
        item.includes('티셔츠') ||
        item.includes('반팔') ||
        item.includes('민소매'),
    );

    if (breathableIndex !== -1) {
      recommendations[breathableIndex] =
        `통풍이 잘되는 ${recommendations[breathableIndex]}`;
    }
    recommendations.push('흡습속건 소재 의류');
  }

  if (windSpeed >= 7) {
    recommendations.push('바람막이');
    if (!recommendations.some((item) => item.includes('모자'))) {
      recommendations.push('모자');
    }
  }

  if (maxTemp - minTemp >= 10) {
    recommendations.push('레이어링용 가벼운 겉옷');
  }

  return recommendations;
}
