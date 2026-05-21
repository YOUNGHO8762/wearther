'use client';

import { Suspense, useCallback, useTransition } from 'react';

import WeatherCard from '@/components/WeatherCard';
import WeatherCardSkeleton from '@/components/WeatherCardSkeleton';
import useErrorToast from '@/hooks/useErrorToast';
import useGeolocation from '@/hooks/useGeolocation';
import { Geolocation } from '@/types/geolocation';

const DEFAULT_LOCATION: Geolocation = {
  latitude: 37.552987017,
  longitude: 126.972591728,
};

export default function Home() {
  const { geolocation, isLoading, error, updateGeolocation } = useGeolocation();
  const [, startTransition] = useTransition();
  useErrorToast(error);

  const handleSelectAddress = useCallback(
    (geolocation: Geolocation) => {
      startTransition(() => updateGeolocation(geolocation));
    },
    [updateGeolocation],
  );

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="sr-only">Wearther — 온도별 옷차림 추천</h1>
      {isLoading ? (
        <WeatherCardSkeleton label="위치 정보 불러오는 중" />
      ) : (
        <Suspense
          fallback={<WeatherCardSkeleton label="날씨 정보 불러오는 중" />}
        >
          <WeatherCard
            geolocation={geolocation ?? DEFAULT_LOCATION}
            onSelectAddress={handleSelectAddress}
          />
        </Suspense>
      )}
    </main>
  );
}
