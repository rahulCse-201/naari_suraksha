import api from './api';

export const triggerSOS = async (latitude, longitude) => {
  const response = await api.post('/api/emergencies', { latitude, longitude });
  return response.data;
};

export const getMyEmergencies = async () => {
  const response = await api.get('/api/emergencies/my');
  return response.data;
};

export const getEmergencyById = async (id) => {
  const response = await api.get(`/api/emergencies/${id}`);
  return response.data;
};
