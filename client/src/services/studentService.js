import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// 🔐 Attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const studentService = {
  // 📌 Get all organizations
  getAllOrganizations: () => API.get('/organizations'),

  // 🔁 Follow / unfollow
  toggleFollowOrganization: (id) => API.post(`/organizations/${id}/follow`),

  // 👤 Get followed organizations
  getFollowedOrganizations: () => API.get('/organizations/followed/me'),

  // 🆕 Create new organization
  createOrganization: (formData) =>
    API.post('/organizations', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
