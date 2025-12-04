import { useState, useEffect } from 'react';
import { getLiveGenMixData } from '../api/liveGenMix';
import type { GenMix } from '@shared/types';

export function useLiveGenMix() {
  const [data, setData] = useState<GenMix | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadData() {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getLiveGenMixData();
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
