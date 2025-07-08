import { Weather, Main, Wind } from '@/types/weather/weatherResponse';

export interface WeatherState {
  main: Main;
  weather: Weather;
  wind: Wind;
}
