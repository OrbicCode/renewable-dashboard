import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import type { JSX } from 'react';
import type { GenMix } from '@shared/types';

interface GenMixDoughnutProps {
  data: GenMix | null;
}

ChartJS.register(ArcElement, Legend, Tooltip, ChartDataLabels, annotationPlugin);

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
    onHover: (_event, _activeElements, chart) => {
      chart.update('none');
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
      annotation: {
        annotations: {
          dLabel: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            type: 'doughnutLabel' as any,
            content: ({ chart }) => {
              const active = chart.getActiveElements();
              if (active.length > 0) {
                const index = active[0].index;
                const value = chart.data.datasets[0].data[index];
                const label =
                  ((chart.data.labels?.[index] as string) || '').charAt(0).toUpperCase() +
                  ((chart.data.labels?.[index] as string) || '').slice(1);
                return [`${label}: `, `${value}%`];
              }
              return '';
            },
            drawTime: 'afterDraw',
            font: [{ size: 40 }, { size: 50 }, { size: 30 }],
            color: ({ chart }) => {
              const active = chart.getActiveElements();
              if (active.length > 0) {
                const index = active[0].index;
                const bgColors = chart.data.datasets[0].backgroundColor as string[];
                const bgColor = bgColors?.[index] || 'black';
                return ['black', bgColor];
              }
              return ['black', 'black'];
            },
          },
        },
      },
    },
  };

  return <div>{data ? <Doughnut data={chartData} options={options} /> : null}</div>;
}
