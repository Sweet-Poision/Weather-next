// context/weather-context.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { LocationResult } from '@/types/location';
import { WeatherContextType, WeatherData } from '@/types/weather';


const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const hardLat = 12.974645055608574;
const hardLong = 77.74604731367819;

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationResult>({
    description: 'Random Location',
    lat: hardLat,
    lng: hardLong,
  });
  const [weatherInfo, setWeatherInfo] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ location, setLocation, weatherInfo, setWeatherInfo }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
