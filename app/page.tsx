'use client';

import Image from 'next/image';

import useGeolocation from '@/hooks/useGeolocation';
import { useReverseGeocoding } from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';

export default function Home() {
  const geolocation = useGeolocation();
  const weather = useWeather(geolocation);
  const address = useReverseGeocoding(geolocation);

  if (!weather || !address) {
    return null;
  }

  return (
    <div>
      <h1>{weather.main.temp}</h1>
      <h1>{weather.weather.description}</h1>
      <h1>{address}</h1>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather.icon}.png`}
        alt="weather icon"
        width={50}
        height={50}
      />
    </div>
  );
}
