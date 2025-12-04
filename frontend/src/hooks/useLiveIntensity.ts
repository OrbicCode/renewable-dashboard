import { useState, useEffect } from 'react';
import { getLiveIntensity } from '../api/liveIntensity';
import type { IntensityData } from '@shared/types';

export function useLiveIntensity() {
  const [data, setData] = useState<IntensityData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadData() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getLiveIntensity();
      setData(response);
    } catch (error) {
      console.error(error);
      setError('Error getting live intensity data');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return { data, isLoading, error };
}
