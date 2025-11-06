import express from 'express';
import { getLiveIntensity } from '../controllers/carbonApiControllers.js';

export const carbonApiRoutes = express.Router();

carbonApiRoutes.get('/intensity', getLiveIntensity);

// carbonApiRoutes.get('/generationmix');
