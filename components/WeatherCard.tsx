'use client';

import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useReverseGeocoding from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';
import { getClothingRecommendations, getRoundNumber } from '@/lib/utils';
import { Geolocation } from '@/types/geolocation';

interface Props {
  geolocation: Geolocation;
  onAddressSearchClick: () => void;
}

export default function WeatherCard({
  geolocation,
  onAddressSearchClick,
}: Props) {
  const weather = useWeather(geolocation);
  const address = useReverseGeocoding(geolocation);

  const { current, daily } = weather;
  const {
    weather: weatherInfo,
    temp,
    feels_like: feelsLike,
    humidity,
    wind_speed: windSpeed,
  } = current;
  const currentWeather = weatherInfo[0];
  const { temp: todayTemp } = daily[0];

  const clothingRecommendations = getClothingRecommendations({
    maxTemp: todayTemp.max,
    minTemp: todayTemp.min,
    humidity,
    windSpeed,
  });

  return (
    <Card className="w-[350px] shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>현재 날씨</span>
          <Badge variant="outline" className="text-base">
            {currentWeather.description}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col items-center gap-2">
          <div className="mb-2 size-16">
            <Image
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`}
              alt=""
              width={64}
              height={64}
            />
          </div>
          <p className="text-3xl font-bold" aria-label="현재 온도">
            {getRoundNumber(temp)}°C
          </p>
          <p
            className="text-center text-sm text-gray-500"
            aria-label="오늘의 최저 최고 온도"
          >
            (최저 {getRoundNumber(todayTemp.min)}° / 최고{' '}
            {getRoundNumber(todayTemp.max)}°)
          </p>
          <p className="text-sm text-gray-700">
            체감온도 : {getRoundNumber(feelsLike)}°C
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between" aria-label="위치">
            <p className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{address}</span>
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddressSearchClick}
            aria-haspopup="dialog"
          >
            <Search className="h-3.5 w-3.5" />
            위치 변경
          </Button>
          <p className="text-sm">습도 : {humidity}%</p>
          <p className="text-sm">풍속 : {windSpeed} m/s</p>
          <ul className="flex flex-wrap gap-1" aria-label="옷차림 추천">
            {clothingRecommendations.map((item) => (
              <Badge key={item} variant="secondary" asChild>
                <li>{item}</li>
              </Badge>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
