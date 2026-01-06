import express from 'express';
import {
  getDateRange,
  getRecentIntensities,
  getFilteredIntensities,
} from '../controllers/historicalDataControllers.js';

export const historicalDataRoutes = express.Router();

historicalDataRoutes.get('/get-intensities/recent', getRecentIntensities);
historicalDataRoutes.get('/get-date-range', getDateRange);

historicalDataRoutes.post('/get-intensities', getFilteredIntensities);
