import express, { Express, Request, Response } from 'express';
import { carbonApiRoutes } from './routes/carbonApiRoutes.js';
import { Server } from 'http';
import cors from 'cors';
import { historicalDataRoutes } from './routes/historicalDataRoutes.js';
import './lib/historicalUpdater.js';

const app: Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/live', carbonApiRoutes);
app.use('/historical', historicalDataRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'endpoint not found' });
});

// eslint-disable-next-line prefer-const
let server: Server | undefined;

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  if (server) {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  } else {
    console.log('Server was not started.');
    process.exit(0);
  }
});

server = app.listen(PORT, () => console.log('app listening on port: ', PORT));
