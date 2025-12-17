import express from 'express';
import { getDateRange, getTenIntensities } from '../controllers/historicalDataControllers.js';

export const historicalDataRoutes = express.Router();

historicalDataRoutes.get('/get-ten', getTenIntensities);
historicalDataRoutes.get('/get-date-range', getDateRange);
