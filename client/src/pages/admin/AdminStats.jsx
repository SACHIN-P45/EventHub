import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Paper, Toolbar, CircularProgress
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { adminService } from '../../services/adminService';

const drawerWidth = 240;

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then(res => setStats(res.data))
      .catch(err => console.error('❌ Stats error:', err))
      .finally(() => setLoading(false));
  }, []);

  const role = 'admin';

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>📊 Admin Stats</Typography>

        {loading ? <CircularProgress /> : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">👥 Total Users</Typography>
                <Typography variant="h4">{stats.totalUsers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">📅 Total Events</Typography>
                <Typography variant="h4">{stats.totalEvents}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">✅ Approved</Typography>
                <Typography variant="h4">{stats.approvedEvents}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">⏳ Pending</Typography>
                <Typography variant="h4">{stats.pendingEvents}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default AdminStats;
