import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { JSX } from 'react';
import type { GenMix } from '@shared/types';

interface GenMixDoughnutProps {
  data: GenMix | null;
}

ChartJS.register(ArcElement, Legend, Tooltip, ChartDataLabels);

export default function GenMixDoughnut({ data }: GenMixDoughnutProps): JSX.Element {
  const chartData: ChartData<'doughnut'> = {
    labels: data
      ? data.generationmix.filter((fuelType) => fuelType.perc).map((fuelType) => fuelType.fuel)
      : [],
    datasets: [
      {
        data: data
          ? data.generationmix.filter((fuelType) => fuelType.perc).map((fuelType) => fuelType.perc)
          : [],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Wind
          'rgba(255, 205, 86, 0.6)', // Solar
          'rgba(54, 162, 235, 0.6)', // Hydro
          'rgba(153, 102, 255, 0.6)', // Biomass
          'rgba(255, 99, 132, 0.6)',
          'rgba(0, 255, 81, 0.6)', // Others
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    animation: {
      animateRotate: true,
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw}%`,
        },
      },
      datalabels: {
        color: '#000000',
        formatter(value) {
          return value > 4 ? value + '%' : null;
        },
      },
    },
  };

  return <div>{data ? <Doughnut data={chartData} options={options} /> : null}</div>;
}
