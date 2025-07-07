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

// 🚨 Auto logout on token failure
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

const eventService = {
  // 🧑‍🎓 Student
  getAllEvents: () => API.get('/events'),
  getEventById: (id) => API.get(`/events/${id}`),
  registerEvent: (id) => API.post(`/events/${id}/register`),
  getRegisteredEvents: () => API.get('/events/registered'),
  getBookmarkedEvents: () => API.get('/events/bookmarked'),
  bookmarkEvent: (id) => API.post(`/events/${id}/bookmark`),
  getRegistrationsForEvent: (eventId) => API.get(`/events/${eventId}/registrations`),

  // 👨‍💼 Organizer
  createEvent: (formData) =>
    API.post('/events', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateEvent: (id, formData) => API.put(`/events/${id}`, formData),
  deleteEvent: (id) => API.delete(`/events/${id}`),
  getMyEvents: () => API.get('/events/my'),

  // 👨‍⚖️ Admin
  getPendingEvents: () => API.get('/events/pending/all'),
  approveEvent: (id, approved) => API.put(`/events/${id}/approve`, { approved }),
};

export { API, eventService };
