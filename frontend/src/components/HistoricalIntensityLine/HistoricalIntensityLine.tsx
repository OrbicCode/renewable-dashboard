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
} from 'chart.js';
import type { HistoricalIntensity } from '@shared/types';

interface HistoricalIntensityLineProps {
  data: HistoricalIntensity[] | null;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function HistoricalIntensityLine({ data }: HistoricalIntensityLineProps) {
  const chartData = {
    labels: data ? data.map((int) => int.actual) : [],
    datasets: [
      {
        labels: data ? data.map((int) => int.actual) : [],
        data: data ? data.map((int) => int.actual) : [],
      },
    ],
  };

  const options = {
    responsive: true,
    title: {
      display: true,
    },
  };

  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
}
