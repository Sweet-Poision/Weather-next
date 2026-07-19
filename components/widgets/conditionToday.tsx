
import Image from "next/image"

import { weatherImageMap } from "@/types/weather"
import { dailyCondition } from "@/types/weather"

export default function ConditionToday({
  time,
  times,
  temp,
  condition,
}: {
  time : string,
  times : string[],
  temp : number[],
  condition : number[],
  }) {

    const data = (() => {
      const l = Math.min(times.length, temp.length, condition.length);

      const currentTime: string = time; // e.g. "2026-07-18T23:15", local to the searched place
      const currentHourPrefix = currentTime.slice(0, 13); // "2026-07-18T23"

      let startIndex = times.findIndex((t) => t.slice(0, 13) === currentHourPrefix);
      if (startIndex === -1) startIndex = 0;

      const d: dailyCondition[] = [];
      const endIndex = Math.min(startIndex + 24, l);
      for (let i = startIndex; i < endIndex; i++) {
        d.push({ time: times[i], temp: temp[i], condition: condition[i] });
      }
      return d;
    })();

  return (
    <div className="box-border py-2">
      <div className="mx-2 font-bold pb-2">Temperature (°C)</div>
      <div className="flex mx-2 flex-row  overflow-scroll no-scrollbar items-center gap-6 snap-x snap-mandatory">
        {
          data.map((d, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 w-24 snap-start">
                <div className="m-auto">{d.time.slice(-5)}</div>
                <div className="m-auto relative w-8 h-8 rounded-[50%] overflow-hidden"><Image src={weatherImageMap[d.condition]} fill alt="condition" sizes="30px" className="onject-contain object-center"/></div>
                <div className="m-auto">{d.temp}°</div>
              </div>
            );
          })
          }
      </div>
    </div>
  )
}
