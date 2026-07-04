import { Router } from 'express';
import { summaryHandler } from '../controllers/applicationController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const summaryRouter = Router();

summaryRouter.get('/', asyncHandler(summaryHandler));
