'use client'

import { useState, useRef, useEffect } from 'react'

import { LocationResult, GeocodeApiResult } from '@/types/location'

import { reverseGeocode } from '@/utils';


export default function Input({ height, onLocationSelect }: { height: number; onLocationSelect: (location: LocationResult) => void; }) {

  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState<GeocodeApiResult[]>([]);
  const [isOpen, setIsOpen] = useState(false)
  const [locatingCurrent, setLocatingCurrent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (query: string) => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`
      )
      const json = await res.json()
      setSuggestions(json.results ?? [])
      console.log(json.results[0])
      if(json.results) onLocationSelect({ description: json.results[0].name, lat: json.results[0].latitude, lng: json.results[0].longitude})
    } catch (err) {
      console.error('Geocoding fetch failed', err)
      setSuggestions([])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(newValue), 300);
  }

  const handleSelectSuggestion = (place: GeocodeApiResult) => {
    const description = [place.name, place.admin1, place.country].filter(Boolean).join(', ')
    setValue(description)
    setSuggestions([])
    setIsOpen(false)
    onLocationSelect({ description, lat: place.latitude, lng: place.longitude})
  }

  const handleUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported by this browser')
      return
    }

    setLocatingCurrent(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const placeName = await reverseGeocode(latitude, longitude)
        setValue(placeName);
        onLocationSelect({ description: placeName, lat: latitude, lng: longitude })
        setLocatingCurrent(false)
        setIsOpen(false)
      },
      (err) => {
        console.error('Geolocation error: ', err)
        setLocatingCurrent(false)
      }
    )
  }

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        id="location"
        name="location"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder="search for a city"
        className="rounded-tl-2xl rounded-bl-2xl pl-5 pr-3 max-w-xl min-w-60  bg-amber-50 focus:bg-amber-100 outline-0 transition-all"
        style={{height : `${height+6}px`}}
      />
      {
        isOpen && (
          <ul className="absolute top-full left-0 mt-1 w-full min-w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
            <li
              onClick={handleUserCurrentLocation}
              className="px-4 py-2 text-sm font-medium text-blue-900 hover:bg-amber-50 cursor-pointer flex items-center gap-2 border-b border-gray-100"
            >
              📍 {locatingCurrent ? 'Locating…' : 'Use current location'}
            </li>
            {suggestions.map((place) => (
                <li
                  key={place.id}
                  onClick={() => handleSelectSuggestion(place)}
                  className="px-4 py-2 text-sm hover:bg-amber-50 cursor-pointer"
                >
                {[place.name, place.admin1, place.country].filter(Boolean).join(', ')}
                </li>
              ))
            }
            {value.length >= 2 && suggestions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-400">No matches found</li>
            )}
          </ul>
        )
      }
    </div>
  )
}
