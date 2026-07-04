export const ALLOWED_LANGUAGES = ['Hindi', 'Tamil', 'Telugu', 'Marathi', 'English'];
export const ALLOWED_STATUSES = ['pending', 'approved', 'rejected'];

export const STATUS_TRANSITIONS = {
  pending: ['approved', 'rejected'],
  approved: [],
  rejected: []
};
