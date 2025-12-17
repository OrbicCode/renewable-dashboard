import { useState, useEffect } from 'react';

export default function DateFilter() {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    async function getDateRange() {
      try {
        const response = await fetch('http://localhost:3000/historical/get-date-range');
        const data = await response.json();
        setMinDate(data.min_date.slice(0, 10));
        setMaxDate(data.max_date.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    }
    getDateRange();
  }, []);
  return (
    <>
      <label>Start:</label>
      <input type="date" min={minDate} max={maxDate} />
    </>
  );
}
