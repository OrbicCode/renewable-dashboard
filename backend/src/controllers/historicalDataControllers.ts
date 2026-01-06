import { Request, Response } from 'express';
import * as historicalDataServices from '../services/historicalDataServices.js';

export async function getRecentIntensities(req: Request, res: Response) {
  try {
    const data = await historicalDataServices.getRecentIntensities();
    res.json(data);
  } catch (error) {
    console.error('Controller Error: ', error);
    res.status(500).json({ error: `Controller Error: ${error}` });
  }
}

export async function getDateRange(req: Request, res: Response) {
  try {
    const data = await historicalDataServices.getDateRange();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Controller Error: ${error}` });
  }
}

export async function getFilteredIntensities(req: Request, res: Response) {
  try {
    const { body } = req;
    const data = await historicalDataServices.getFilteredIntensities(body);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Controller Error: ${error}` });
  }
}
