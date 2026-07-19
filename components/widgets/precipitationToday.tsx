import { dailyPrecipitation } from "@/types/weather"

export default function PrecipitationToday({
  time,
  times,
  precipitations,
}: {
  time : string,
  times : string[],
  precipitations : number[],
  }) {

    const data = (() => {
      const l = Math.min(times.length, precipitations.length);

      const currentTime: string = time; // e.g. "2026-07-18T23:15", local to the searched place
      const currentHourPrefix = currentTime.slice(0, 13); // "2026-07-18T23"

      let startIndex = times.findIndex((t) => t.slice(0, 13) === currentHourPrefix);
      if (startIndex === -1) startIndex = 0;

      const d: dailyPrecipitation[] = [];
      const endIndex = Math.min(startIndex + 24, l);
      for (let i = startIndex; i < endIndex; i++) {
        d.push({ time: times[i], precipitation: precipitations[i] });
      }
      return d;
    })();

  return (
    <div className="box-border py-2">
      <div className="mx-2">Precipitation</div>
      <div className="flex mx-2 flex-row  overflow-scroll no-scrollbar items-center gap-6 snap-x snap-mandatory">
        {
          data.map((d, index) => {
            return (
              <div key={index} className="flex flex-col gap-2 w-24 snap-start">
                <div className="m-auto">{d.time.slice(-5)}</div>
                <div className="m-auto flex flex-row items-end w-6 h-10 bg-white overflow-hidden border border-t-0 rounded-b-[5px]">
                  <div className="w-full bg-cyan-600" style={{height : `${d.precipitation}%`}}></div>
                </div>
                <div className="m-auto">{d.precipitation}%</div>
              </div>
            );
          })
          }
      </div>
    </div>
  )
}
