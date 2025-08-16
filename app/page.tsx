'use client';

import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';

import AddressSearchDialog from '@/components/AddressSearchDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGeolocation from '@/hooks/useGeolocation';
import useReverseGeocoding from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';
import {
  getApparelRecommendation,
  getApparentTemperature,
  getTemperatureForClothing,
} from '@/lib/utils';

export default function Home() {
  const { geolocation, updateGeolocation } = useGeolocation();
  const weather = useWeather(geolocation);
  const address = useReverseGeocoding(geolocation);

  if (!weather || !address) {
    return null;
  }

  const handleOpenAddressClick = () => {
    overlay.open(({ isOpen, close, unmount }) => (
      <AddressSearchDialog
        isOpen={isOpen}
        close={close}
        onExit={unmount}
        updateGeolocation={updateGeolocation}
      />
    ));
  };

  const currentWeather = weather.current;
  const todayForecast = weather.daily[0];

  const tempForClothing = getTemperatureForClothing(
    todayForecast.temp.min,
    todayForecast.temp.max,
  );
  const apparentTemp = getApparentTemperature(
    tempForClothing,
    currentWeather.humidity,
    currentWeather.wind_speed,
  );
  const apparelRecommendation = getApparelRecommendation(apparentTemp);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>현재 날씨</span>
            <Badge variant="outline" className="px-2 py-1 text-base">
              {currentWeather.weather[0].description}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Image
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              alt="weather icon"
              width={64}
              height={64}
              className="mb-2"
            />
            <p className="text-3xl font-bold" aria-label="현재 온도">
              {Math.round(weather.current.temp)}°C
            </p>
            <p
              className="text-center text-sm text-gray-500"
              aria-label="오늘의 최저 최고 온도"
            >
              (최저 {Math.round(todayForecast.temp.min)}° / 최고{' '}
              {Math.round(todayForecast.temp.max)}°)
            </p>
            <p className="text-sm text-gray-700">
              체감온도 : {Math.round(weather.current.feels_like)}°C
            </p>
          </div>
          <div className="space-y-1">
            <div
              className="flex items-center justify-between"
              aria-label="위치"
            >
              <p className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{address}</span>
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleOpenAddressClick}
              aria-haspopup="dialog"
            >
              <Search className="h-3.5 w-3.5" />
              위치 변경
            </Button>
            <p className="text-sm">습도 : {currentWeather.humidity}%</p>
            <p className="text-sm">풍속 : {currentWeather.wind_speed} m/s</p>
            <ul className="flex flex-wrap gap-1" aria-label="옷차림 추천">
              {apparelRecommendation.map((item) => (
                <Badge key={item} variant="secondary" asChild>
                  <li>{item}</li>
                </Badge>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
