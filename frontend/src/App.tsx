import { useEffect, useState } from 'react';
import './App.css';
import type { GenMix, IntensityData } from '@shared/types';
import FigureDisplay from './components/FigureDisplay/FigureDisplay';

function App() {
  // Add Error State
  const [intensityData, setIntensityData] = useState<IntensityData | null>(null);
  const [genMixData, setGenMixData] = useState<GenMix | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchIntensity() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/intensity');
        const data = (await response.json()) as IntensityData;
        setIntensityData(data);
        setIsLoading(false);
      } catch (error) {
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
      <div>
        <p>{intensityData ? intensityData.intensity.index : null}</p>
        <div>
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
          />
          <FigureDisplay
            title="Renewable Energy Percentage"
            figureData={
              genMixData ? { figureNumber: renewablePercentage, figureText: 'GW/h' } : null
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
