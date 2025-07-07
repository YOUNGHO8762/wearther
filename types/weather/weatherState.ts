import { Weather, Main } from './weatherResponse';

export interface WeatherState {
  main: Main;
  weather: Weather;
}
