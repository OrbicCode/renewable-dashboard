import express from 'express';
import { getLiveGenMix, getLiveIntensity } from '../controllers/carbonApiControllers.js';

export const carbonApiRoutes = express.Router();

carbonApiRoutes.get('/intensity', getLiveIntensity);

carbonApiRoutes.get('/generationmix', getLiveGenMix);
