import api from './api';

export const getStoreDashboard = async () => {
  const response = await api.get('/api/stores/dashboard');
  return response.data;
};

export const getAllStores = async (params = {}) => {
  const response = await api.get('/api/stores', { params });
  return response.data;
};

export const createStore = async (storeData) => {
  const response = await api.post('/api/stores', storeData);
  return response.data;
};

export const getStoreById = async (id) => {
  const response = await api.get(`/api/stores/${id}`);
  return response.data;
};

export const getStoreRatings = async (id) => {
  const response = await api.get(`/api/stores/${id}/ratings`);
  return response.data;
};

export const submitRating = async (ratingData) => {
  const response = await api.post('/api/ratings', ratingData);
  return response.data;
};