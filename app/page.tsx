'use client';

import dayjs from 'dayjs';
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

  const { current, forecast } = weather;

  const temps = [...forecast.map((item) => item.main.temp), current.main.temp];
  const tempMin = Math.min(...temps);
  const tempMax = Math.max(...temps);

  const tempForClothing = getTemperatureForClothing(tempMin, tempMax);
  const apparentTemp = getApparentTemperature(
    tempForClothing,
    current.main.humidity,
    current.wind.speed,
  );
  const apparelRecommendation = getApparelRecommendation(apparentTemp);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>현재 날씨</span>
            <Badge variant="outline" className="px-2 py-1 text-base">
              {current.weather.description}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${current.weather.icon}.png`}
              alt="weather icon"
              width={64}
              height={64}
              className="mb-2"
            />
            <div className="text-3xl font-bold">
              {Math.round(current.main.temp)}°C
            </div>
            <div className="text-center text-sm text-gray-500">
              {dayjs(forecast[0].dt_txt).format('HH')}시 이후 오늘
              <br /> (최저 {Math.round(tempMin)}° / 최고 {Math.round(tempMax)}°)
            </div>
            <div className="text-sm text-gray-700">
              체감온도: {Math.round(current.main.feels_like)}°C
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-1">
            <div className="text-sm">
              습도:{' '}
              <span className="font-medium">{current.main.humidity}%</span>
            </div>
            <div className="text-sm">
              풍속:{' '}
              <span className="font-medium">{current.wind.speed} m/s</span>
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
