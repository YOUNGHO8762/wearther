import { useState, useEffect } from 'react';

import type { Geolocation } from '@/types/geolocation';

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setIsError(true);
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setIsError(false);
    };

    const handleError = () => {
      setIsError(true);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { geolocation, isError };
};

export default useGeolocation;
