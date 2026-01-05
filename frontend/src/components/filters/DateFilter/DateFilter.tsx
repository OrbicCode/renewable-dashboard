import { useState, useEffect } from 'react';
import styles from './DateFilter.module.css';

export default function DateFilter() {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  function handleStartDate(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    console.log(value);
    if (endDate && value > endDate) {
      setStartDate(endDate);
    } else {
      setStartDate(value);
    }
  }

  function handleEndDate(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    console.log(value);
    if (startDate && value < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(value);
    }
  }
  const effectiveStartMin = minDate;
  const effectiveStartMax = endDate || maxDate; // can't pick start after end
  const effectiveEndMin = startDate || minDate; // can't pick end before start
  const effectiveEndMax = maxDate;

  return (
    <div className={styles.container}>
      <div>
        <label>Start:</label>
        <input
          type="date"
          min={effectiveStartMin}
          max={effectiveStartMax}
          value={startDate}
          onChange={handleStartDate}
        />
      </div>
      <div>
        <label>End:</label>
        <input
          type="date"
          min={effectiveEndMin}
          max={effectiveEndMax}
          value={endDate}
          onChange={handleEndDate}
        />
      </div>
    </div>
  );
}
