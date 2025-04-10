import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = (formData) => API.post('/admin/login', formData);
export const getAllColleges = () => API.get('/colleges');
export const getCollege = (id) => API.get(`/colleges/${id}`);
export const createCollege = (data) => API.post('/colleges', data);
export const updateCollege = (id, data) => API.put(`/colleges/${id}`, data);
export const deleteCollege = (id) => API.delete(`/colleges/${id}`);
export const searchColleges = (query) => API.get(`/colleges/search?query=${query}`);

export default API;
