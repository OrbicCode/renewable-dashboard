import { useEffect, useState } from 'react';
import './App.css';
import type { GenMix, HistoricalIntensity, IntensityData } from '@shared/types';
import FigureDisplay from './components/FigureDisplay/FigureDisplay';
import FigureDisplaySeparator from './components/FigureDisplaySeparator/FigureDisplaySeparator';
import ChartCard from './components/ChartCard/ChartCard';
import GenMixDoughnut from './components/GenMixDoughnut/GenMixDoughnut';
import Header from './components/Header/Header';
import FilterPanel from './components/FilterPanel/FilterPanel';
import HistoricalIntensityLine from './components/HistoricalIntensityLine/HistoricalIntensityLine';

function App() {
  const [intensityData, setIntensityData] = useState<IntensityData | null>(null);
  const [genMixData, setGenMixData] = useState<GenMix | null>(null);
  const [historicalIntensityData, setHistoricalIntensityData] = useState<
    HistoricalIntensity[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState<string>('');

  useEffect(() => {
    async function fetchIntensity() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/intensity');
        if (!response.ok) {
          throw new Error(`Error fetching, status: ${response.status}`);
        }
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
        if (!response.ok) {
          throw new Error(`Error fetching, status: ${response.status}`);
        }
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

  useEffect(() => {
    async function fetchHistoricalIntensityData() {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/historical/get-ten');
        if (!response.ok) {
          throw new Error(`Error fetching, status: ${response.status}`);
        }
        const data = await response.json();
        setHistoricalIntensityData(data);
        setIsLoading(false);
      } catch (error) {
        setFetchError('Error getting HistoricalIntensityData data');
        console.error(error);
      }
    }
    fetchHistoricalIntensityData();
  }, []);

  const renewablePercentage = genMixData
    ? genMixData.generationmix
        .filter((fuelType) => ['biomass', 'hydro', 'wind', 'solar'].includes(fuelType.fuel))
        .reduce((acc, curr) => acc + curr.perc, 0)
        .toFixed(2)
    : null;

  function handleFilterPanelToggle(chartId: string) {
    if (isFilterPanelOpen && activeFilterPanel !== chartId) {
      setIsFilterPanelOpen(false);
      setTimeout(() => {
        setActiveFilterPanel(chartId);
        setIsFilterPanelOpen(true);
      }, 600);
    } else {
      setIsFilterPanelOpen(true);
      setActiveFilterPanel(chartId);
    }
  }

  return (
    <main>
      <Header />
      <div className="figure_display_bar">
        <FigureDisplay
          title="Intensity"
          figureData={
            intensityData
              ? {
                  figureNumber:
                    intensityData.intensity.actual === null
                      ? intensityData.intensity.forecast
                      : intensityData.intensity.actual,
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
          figureData={
            genMixData ? { figureNumber: Number(renewablePercentage), figureText: 'GW/h' } : null
          }
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
                  figureNumber:
                    intensityData.intensity.actual === null
                      ? intensityData.intensity.forecast
                      : intensityData.intensity.actual,
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
        <ChartCard
          isLoading={isLoading}
          title={'Generation Mix'}
          filterPanelToggle={handleFilterPanelToggle}
          chartType={''}
          chartId="gen-mix"
        >
          <GenMixDoughnut data={genMixData} />
        </ChartCard>
        <ChartCard
          isLoading={isLoading}
          title="Historical Intensity Data"
          filterPanelToggle={handleFilterPanelToggle}
          chartType="line"
          chartId="hist-int-line"
        >
          <HistoricalIntensityLine data={historicalIntensityData} />
        </ChartCard>
      </div>
      <FilterPanel
        onFilterPanelClose={() => setIsFilterPanelOpen(false)}
        isFilterPanelOpen={isFilterPanelOpen}
        activeFilterPanel={activeFilterPanel}
      />
    </main>
  );
}

export default App;
