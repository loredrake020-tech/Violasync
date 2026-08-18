import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUser = (userId) => {
  return apiClient.get(`/users/${userId}`);
};

export const updateUser = (userId, userData) => {
  return apiClient.put(`/users/${userId}`, userData);
};

export const fetchData = () => {
  return apiClient.get('/data');
};

export default apiClient;