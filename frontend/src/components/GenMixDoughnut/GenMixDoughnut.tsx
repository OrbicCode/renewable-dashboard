import { Doughnut } from 'react-chartjs-2';
import type { JSX } from 'react';
import type { GenMix } from '@shared/types';

interface GenMixDoughnutProps {
  data: GenMix | null;
}

export default function GenMixDoughnut({ data }: GenMixDoughnutProps): JSX.Element {
  let doughnutData: number[] = [];
  if (data) {
    doughnutData = data.generationmix.map((fuelType) => fuelType.perc);
  }

  return <Doughnut data={{ datasets: [{ data: doughnutData }] }} />;
}
