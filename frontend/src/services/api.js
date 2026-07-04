import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 15000
});

export const applicationApi = {
  create: (payload) => api.post('/applications', payload),
  list: (params) => api.get('/applications', { params }),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  summary: () => api.get('/summary')
};

export const getApiErrorMessage = (error) =>
  error.response?.data?.message || error.message || 'Something went wrong.';
