import {
  checkDatabase,
  createApplication,
  getSummary,
  listApplications,
  updateApplicationStatus
} from '../services/applicationService.js';

export const createApplicationHandler = async (req, res) => {
  const application = await createApplication(req.body);

  res.status(201).json({
    success: true,
    message: 'Loan application submitted successfully.',
    applicationReferenceNumber: application.id,
    data: application
  });
};

export const listApplicationsHandler = async (req, res) => {
  const data = await listApplications(req.query);

  res.status(200).json({
    success: true,
    data: data.items,
    pagination: data.pagination
  });
};

export const updateStatusHandler = async (req, res) => {
  const application = await updateApplicationStatus(req.params.id, req.body.status);

  res.status(200).json({
    success: true,
    message: `Application ${application.status}.`,
    data: application
  });
};

export const summaryHandler = async (_req, res) => {
  const summary = await getSummary();

  res.status(200).json({
    success: true,
    data: summary
  });
};

export const databaseHealthHandler = async (_req, res) => {
  const data = await checkDatabase();

  res.status(200).json({
    success: true,
    message: 'Database connection is healthy.',
    data
  });
};
