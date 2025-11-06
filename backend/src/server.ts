import express, { Express, Request, Response } from 'express';
import { carbonApiRoutes } from './routes/carbonApiRoutes.js';

const app: Express = express();
const PORT = 3000;

app.use('/api', carbonApiRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'endpoint not found' });
});

app.listen(PORT, () => console.log('app listening on port: ', PORT));
