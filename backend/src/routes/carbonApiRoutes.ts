import express from 'express';

export const carbonApiRoutes = express.Router();

carbonApiRoutes.get('/intensity');

carbonApiRoutes.get('/generationmix');
