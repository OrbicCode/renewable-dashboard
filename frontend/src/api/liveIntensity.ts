import type { IntensityData } from '@shared/types';

export async function getLiveIntensity() {
  try {
    const response = await fetch('http://localhost:3000/api/intensity');
    if (!response.ok) {
      throw new Error(`Error fetching, status: ${response.status}`);
    }
    const data = (await response.json()) as IntensityData;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
