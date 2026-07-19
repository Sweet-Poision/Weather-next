import Image from "next/image"
import { weeklyCondition } from "@/types/weather"
import { weatherImageMap } from "@/types/weather"

export default function ConditionDaily({
  dates,
  conditions,
  highs,
  lows
}: {
    dates: string[],
    conditions: number[],
    highs: number[],
    lows: number[]
}) {

  const minTemp = Math.min(...lows)
  const maxTemp = Math.max(...highs)

  const data = (() => {
    const l1 = dates.length
    const l2 = conditions.length
    const l3 = highs.length
    const l4 = lows.length
    const l = Math.min(Math.min(l1, l2), Math.min(l3, l4))
    const d: weeklyCondition[] = []
    for (let i = 0; i < l; i++) {
      d.push({date: dates[i], condition: conditions[i], low: lows[i], high: highs[i]})
    }
    return d;
  })()


  return (
    <div className="box-border flex flex-col py-2">
      <div className="mx-2">Days conditions (°C)</div>
      <div className="flex mx-2 md:h-28 h-68 flex-col overflow-scroll no-scrollbar gap-2 snap-y">
        {
          data.map((d, index) => {
            const total = maxTemp - minTemp;
            const barWidthPercent = (((d.high - d.low) * 100) / total);
            const barOffsetPercent = (((d.low - minTemp) * 100) / total);
            return (
              <div key={index} className="flex flex-row items-center justify-between">
                <div>{d.date}</div>
                <div className="m-auto relative w-8 h-8 rounded-[50%] overflow-hidden"><Image src={weatherImageMap[d.condition]} fill alt="condition" sizes="30px" className="object-contain object-center"/></div>
                <div>{Math.round(d.low)}°</div>
                <div className="w-25 px-2">
                  <div className="w-full rounded-2xl mb-0.5 bg-gray-600 h-3 relative">
                    <div className="h-full bg-amber-500 rounded-2xl absolute" style={{
                      width: `${barWidthPercent}%`,
                      left: `${barOffsetPercent}%`
                    }}></div>
                  </div>
                </div>
                <div>{Math.round(d.high)}°</div>
              </div>
            );
          })
        }
      </div>
    </div>
  )

}
