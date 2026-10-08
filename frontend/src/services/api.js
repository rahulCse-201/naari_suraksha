import axios from 'axios';

// one axios instance with some default configurations, it makes shorter to call an api axios.post('auth/login', data)
// prevent repedately axios configurations in each api call
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Request interceptor to attach bearer token if stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ns_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if token expired
      localStorage.removeItem('ns_token');
      localStorage.removeItem('ns_user');
    }
    return Promise.reject(error);
  }
);

export default api;
