import { weatherCodeMap } from "@/types/weather"

export default function Hero({ cityName, currentTemp, currentCondition, high, low }: { cityName: string, currentTemp: number, currentCondition: number, high: number, low: number }) {
  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <div className="text-2xl">{cityName}</div>
      <div className="text-7xl">{currentTemp}° C</div>
      <div>{weatherCodeMap[currentCondition] ?? ''}</div>
      <div className="flex flex-row gap-10">
        <div>High:{high}° C</div>
        <div>Low:{low}° C</div>
      </div>
    </div>
  )
}
