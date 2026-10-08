import api from './api';

export const getAdminStats = async () => {
  const response = await api.get('/api/admin/dashboard');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/api/admin/users');
  return response.data;
};

export const getAdminEmergencies = async (status = '') => {
  const url = status ? `/admin/emergencies?status=${status}` : '/api/admin/emergencies';
  const response = await api.get(url);
  return response.data;
};

export const getAdminEmergencyById = async (id) => {
  const response = await api.get(`/api/admin/emergencies/${id}`);
  return response.data;
};

export const updateEmergencyStatus = async (id, status) => {
  const response = await api.patch(`/api/admin/emergencies/${id}/status`, { status });
  return response.data;
};
