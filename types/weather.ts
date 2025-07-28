interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface FetchWeatherResponse {
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: Weather[];
    wind_deg: number;
    wind_speed: number;
  };
  daily: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: {
      day: number;
      eve: number;
      morn: number;
      night: number;
    };
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    summary: string;
    sunrise: number;
    sunset: number;
    temp: {
      day: number;
      eve: number;
      max: number;
      min: number;
      morn: number;
      night: number;
    };
    uvi: number;
    weather: Weather[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  }[];
}
