'use client';

import Image from 'next/image';

import useGeolocation from '@/hooks/useGeolocation';
import { useReverseGeocoding } from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';
import {
  getApparelRecommendation,
  getApparentTemperature,
  getTemperatureForClothing,
} from '@/lib/utils';

export default function Home() {
  const geolocation = useGeolocation();
  const weather = useWeather(geolocation);
  const address = useReverseGeocoding(geolocation);

  if (!weather || !address) {
    return null;
  }

  const tempForClothing = getTemperatureForClothing(
    weather.main.temp_min,
    weather.main.temp_max,
  );
  const apparentTemp = getApparentTemperature(
    tempForClothing,
    weather.main.humidity,
    weather.wind.speed,
  );
  const apparelRecommendation = getApparelRecommendation(apparentTemp);

  return (
    <div>
      <h1>현재 온도: {weather.main.temp}°C</h1>
      <h2>날씨: {weather.weather.description}</h2>
      <h2>위치: {address}</h2>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather.icon}.png`}
        alt="weather icon"
        width={50}
        height={50}
      />
      <h2>추천 옷차림: {apparelRecommendation.join(', ')}</h2>
    </div>
  );
}
