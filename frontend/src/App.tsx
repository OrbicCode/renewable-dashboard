import { useState } from 'react';
import './App.css';
import FigureDisplay from './components/FigureDisplay/FigureDisplay';
import FigureDisplaySeparator from './components/FigureDisplaySeparator/FigureDisplaySeparator';
import ChartCard from './components/ChartCard/ChartCard';
import GenMixDoughnut from './components/GenMixDoughnut/GenMixDoughnut';
import HistoricalIntensityLine from './components/HistoricalIntensityLine/HistoricalIntensityLine';
import Header from './components/Header/Header';
import FilterPanel from './components/FilterPanel/FilterPanel';
import { useLiveGenMix } from './hooks/useLiveGenMix';
import { useLiveIntensity } from './hooks/useLiveIntensity';
import { useHistIntensity } from './hooks/useHistIntensity';

function App() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);
  const [activeFilterPanel, setActiveFilterPanel] = useState<string>('');

  const {
    data: intensityData,
    isLoading: liveIntLoading,
    error: liveIntError,
  } = useLiveIntensity();
  const { data: genMixData, isLoading: liveGMLoading, error: liveGMError } = useLiveGenMix();
  const {
    data: historicalIntensityData,
    isLoading: histIntLoading,
    error: histIntError,
  } = useHistIntensity();

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
          isLoading={liveIntLoading}
          fetchError={liveIntError}
          dataType="intensity"
        />
        <FigureDisplaySeparator />
        <FigureDisplay
          title="Renewable %"
          figureData={
            genMixData ? { figureNumber: Number(renewablePercentage), figureText: 'GW/h' } : null
          }
          isLoading={liveGMLoading}
          fetchError={liveGMError}
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
          isLoading={liveIntLoading}
          fetchError={liveIntError}
          dataType="intensity"
        />
      </div>
      <div className="chart_grid">
        <ChartCard
          isLoading={liveGMLoading}
          title={'Generation Mix'}
          filterPanelToggle={handleFilterPanelToggle}
          chartType={''}
          chartId="gen-mix"
          fetchError={histIntError}
        >
          <GenMixDoughnut data={genMixData} />
        </ChartCard>
        <ChartCard
          isLoading={histIntLoading}
          title="Historical Intensity Data"
          filterPanelToggle={handleFilterPanelToggle}
          chartType="line"
          chartId="hist-int-line"
          fetchError={histIntError}
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
