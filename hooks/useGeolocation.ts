import { useState, useEffect } from 'react';

import type { Geolocation } from '@/types/geolocation';

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  return geolocation;
};

export default useGeolocation;
