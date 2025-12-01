import { useState, useEffect, useCallback } from 'react';

import type { Geolocation } from '@/types/geolocation';

class CustomGeoLocationError extends Error {
  code: number;

  constructor({ code, message }: { message: string; code: number }) {
    super(message);
    this.name = 'CustomGeoLocationError';
    this.code = code;
  }
}

interface GeolocationState {
  geolocation: Geolocation | null;
  isLoading: boolean;
  error: CustomGeoLocationError | null;
}

export default function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    geolocation: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const { geolocation } = navigator;

    const checkGeolocationSupport = () => {
      if (typeof window === 'undefined' || geolocation === undefined) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: new CustomGeoLocationError({
            code: 0,
            message: 'Geolocation is not supported by this environment.',
          }),
        }));

        return false;
      }

      return true;
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { coords } = position;

      setState((prev) => ({
        ...prev,
        geolocation: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        isLoading: false,
      }));
    };

    const handleError = (error: GeolocationPositionError) => {
      const { code, message } = error;

      setState((prev) => ({
        ...prev,
        error: new CustomGeoLocationError({
          code,
          message,
        }),
        isLoading: false,
      }));
    };

    if (!checkGeolocationSupport()) {
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const updateGeolocation = useCallback((geolocation: Geolocation) => {
    setState((prev) => ({ ...prev, geolocation }));
  }, []);

  return { ...state, updateGeolocation };
}
