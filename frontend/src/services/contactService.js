import api from './api';

export const getContacts = async () => {
  const response = await api.get('/api/contacts');
  return response.data;
};

export const createContact = async (contactData) => {
  const response = await api.post('/api/contacts', contactData);
  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await api.put(`/api/contacts/${id}`, contactData);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/api/contacts/${id}`);
  return response.data;
};
