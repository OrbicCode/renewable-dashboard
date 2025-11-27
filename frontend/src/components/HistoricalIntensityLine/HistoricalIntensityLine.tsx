import type { HistoricalIntensity } from '@shared/types';

interface HistoricalIntensityLineProps {
  data: HistoricalIntensity[] | null;
}

export default function HistoricalIntensityLine({ data }: HistoricalIntensityLineProps) {
  return (
    <>
      <h2>I'm a Line chart</h2>
      {data &&
        data.map((intensity: HistoricalIntensity) => {
          return (
            <div>
              <p>{intensity.actual}</p>
            </div>
          );
        })}
    </>
  );
}
