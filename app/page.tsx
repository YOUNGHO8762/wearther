'use client';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>오늘의 날씨</span>
            <Badge variant="outline" className="px-2 py-1 text-base">
              {weather.weather.description}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather.icon}.png`}
              alt="weather icon"
              width={64}
              height={64}
              className="mb-2"
            />
            <div className="text-3xl font-bold">{weather.main.temp}°C</div>
            <div className="text-sm text-gray-500">
              (최저 {weather.main.temp_min}° / 최고 {weather.main.temp_max}°)
            </div>
            <div className="text-sm text-gray-700">
              체감온도: {weather.main.feels_like}°C
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <div className="text-sm">
              습도:{' '}
              <span className="font-medium">{weather.main.humidity}%</span>
            </div>
            <div className="text-sm">
              풍속:{' '}
              <span className="font-medium">{weather.wind.speed} m/s</span>
            </div>
          </div>
          <div className="mb-2">
            <span className="text-sm text-gray-600">위치:</span>
            <span className="ml-2 font-medium">{address}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">추천 옷차림:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {apparelRecommendation.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
