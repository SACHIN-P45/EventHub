import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const [role, setRole] = useState('student'); // Replace with real user role from context/token

  // Dummy data for now
  const data = {
    student: {
      registered: 3,
      saved: 5,
    },
    organizer: {
      submitted: 4,
      approved: 2,
    },
    admin: {
      pendingEvents: 5,
      totalUsers: 120,
    },
  };

  const renderCards = () => {
    if (role === 'student') {
      return (
        <>
          <DashboardCard title="Registered Events" value={data.student.registered} />
          <DashboardCard title="Saved Events" value={data.student.saved} />
        </>
      );
    }
    if (role === 'organizer') {
      return (
        <>
          <DashboardCard title="Submitted Events" value={data.organizer.submitted} />
          <DashboardCard title="Approved Events" value={data.organizer.approved} />
        </>
      );
    }
    if (role === 'admin') {
      return (
        <>
          <DashboardCard title="Pending Approvals" value={data.admin.pendingEvents} />
          <DashboardCard title="Total Users" value={data.admin.totalUsers} />
        </>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
        </Typography>
        <Grid container spacing={2}>
          {renderCards()}
        </Grid>
      </Box>
    </Box>
  );
};

const DashboardCard = ({ title, value }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" color="primary">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Dashboard;
