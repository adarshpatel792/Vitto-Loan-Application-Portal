import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config.js';
import { databaseHealthHandler } from './controllers/applicationController.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { applicationRouter } from './routes/applicationRoutes.js';
import { summaryRouter } from './routes/summaryRoutes.js';
import { asyncHandler } from './utils/asyncHandler.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(requestLogger);

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Vitto Loan Portal API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Vitto API is healthy.' });
});
app.get('/api/health/db', asyncHandler(databaseHealthHandler));

app.use('/api/applications', applicationRouter);
app.use('/api/summary', summaryRouter);

app.use(notFoundHandler);
app.use(errorHandler);
