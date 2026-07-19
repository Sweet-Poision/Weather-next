'use client'

import { useEffect} from 'react'
import Image from 'next/image'
import Input from '@/components/input'
import { LocationResult } from '@/types/location';
import { useWeather } from '@/context/weather-context';
import { reverseGeocode } from '@/utils';

export default function Navbar() {

  const searchHeightPixels = 40
  const { location, setLocation, setWeatherInfo } = useWeather()

  const handleLocationSelect = (location: LocationResult) => {
    console.log('Selected location:', location);
    setLocation(location)
  };

  useEffect(() => {
    let cancelled = false

    const applyFallback = async () => {
      try {
        const placeName = await reverseGeocode(location.lat, location.lng)
        setLocation({ description: placeName, lat: location.lat, lng: location.lng })
      } catch (e) {
        console.error('Reverse geocode failed for fallback:', e)
      }
      getWeather(location.lat, location.lng)
    }

    if (!navigator.geolocation) {
      console.error('Geolocation not supported by this browser')
      applyFallback()
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const placeName = await reverseGeocode(latitude, longitude)
        if (!cancelled) {
          setLocation({ description: placeName, lat: latitude, lng: longitude })
        }
        getWeather(latitude, longitude)
      },
      (err) => {
        console.error('Geolocation error:', err.code, err.message)
        applyFallback()
      }
    )

    return () => { cancelled = true }
  }, [])



  async function fetchFullWeather(lat: number, lng: number) {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      timezone: 'auto',
      forecast_days: '7',
      current: [
        'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
        'is_day', 'precipitation', 'rain', 'showers', 'snowfall',
        'weather_code', 'cloud_cover', 'pressure_msl', 'surface_pressure',
        'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m',
      ].join(','),
      hourly: [
        'temperature_2m', 'relative_humidity_2m', 'dew_point_2m',
        'apparent_temperature', 'precipitation_probability', 'precipitation',
        'weather_code', 'pressure_msl', 'cloud_cover', 'visibility',
        'wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m', 'uv_index',
      ].join(','),
      daily: [
        'weather_code', 'temperature_2m_max', 'temperature_2m_min',
        'apparent_temperature_max', 'apparent_temperature_min', 'sunrise',
        'sunset', 'daylight_duration', 'uv_index_max', 'precipitation_sum',
        'precipitation_probability_max', 'wind_speed_10m_max',
        'wind_gusts_10m_max', 'wind_direction_10m_dominant',
      ].join(','),
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!res.ok) throw new Error('Weather fetch failed');
    return res.json();
  }

  async function getWeather(lat: number = location.lat, lng: number = location.lng) {
    try {
      const res = await fetchFullWeather(lat, lng)
      setWeatherInfo(res)
      console.log(res)
    } catch (err) {
      console.error('Failed to fetch weather: ', err);
    }
  }

  return (
    <nav className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between mx-3 mt-3 items-center pb-4">
      <div className="flex flex-row items-center gap-3">
        <div className="relative w-15 h-16">
          <Image
            src="/weather-icon.png"
            fill
            sizes="64px"
            alt="Weather Icon"
            className="object-contain object-center"
            />
        </div>
        <div className="text-4xl font-bold text-blue-900">
          Weath<span className="text-5xl font-normal text-amber-500">e</span>r
        </div>
      </div>

      <div className="flex flex-row items-center border h-fit rounded-2xl border-gray-200">
        <div>
          <Input height={searchHeightPixels} onLocationSelect={handleLocationSelect} />
        </div>
        <div>
          <button
            className="flex flex-row items-center gap-2 bg-amber-400 hover:bg-amber-500 py-2 px-3 rounded-br-2xl rounded-tr-2xl pr-7 transition-all"
            onClick={() => getWeather()}
          >
            <div className="relative" style={{ height: `${searchHeightPixels - 10}px`, aspectRatio: 1 / 1 }}>
              <Image
                src="/search.png"
                fill
                sizes="64px"
                alt="Serach icon"
                className="object-contain object-center"
              />
            </div>
            <div className="font-mono">
              Search
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
