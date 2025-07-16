import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTemperatureForClothing(
  tempMin: number,
  tempMax: number,
): number {
  const month = new Date().getMonth() + 1;
  const hour = new Date().getHours();

  if (month === 12 || month <= 2 || hour >= 22 || hour <= 6) {
    return tempMin;
  }

  if ((month >= 6 && month <= 8) || (hour >= 7 && hour <= 21)) {
    return tempMax;
  }

  return (tempMin + tempMax) / 2;
}

export function getApparentTemperature(
  temp: number,
  humidity: number,
  windSpeed: number,
): number {
  const windKmh = windSpeed * 3.6;

  if (temp <= 10 && windKmh >= 4.8) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * windKmh ** 0.16 +
      0.3965 * temp * windKmh ** 0.16
    );
  }

  if (temp >= 27 && humidity >= 40) {
    const T = temp;
    const R = humidity;

    let heatIndex =
      -8.784695 +
      1.61139411 * T +
      2.338549 * R -
      0.14611605 * T * R -
      0.012308094 * T * T -
      0.016424828 * R * R +
      0.002211732 * T * T * R +
      0.00072546 * T * R * R -
      0.000003582 * T * T * R * R;

    if (heatIndex < 80) {
      heatIndex = 0.5 * (T + 61.0 + (T - 68.0) * 1.2 + R * 0.094);
    }

    return heatIndex;
  }

  if (temp > 10 && temp < 27) {
    let apparentTemp = temp;

    if (humidity > 60) {
      apparentTemp += (humidity - 60) * 0.01;
    }

    if (windKmh > 10) {
      apparentTemp -= (windKmh - 10) * 0.1;
    }

    return apparentTemp;
  }

  return temp;
}

export function getApparelRecommendation(apparentTemp: number): string[] {
  if (apparentTemp >= 28) {
    return ['반팔', '반바지', '얇은 원피스', '얇은 셔츠'];
  }

  if (apparentTemp >= 23) {
    return ['반팔', '얇은 셔츠', '면바지', '얇은 원피스'];
  }

  if (apparentTemp >= 20) {
    return ['긴팔', '얇은 셔츠', '얇은 가디건', '면바지'];
  }

  if (apparentTemp >= 17) {
    return ['긴팔', '얇은 니트', '얇은 자켓', '긴바지'];
  }

  if (apparentTemp >= 12) {
    return ['얇은 자켓', '맨투맨', '후드', '긴바지'];
  }

  if (apparentTemp >= 9) {
    return ['자켓', '가디건', '니트', '긴바지'];
  }

  if (apparentTemp >= 5) {
    return ['코트', '가죽자켓', '니트', '히트텍', '긴바지'];
  }

  if (apparentTemp >= 0) {
    return ['두꺼운 코트', '목도리', '장갑', '기모제품'];
  }

  if (apparentTemp >= -5) {
    return ['패딩', '목도리', '장갑', '내복', '모자'];
  }

  return ['두꺼운 패딩', '목도리', '장갑', '내복', '모자', '부츠'];
}

export function getHealthRiskLevel(apparentTemp: number): {
  level: string;
  description: string;
  recommendation: string;
} {
  if (apparentTemp >= 35) {
    return {
      level: '위험',
      description: '열사병 위험',
      recommendation: '실외활동 금지, 시원한 곳에서 휴식',
    };
  }

  if (apparentTemp >= 32) {
    return {
      level: '주의',
      description: '열탈진 위험',
      recommendation: '무리한 실외활동 자제, 충분한 수분 섭취',
    };
  }

  if (apparentTemp >= 28) {
    return {
      level: '관심',
      description: '열피로 위험',
      recommendation: '적절한 휴식과 수분 섭취',
    };
  }

  if (apparentTemp <= -25) {
    return {
      level: '위험',
      description: '동상 위험',
      recommendation: '실외활동 금지, 따뜻한 곳으로 이동',
    };
  }

  if (apparentTemp <= -15) {
    return {
      level: '주의',
      description: '저체온증 위험',
      recommendation: '보온에 주의, 실외활동 최소화',
    };
  }

  if (apparentTemp <= -5) {
    return {
      level: '관심',
      description: '추위 주의',
      recommendation: '적절한 보온 의류 착용',
    };
  }

  return {
    level: '양호',
    description: '적정 온도',
    recommendation: '일상 활동 가능',
  };
}

export function extractErrorMessage(
  error: unknown,
  defaultMessage: string = '오류가 발생했습니다.',
): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return defaultMessage;
}
