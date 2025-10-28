import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export { api };
