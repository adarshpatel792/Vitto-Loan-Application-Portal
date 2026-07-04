import { ApiError } from '../utils/ApiError.js';
import { ALLOWED_LANGUAGES, ALLOWED_STATUSES } from '../utils/constants.js';

const isBlank = (value) => typeof value !== 'string' || value.trim().length === 0;

export const validateCreateApplication = (req, _res, next) => {
  const { applicantName, mobileNumber, loanAmount, loanPurpose, preferredLanguage } = req.body;
  const errors = {};

  if (isBlank(applicantName) || applicantName.trim().length < 3) {
    errors.applicantName = 'Applicant name must be at least 3 characters.';
  }

  if (!/^\d{10}$/.test(String(mobileNumber || ''))) {
    errors.mobileNumber = 'Mobile number must be exactly 10 digits.';
  }

  if (Number.isNaN(Number(loanAmount)) || Number(loanAmount) <= 0) {
    errors.loanAmount = 'Loan amount must be greater than 0.';
  }

  if (isBlank(loanPurpose)) {
    errors.loanPurpose = 'Loan purpose is required.';
  }

  if (!ALLOWED_LANGUAGES.includes(preferredLanguage)) {
    errors.preferredLanguage = `Preferred language must be one of: ${ALLOWED_LANGUAGES.join(', ')}.`;
  }

  if (Object.keys(errors).length > 0) {
    throw new ApiError(422, 'Validation failed.', errors);
  }

  next();
};

export const validateStatusUpdate = (req, _res, next) => {
  const { status } = req.body;

  if (!ALLOWED_STATUSES.includes(status) || status === 'pending') {
    throw new ApiError(422, 'Status must be approved or rejected.');
  }

  next();
};

export const validateListQuery = (req, _res, next) => {
  const { status, page = 1, limit = 10 } = req.query;

  if (status && !ALLOWED_STATUSES.includes(status)) {
    throw new ApiError(422, `Status must be one of: ${ALLOWED_STATUSES.join(', ')}.`);
  }

  if (Number(page) < 1 || Number(limit) < 1 || Number(limit) > 100) {
    throw new ApiError(422, 'Pagination must use page >= 1 and limit between 1 and 100.');
  }

  next();
};
