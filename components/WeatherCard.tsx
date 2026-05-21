'use client';

import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';

import AddressSearchDialog from '@/components/AddressSearchDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useIsMounted from '@/hooks/useIsMounted';
import useReverseGeocoding from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';
import { getClothingRecommendations } from '@/lib/utils';
import { Geolocation } from '@/types/geolocation';

interface Props {
  geolocation: Geolocation;
  onSelectAddress: (geolocation: Geolocation) => void;
}

export default function WeatherCard({ geolocation, onSelectAddress }: Props) {
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

  const isMounted = useIsMounted();

  const clothingRecommendations = getClothingRecommendations({
    maxTemp: todayTemp.max,
    minTemp: todayTemp.min,
    humidity,
    windSpeed,
  });

  return (
    <Card className="w-full max-w-[350px] shadow-xl">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isMounted && '날씨 및 위치 정보를 불러왔습니다'}
      </div>
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
              aria-hidden
              width={64}
              height={64}
              priority
            />
          </div>
          <p className="text-3xl font-bold" aria-label="현재 온도">
            {Math.round(temp)}°C
          </p>
          <p
            className="text-center text-sm text-gray-500"
            aria-label="오늘의 최저 최고 온도"
          >
            (최저 {Math.round(todayTemp.min)}°C / 최고{' '}
            {Math.round(todayTemp.max)}°C)
          </p>
          <p className="text-sm text-gray-700">
            체감온도 : {Math.round(feelsLike)}°C
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{address}</span>
            </p>
          </div>
          <AddressSearchDialog onSelect={onSelectAddress}>
            <Button type="button" variant="outline" size="sm">
              <Search className="h-3.5 w-3.5" />
              위치 변경
            </Button>
          </AddressSearchDialog>
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
