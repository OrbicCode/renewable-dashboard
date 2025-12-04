import { useState, useEffect } from 'react';
import { getHistoricalIntensity } from '../api/histIntensity';
import type { HistoricalIntensity } from '@shared/types';

export function useHistIntensity() {
  const [data, setData] = useState<HistoricalIntensity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadData() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getHistoricalIntensity();
      setData(response);
    } catch (error) {
      console.error(error);
      setError('Error getting live gen-mix data');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
  return { data, isLoading, error };
}
