import api from '../utils/axiosConfig';

export const getDashboardStats = async () => {
  const response = await api.get('/api/users/dashboard/stats');
  return response.data;
};

export const getUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await api.get(`/api/users?${query}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/api/users', userData);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};