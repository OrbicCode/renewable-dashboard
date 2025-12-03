import { Request, Response } from 'express';
import * as historicalDataServices from '../services/historicalDataServices.js';

export async function getTenIntensities(req: Request, res: Response) {
  try {
    const data = await historicalDataServices.getTenIntensities();
    res.json(data);
  } catch (error) {
    console.error('Controller Error: ', error);
    res.status(500).json({ error: `Controller Error: ${error}` });
  }
}
