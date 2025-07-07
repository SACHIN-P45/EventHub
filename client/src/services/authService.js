import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 🔐 Attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 🚨 Auto logout on 401 Unauthorized
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Auth functions
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const updatePassword = (data) => API.post('/auth/update-password', data);

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
