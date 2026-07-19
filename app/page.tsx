'use client'
import Image from "next/image";
import { useWeather } from "@/context/weather-context"
import Hero from "@/components/widgets/hero"
import ConditionToday from "@/components/widgets/conditionToday";
import ConditionDaily from "@/components/widgets/conditionDaily";
import PrecipitationToday from "@/components/widgets/precipitationToday";
import PrecipitationDaily from "@/components/widgets/precipitationDaily";
import WindToday from "@/components/widgets/windToday";
import WindDaily from "@/components/widgets/windDaily";

export default function Home() {
  const { weatherInfo, location } = useWeather();


  if (!weatherInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-black">
        <div className="relative w-50 h-50">
          <Image
            src="/loading.svg"
            fill
            sizes="256px"
            alt="Loading weather"
          />
        </div>
        <div className="text-sm text-gray-500">Fetching weather…</div>
      </div>
    );
    }
  return (
    <div className="max-w-[2000px] mx-auto mt-30 w-100 md:w-180 xl:w-300 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="col-span-1  md:col-span-2 xl:col-span-3 min-h-10">
          <Hero cityName={location.description} currentTemp={weatherInfo.current.temperature_2m} currentCondition={ weatherInfo.current.weather_code } high={ weatherInfo.daily.temperature_2m_max[0]} low={ weatherInfo.daily.temperature_2m_min[0]} />
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <ConditionToday time={weatherInfo.current.time} times={weatherInfo.hourly.time} temp={weatherInfo.hourly.temperature_2m} condition={weatherInfo.hourly.weather_code} />
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <ConditionDaily dates={weatherInfo.daily.time} conditions={weatherInfo.daily.weather_code} highs={weatherInfo.daily.temperature_2m_max} lows={weatherInfo.daily.temperature_2m_min}/>
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <PrecipitationToday time={weatherInfo.current.time} times={weatherInfo.hourly.time} precipitations={weatherInfo.hourly.precipitation_probability} />
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <PrecipitationDaily dates={weatherInfo.daily.time} precipitationPercentages={weatherInfo.daily.precipitation_probability_max} precipitationSums={weatherInfo.daily.precipitation_sum}/>
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <WindToday time={weatherInfo.current.time} times={weatherInfo.hourly.time} windGusts={weatherInfo.hourly.wind_gusts_10m} />
        </div>
        <div className="border p-5 rounded-xl min-h-36">
          <WindDaily dates={weatherInfo.daily.time} windDirections={weatherInfo.daily.wind_direction_10m_dominant} windGusts={weatherInfo.daily.wind_gusts_10m_max}/>
        </div>
      </div>
    </div>
  )
}
