import { useEffect, useState } from 'react';
import './App.css';
import type { IntensityData } from '@shared/types';

function App() {
  const [data, setData] = useState<IntensityData | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/intensity');
        const data = (await response.json()) as IntensityData;
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div>
        <p>{data ? data.intensity.index : null}</p>
      </div>
    </>
  );
}

export default App;
