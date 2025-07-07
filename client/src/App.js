import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
// Generic Protected Pages
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import CreateEvent from './pages/organizer/CreateEvent';
import EventDetails from './pages/EventDetails';
import Help from './pages/Help';
// Role-based Dashboards
import StudentDashboard from './pages/student/StudentDashboard';
import Organizations from './pages/student/Organizations';
import CreateOrganization from './pages/organizer/CreateOrganization';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStats from './pages/admin/AdminStats';
import AdminSettings from './pages/admin/AdminSettings';
import AdminApprovals from './pages/AdminApprovals';
// Utils
import PrivateRoute from './components/PrivateRoute';
// import { HelpCenter } from '@mui/icons-material';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* 🔒 Protected Generic Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/help'
          element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          }
        />
        <Route
          path='/student/organizations'
          element={
            <PrivateRoute>
              <Organizations />
            </PrivateRoute>
          }
        />
        <Route
          path='/organizer/organizations/create'
          element={
            <PrivateRoute>
              <CreateOrganization />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-event" 
          element={
            <PrivateRoute roles={['organizer']}>
              <CreateEvent />
            </PrivateRoute>   
          }
        />
        <Route
          path="/admin/approvals"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminApprovals />
            </PrivateRoute>
          }
        />
        <Route
          path='/admin/settings'
          element={
            <PrivateRoute roles={['admin']}>
              <AdminSettings></AdminSettings>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={ 
            <PrivateRoute roles={['admin']}>
              <AdminUsers />
            </PrivateRoute> 
          }
        />
        <Route
          path="/admin/stats" 
          element={
            <PrivateRoute roles={['admin']}>
              <AdminStats />
            </PrivateRoute>
          }
        />
        {/* 🎯 Role-Based Dashboards */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute roles={['student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/organizer/dashboard"
          element={
            <PrivateRoute roles={['organizer']}>
              <OrganizerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
