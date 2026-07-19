import { dailyWindGusts } from "@/types/weather"

export default function WindToday({
  time,
  times,
  windGusts,
}: {
  time : string,
  times : string[],
  windGusts : number[],
  }) {

    const data = (() => {
      const l = Math.min(times.length, windGusts.length);

      const currentTime: string = time; // e.g. "2026-07-18T23:15", local to the searched place
      const currentHourPrefix = currentTime.slice(0, 13); // "2026-07-18T23"

      let startIndex = times.findIndex((t) => t.slice(0, 13) === currentHourPrefix);
      if (startIndex === -1) startIndex = 0;

      const d: dailyWindGusts[] = [];
      const endIndex = Math.min(startIndex + 24, l);
      for (let i = startIndex; i < endIndex; i++) {
        d.push({ time: times[i], windGust : windGusts[i] });
      }
      return d;
    })();

  return (
    <div className="box-border py-2">
      <div className="mx-2">Wind - Speed (kph) - Gusts</div>
      <div className="flex mx-2 flex-row  overflow-scroll no-scrollbar items-center gap-3 snap-x snap-mandatory">
        {
          data.map((d, index) => {
            return (
              <div key={index} className="flex flex-col w-24 items-center snap-start py-3 rounded-b-2xl rounded-t-xl px-2 border  border-[#4DD0E1]" style={{background : `linear-gradient(to top, #4DD0E1,  #16A085 ${Math.max(0, Math.min(90, d.windGust-2))}%, #16A085 ${Math.max(5, Math.min(95, d.windGust-5))}%, white ${Math.min(99, d.windGust+10)}%,white)`}}>
                <div className="m-auto pb-2">{d.time.slice(-5)}</div>
                <div className="m-auto text-[1.3rem]">{d.windGust}</div>
                <div className="m-auto">kph</div>
              </div>
            );
          })
          }
      </div>
    </div>
  )
}
