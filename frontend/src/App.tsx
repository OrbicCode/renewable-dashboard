import { useEffect, useState } from 'react';
import './App.css';
import type { GenMix, IntensityData } from '@shared/types';
import FigureDisplay from './components/FigureDisplay/FigureDisplay';
import FigureDisplaySeparator from './components/FigureDisplaySeparator/FigureDisplaySeparator';
import ChartCard from './components/ChartCard/ChartCard';
import GenMixDoughnut from './components/GenMixDoughnut/GenMixDoughnut';

function App() {
  const [intensityData, setIntensityData] = useState<IntensityData | null>(null);
  const [genMixData, setGenMixData] = useState<GenMix | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');

  useEffect(() => {
    async function fetchIntensity() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/intensity');
        const data = (await response.json()) as IntensityData;
        setIntensityData(data);
        setIsLoading(false);
      } catch (error) {
        setFetchError('Error getting intensity data');
        console.error(error);
      }
    }
    fetchIntensity();
  }, []);

  useEffect(() => {
    async function fetchGenMixData() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/generationmix');
        const data = await response.json();
        setGenMixData(data);
        setIsLoading(false);
      } catch (error) {
        setFetchError('Error getting generationmix data');
        console.error(error);
      }
    }
    fetchGenMixData();
  }, []);

  const renewablePercentage = genMixData
    ? genMixData.generationmix
        .filter((fuelType) => ['biomass', 'hydro', 'wind', 'solar'].includes(fuelType.fuel))
        .reduce((acc, curr) => acc + curr.perc, 0)
    : null;

  return (
    <>
      <div className="figure_display_bar">
        <FigureDisplay
          title="Intensity"
          figureData={
            intensityData
              ? {
                  figureNumber: intensityData.intensity.actual,
                  figureText: intensityData.intensity.index,
                }
              : null
          }
          isLoading={isLoading}
          fetchError={fetchError}
          dataType="intensity"
        />
        <FigureDisplaySeparator />
        <FigureDisplay
          title="Renewable %"
          figureData={genMixData ? { figureNumber: renewablePercentage, figureText: 'GW/h' } : null}
          isLoading={isLoading}
          fetchError={fetchError}
          dataType="genmix"
        />
        <FigureDisplaySeparator />

        <FigureDisplay
          title="Intensity"
          figureData={
            intensityData
              ? {
                  figureNumber: intensityData.intensity.actual,
                  figureText: intensityData.intensity.index,
                }
              : null
          }
          isLoading={isLoading}
          fetchError={fetchError}
          dataType="intensity"
        />
      </div>
      <div className="chart_grid">
        <ChartCard>
          <GenMixDoughnut data={genMixData} />
        </ChartCard>
      </div>
    </>
  );
}

export default App;
