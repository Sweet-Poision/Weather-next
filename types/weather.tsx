import { LocationResult } from "./location";

export type WeatherData = {
  current: Record<string, any>;
  hourly: Record<string, any>;
  daily: Record<string, any>;
};

export type WeatherContextType = {
  location: LocationResult;
  setLocation: (location: LocationResult) => void;
  weatherInfo: WeatherData | null;
  setWeatherInfo: (data: WeatherData | null) => void;
};

export const weatherCodeMap: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const weatherImageMap: Record<number, string> = {
  0: '/conditions/sun.gif',
  1: '/conditions/sun.gif',
  2: '/conditions/cloudy.gif',
  3: '/conditions/clouds.gif',
  45: '/conditions/foggy.gif',
  48: '/conditions/foggy.gif',
  51: '/conditions/drizzle.gif',
  53: '/conditions/drizzle.gif',
  55: '/conditions/drizzle.gif',
  56: '/conditions/drizzle.gif',
  57: '/conditions/drizzle.gif',
  61: '/conditions/rain.gif',
  63: '/conditions/rain.gif',
  65: '/conditions/rain.gif',
  66: '/conditions/rain.gif',
  67: '/conditions/rain.gif',
  71: '/conditions/snow.gif',
  73: '/conditions/snow.gif',
  75: '/conditions/snow.gif',
  77: '/conditions/snow.gif',
  80: '/conditions/rain.gif',
  81: '/conditions/rain.gif',
  82: '/conditions/rain.gif',
  85: '/conditions/snow.gif',
  86: '/conditions/snow.gif',
  95: '/conditions/storm.gif',
  96: '/conditions/storm.gif',
  99: '/conditions/storm.gif',
};

export type dailyCondition = {
  time: string;
  temp: number;
  condition: number;
}

export type weeklyCondition = {
  date: string,
  condition: number,
  low: number,
  high: number,
}
export type dailyPrecipitation = {
  time: string;
  precipitation: number;
}

export type weeklyPrecipitation = {
  date: string,
  precipitationProbability: number,
  precipitationSum: number,
}

export type dailyWindGusts = {
  time: string;
  windGust: number;
}

export type weeklyWind = {
  date: string,
  windDirection: number,
  windGust: number,
}
