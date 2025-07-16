import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import type { Geolocation } from '@/types/geolocation';

const DEFAULT_LOCATION: Geolocation = {
  latitude: 37.552987017,
  longitude: 126.972591728,
};

const getErrorMessage = (error: GeolocationPositionError): string => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return '위치 정보 접근이 거부되었습니다.';
    case error.POSITION_UNAVAILABLE:
      return '위치 정보를 사용할 수 없습니다.';
    case error.TIMEOUT:
      return '위치 정보 요청 시간이 초과되었습니다.';
    default:
      return '위치 정보를 가져오는 데 실패했습니다.';
  }
};

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      toast.error('위치 정보 기능을 지원하지 않는 브라우저입니다.');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      toast.error(getErrorMessage(error));
      setGeolocation(DEFAULT_LOCATION);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return geolocation;
};

export default useGeolocation;
