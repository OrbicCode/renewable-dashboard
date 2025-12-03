import express from 'express';
import { getTenIntensities } from '../controllers/historicalDataControllers.js';

export const historicalDataRoutes = express.Router();

historicalDataRoutes.get('/get-ten', getTenIntensities);
