import { Request, Response } from 'express';

export type IntensityDataArray = {
  data: IntensityData[];
};

export interface IntensityData {
  from: Date;
  to: Date;
  intensity: Intensity;
}

export interface Intensity {
  forecast: number;
  actual: number;
  index: string;
}

export async function getLiveIntensity(req: Request, res: Response): Promise<void> {
  try {
    const response = await fetch('https://api.carbonintensity.org.uk/intensity');
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = (await response.json()) as IntensityDataArray;
    if (data.data.length === 0) {
      res.status(404).json({ error: 'no intensity data found' });
    }

    res.json(data.data[0]);
  } catch (error) {
    res.status(500).json({ error: `Error fetching live Intensity: ${error}` });
  }
}
