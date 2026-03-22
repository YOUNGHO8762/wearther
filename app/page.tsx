'use client';

import { overlay } from 'overlay-kit';
import { Suspense, useCallback } from 'react';

import AddressSearchDialog from '@/components/AddressSearchDialog';
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
  useErrorToast(error);

  const handleAddressSearchClick = useCallback(async () => {
    const selectedGeolocation = await overlay.openAsync<
      Geolocation | undefined
    >(({ isOpen, close, unmount }) => (
      <AddressSearchDialog
        isOpen={isOpen}
        close={(geolocation?: Geolocation) => close(geolocation)}
        onExit={unmount}
      />
    ));

    if (!selectedGeolocation) {
      return;
    }

    updateGeolocation(selectedGeolocation);
  }, [updateGeolocation]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      {isLoading ? (
        <WeatherCardSkeleton label="위치 정보 불러오는 중" />
      ) : (
        <Suspense
          fallback={<WeatherCardSkeleton label="날씨 정보 불러오는 중" />}
        >
          <WeatherCard
            geolocation={geolocation ?? DEFAULT_LOCATION}
            onAddressSearchClick={handleAddressSearchClick}
          />
        </Suspense>
      )}
    </main>
  );
}
