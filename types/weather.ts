export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface ForecastWeather {
  clouds: {
    all: number;
  };
  dt: number;
  dt_txt: string;
  main: Main;
}

export interface FetchWeatherResponse {
  current: {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      message: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    id: number;
    name: string;
    cod: number;
  };
  forecast: {
    city: {
      coord: {
        lon: number;
        lat: number;
      };
      country: string;
      id: number;
      name: string;
      population: number;
      sunrise: number;
      sunset: number;
      timezone: number;
    };
    cnt: number;
    cod: string;
    list: ForecastWeather[];
    pop: number;
    sys: {
      pod: string;
    };
    visibility: number;
    wind: Wind;
    weather: Weather[];
    message: number;
  };
}

export interface WeatherState {
  current: {
    main: Main;
    weather: Weather;
    wind: Wind;
  };
  forecast: ForecastWeather[];
}
