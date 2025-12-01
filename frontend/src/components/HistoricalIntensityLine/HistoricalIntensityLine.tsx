import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from 'chart.js';
import type { HistoricalIntensity } from '@shared/types';

interface HistoricalIntensityLineProps {
  data: HistoricalIntensity[] | null;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins
);

export default function HistoricalIntensityLine({ data }: HistoricalIntensityLineProps) {
  const chartData = {
    labels: data
      ? data.map((int) =>
          new Date(int.datetime).toLocaleTimeString('en-gb', { hour: 'numeric', minute: 'numeric' })
        )
      : [],
    datasets: [
      {
        label: 'Carbon Intensity',
        data: data
          ? data
              .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
              .map((int) => (int.actual ? int.actual : int.forecast))
          : [],
        borderColor: '#20331a',
        backgroundColor: 'rgba(32,51,26,0.75)',
        tension: 0.3,
        fill: true,
        pointRadius: 2,
        pointHoverRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
