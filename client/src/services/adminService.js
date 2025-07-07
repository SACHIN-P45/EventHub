import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// 🔐 Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const adminService = {
  // 👥 Admin: Users
  getAllUsers: () => API.get('/admin/users'),
  createUser: (userData) => API.post('/admin/users', userData),
  updateUser: (id, userData) => API.put(`/admin/users/${id}`, userData),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),

  // 📊 Admin: Stats
  getStats: () => API.get('/admin/stats'),

  // 🕒 Admin: Recent Activity
  getRecentActivity: () => API.get('/admin/recent-activity'), // ✅ Add this route to your backend
};
