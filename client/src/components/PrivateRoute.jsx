import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, roles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    // Check if route has restricted roles
    if (roles && !roles.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (err) {
    console.error('Token decode failed', err);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
