'use client';

import { overlay } from 'overlay-kit';
import { Suspense } from 'react';

import AddressSearchDialog from '@/components/AddressSearchDialog';
import WeatherCard from '@/components/WeatherCard';
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

  const handleAddressSearchClick = async () => {
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
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      {!isLoading && (
        <Suspense fallback={null}>
          <WeatherCard
            geolocation={geolocation ?? DEFAULT_LOCATION}
            onAddressSearchClick={handleAddressSearchClick}
          />
        </Suspense>
      )}
    </div>
  );
}
