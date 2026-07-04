import { Router } from 'express';
import {
  createApplicationHandler,
  listApplicationsHandler,
  updateStatusHandler
} from '../controllers/applicationController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  validateCreateApplication,
  validateListQuery,
  validateStatusUpdate
} from '../validators/applicationValidator.js';

export const applicationRouter = Router();

applicationRouter.post('/', validateCreateApplication, asyncHandler(createApplicationHandler));
applicationRouter.get('/', validateListQuery, asyncHandler(listApplicationsHandler));
applicationRouter.patch('/:id/status', validateStatusUpdate, asyncHandler(updateStatusHandler));
