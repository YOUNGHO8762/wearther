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
import { getClothingRecommendations, getRoundNumber } from '@/lib/utils';

export default function Home() {
  const { geolocation, updateGeolocation } = useGeolocation();
  const weather = useWeather(geolocation);
  const address = useReverseGeocoding(geolocation);

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

  const current = weather?.current;
  const currentWeather = current?.weather[0];
  const todayForecast = weather?.daily[0];

  const weatherData = current &&
    todayForecast && {
      maxTemp: todayForecast.temp.max,
      minTemp: todayForecast.temp.min,
      humidity: current.humidity,
      windSpeed: current.wind_speed,
    };

  const clothingRecommendations =
    weatherData && getClothingRecommendations(weatherData);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>현재 날씨</span>
            {currentWeather?.description && (
              <Badge variant="outline" className="px-2 py-1 text-base">
                {currentWeather.description}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col items-center gap-2">
            <div className="mb-2 size-16">
              {currentWeather?.icon && (
                <Image
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}.png`}
                  alt=""
                  width={64}
                  height={64}
                />
              )}
            </div>
            <p className="text-3xl font-bold" aria-label="현재 온도">
              {getRoundNumber(weather?.current.temp)}°C
            </p>
            <p
              className="text-center text-sm text-gray-500"
              aria-label="오늘의 최저 최고 온도"
            >
              (최저 {getRoundNumber(todayForecast?.temp.min)}° / 최고{' '}
              {getRoundNumber(todayForecast?.temp.max)}°)
            </p>
            <p className="text-sm text-gray-700">
              체감온도 : {getRoundNumber(weather?.current.feels_like)}°C
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
            <p className="text-sm">습도 : {current?.humidity}%</p>
            <p className="text-sm">풍속 : {current?.wind_speed} m/s</p>
            <ul className="flex flex-wrap gap-1" aria-label="옷차림 추천">
              {clothingRecommendations?.map((item) => (
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
