import express from 'express';
import todoRoutes from './routes/todo.routes';
import expressWinston from 'express-winston';
import logger from './logger';

const app = express();

app.use(express.json());
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  }),
);
app.use('/', todoRoutes);

export default app;
