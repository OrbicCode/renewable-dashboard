import { useState, useEffect } from 'react';
import styles from './DateFilter.module.css';

interface DateFilterProps {
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  startDate: string | '';
  endDate: string | '';
}

export default function DateFilter({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: DateFilterProps) {
  const [minDate, setMinDate] = useState<string>('');
  const [maxDate, setMaxDate] = useState<string>('');

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

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStartDate(val);
    if (endDate && val > endDate) setEndDate(val);
  };

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEndDate(val);
    if (startDate && val < startDate) setStartDate(val);
  };
  const effectiveStartMin = minDate;
  const effectiveStartMax = endDate || maxDate;
  const effectiveEndMin = startDate || minDate;
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
