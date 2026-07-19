import Image from "next/image"
import { weeklyWind } from "@/types/weather"

export default function WindDaily({
  dates,
  windDirections,
  windGusts,
}: {
    dates: string[],
    windDirections: number[],
    windGusts: number[],
}) {
  const data = (() => {
    const l1 = dates.length
    const l2 = windDirections.length
    const l3 = windGusts.length
    const l = Math.min(Math.min(l1, l2), l3)
    const d: weeklyWind[] = []
    for (let i = 0; i < l; i++) {
      d.push({date: dates[i], windDirection: windDirections[i], windGust: windGusts[i]})
    }
    return d;
  })()


  return (
    <div className="box-border flex flex-col py-2">
      <div className="mx-2 font-bold pb-2">Wind This Week - Gusts (North Up)</div>
      <div className="flex mx-2 flex-col md:h-29 h-88 overflow-scroll no-scrollbar gap-3 snap-y">
        {
          data.map((d, index) => {
            return (
              <div key={index} className="flex flex-row gap-4 items-center justify-between">
                <div className="flex-1.5 ">{d.date}</div>
                <div className="flex-1 flex flex-row items-end bg-white border-t border-b h-4" style={{background : `linear-gradient(to top, #4DD0E1,  #16A085 ${Math.max(0, Math.min(90, d.windGust-2))}%, #16A085 ${Math.max(5, Math.min(95, d.windGust-5))}%, white ${Math.min(99, d.windGust+10)}%,white)`}}>
                </div>
                <div className="flex-1 text-right">{d.windGust} kph</div>
                <div className="relative rounded-[50%] w-10 h-10 overflow-hidden">
                  <Image
                    src="/direction.png"
                    fill
                    sizes="60px"
                    alt="water drop"
                    className="object-contain object-center"
                    style={{rotate: `${d.windDirection}deg`}}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )

}
