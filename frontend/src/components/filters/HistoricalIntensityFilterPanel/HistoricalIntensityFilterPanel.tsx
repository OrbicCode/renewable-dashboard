import { useState } from 'react';
import DateFilter from '../DateFilter/DateFilter';

export default function HistoricalIntensityFilterPanel() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  async function handleApplyFilters() {
    try {
      if (startDate || endDate) {
        const response = await fetch('http://localhost:3000/historical/get-intensities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ startDate, endDate }),
        });
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DateFilter
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </>
  );
}
