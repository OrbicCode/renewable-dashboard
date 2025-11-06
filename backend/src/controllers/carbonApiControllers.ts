import { Request, Response } from 'express';
import { GenMixData } from '../../../shared-types/src/liveGenMix.js';
import { IntensityDataArray } from '../../../shared-types/src/liveIntensity.js';

export async function getLiveIntensity(req: Request, res: Response): Promise<void> {
  try {
    const response = await fetch('https://api.carbonintensity.org.uk/intensity');
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = (await response.json()) as IntensityDataArray;
    if (data.data.length === 0) {
      res.status(404).json({ error: 'no intensity data found' });
      return;
    }

    res.json(data.data[0]);
  } catch (error) {
    res.status(500).json({ error: `Error fetching live Intensity: ${error}` });
  }
}

export async function getLiveGenMix(req: Request, res: Response): Promise<void> {
  try {
    const response = await fetch('https://api.carbonintensity.org.uk/generation');
    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = (await response.json()) as GenMixData;
    if (!data.data) {
      res.status(404).json({ error: 'no generationmix data found' });
      return;
    }

    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: `Error fetching live generationmix data: ${error}` });
  }
}
