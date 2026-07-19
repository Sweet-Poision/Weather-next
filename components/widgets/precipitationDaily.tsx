import Image from "next/image"
import { weeklyPrecipitation } from "@/types/weather"

export default function PrecipitationDaily({
  dates,
  precipitationPercentages,
  precipitationSums,
}: {
    dates: string[],
    precipitationPercentages: number[],
    precipitationSums: number[],
}) {
  const data = (() => {
    const l1 = dates.length
    const l2 = precipitationSums.length
    const l3 = precipitationPercentages.length
    const l = Math.min(Math.min(l1, l2), l3)
    const d: weeklyPrecipitation[] = []
    for (let i = 0; i < l; i++) {
      d.push({date: dates[i], precipitationProbability: precipitationPercentages[i], precipitationSum: precipitationSums[i]})
    }
    return d;
  })()


  return (
    <div className="box-border flex flex-col py-2">
      <div className="mx-2">Precipitaion Weekly</div>
      <div className="flex mx-2 flex-col md:h-25 h-60 overflow-scroll no-scrollbar gap-3 snap-y">
        {
          data.map((d, index) => {
            return (
              <div key={index} className="flex flex-row gap-4 items-center justify-between">
                <div className="flex-1.5 ">{d.date}</div>
                <div className="flex-1 flex flex-row items-end border bg-white border-t-0 h-4 rounded-b-[5px]">
                  <div className="w-full bg-cyan-600" style={{height : `${d.precipitationProbability}%`}}></div>
                </div>
                <div className="flex-1 text-right">{d.precipitationSum} mm</div>
                <div className="flex-1 flex flex-row gap-2">
                  <div className="relative rounded-[50%] w-5 h-5 overflow-hidden">
                    <Image
                      src="/droplet.png"
                      fill
                      sizes="40px"
                      alt="water drop"
                      className="object-contain object-center"
                    />
                  </div>
                  <div>{d.precipitationProbability}%</div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )

}
