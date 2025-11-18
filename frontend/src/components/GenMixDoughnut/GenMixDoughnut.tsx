import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import type { JSX } from 'react';
import type { GenMix } from '@shared/types';
import styles from './GenMixDoughnut.module.css';

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
        backgroundColor: ['#20331a', '#33512a', '#446c37', '#558745', '#66a253', '#7cb36b'],
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
      legend: {
        labels: {
          font: {
            family: 'Montserrat Alternates',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.raw}%`,
        },
      },
      datalabels: {
        color: '#ffffff',
        font: {
          size: 10,
          family: 'Montserrat Alternates',
        },
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
            font: [
              { size: 20, family: 'Montserrat Alternates' },
              { size: 25, family: 'Montserrat Alternates' },
            ],
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

  return (
    <div className={styles.container}>
      {data ? <Doughnut data={chartData} options={options} /> : null}
    </div>
  );
}
