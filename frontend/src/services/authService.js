import api from './api';
import axios from 'axios';


export const registerUser = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('ns_token', response.data.token);
    localStorage.setItem('ns_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginUser = async (credentials) => {

  const response = await api.post('/api/auth/login', credentials);

  if(!import.meta.env.VITE_API_BASE_URL){
    console.error("VITE_API_BASE_URL is not defined in the environment variables.");
    throw new Error("VITE_API_BASE_URL is not defined in the environment variables.");
    return;
  }
  
  // if (response.data.token) {
  //   localStorage.setItem('ns_token', response.data.token);
  //   localStorage.setItem('ns_user', JSON.stringify(response.data.user));
  // }
  return response.data;
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    localStorage.removeItem('ns_token');
    localStorage.removeItem('ns_user');
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  if (response.data.user) {
    localStorage.setItem('ns_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put('/user/profile', profileData);
  if (response.data.user) {
    localStorage.setItem('ns_user', JSON.stringify(response.data.user));
  }
  return response.data;
};
