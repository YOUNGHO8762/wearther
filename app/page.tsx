'use client';

import { Info, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { overlay } from 'overlay-kit';

import AddressSearchDialog from '@/components/AddressSearchDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import useGeolocation from '@/hooks/useGeolocation';
import useReverseGeocoding from '@/hooks/useReverseGeocoding';
import useWeather from '@/hooks/useWeather';
import {
  getApparelRecommendation,
  getApparentTemperature,
  getTemperatureForClothing,
} from '@/lib/utils';

export default function Home() {
  const { geolocation, handleSetGeolocation } = useGeolocation();
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
              <p className="flex items-center justify-center">
                <HoverCard>
                  <HoverCardTrigger asChild tabIndex={0}>
                    <Info className="mr-1 inline h-4 w-4 text-gray-500" />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">
                        예보 데이터 안내
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        3시간 단위 예보 데이터를 기반으로 계산됩니다. 실제
                        온도와 차이가 있을 수 있습니다.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                현재부터 오늘의
              </p>
              (최저 {Math.round(tempMin)}° / 최고 {Math.round(tempMax)}°)
            </div>
            <div className="text-sm text-gray-700">
              체감온도: {Math.round(current.main.feels_like)}°C
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{address}</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                overlay.open(({ isOpen, close, unmount }) => (
                  <AddressSearchDialog
                    isOpen={isOpen}
                    close={close}
                    onExit={unmount}
                    handleSetGeolocation={handleSetGeolocation}
                  />
                ));
              }}
              aria-label="위치 변경"
            >
              <Search className="h-3.5 w-3.5" />
              위치 변경
            </Button>
            <p className="text-sm">습도 : {current.main.humidity}%</p>
            <p className="text-sm">풍속 : {current.wind.speed} m/s</p>
            <div className="flex flex-wrap gap-1">
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
