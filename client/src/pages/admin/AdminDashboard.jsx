import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Avatar, Toolbar, Button, CircularProgress, Divider, CardActions, Fade
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  VerifiedUser, NotificationsActive, People, EventNote,
  TrendingUp, EventAvailable, BarChart, Settings
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import Sidebar from '../../components/Sidebar';
import { adminService } from '../../services/adminService';

const drawerWidth = 240;

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const role = 'admin';

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          adminService.getStats(),
          adminService.getRecentActivity?.() || Promise.resolve({ data: [] })
        ]);
        setStats(statsRes.data);
        setRecentActivity(activityRes.data);
      } catch (err) {
        console.error('Dashboard loading error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: 'Pending Approvals',
      value: stats?.pending ?? '—',
      icon: <NotificationsActive />,
      color: theme.palette.warning.main
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers ?? '—',
      icon: <People />,
      color: theme.palette.info.main
    },
    {
      title: 'Active Events',
      value: stats?.activeEvents ?? '—',
      icon: <EventNote />,
      color: theme.palette.success.main
    },
    {
      title: 'Revenue',
      value: stats ? `$${stats.revenue.toLocaleString()}` : '—',
      icon: <TrendingUp />,
      color: theme.palette.primary.main
    },
  ];

  const actions = [
    {
      title: 'Approve Events',
      description: 'Review and approve pending events',
      icon: <EventAvailable sx={{ fontSize: 40 }} />,
      path: '/admin/approvals',
      color: theme.palette.warning.light
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: <People sx={{ fontSize: 40 }} />,
      path: '/admin/users',
      color: theme.palette.info.light
    },
    {
      title: 'View Analytics',
      description: 'Platform usage statistics',
      icon: <BarChart sx={{ fontSize: 40 }} />,
      path: '/admin/stats',
      color: theme.palette.success.light
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: <Settings sx={{ fontSize: 40 }} />,
      path: '/admin/settings',
      color: theme.palette.primary.light
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar role={role} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role={role} />
      <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedUser sx={{ fontSize: 36 }} /> Admin Dashboard
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary }}>
                Manage event approvals, users, and monitor platform activity
              </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => navigate('/events')} sx={{ borderRadius: 2, px: 3 }}>
              View All Events
            </Button>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {cards.map((c, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[2], borderLeft: `4px solid ${c.color}` }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">{c.title}</Typography>
                        <Typography variant="h4" fontWeight={700}>{c.value}</Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: `${c.color}20`, color: c.color }}>{c.icon}</Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions */}
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Quick Actions</Typography>
          <Grid container spacing={3}>
            {actions.map((a, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[1], transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: theme.shadows[4] } }}>
                  <CardContent sx={{ textAlign: 'center', py: 4, backgroundColor: `${a.color}10` }}>
                    <Avatar sx={{ bgcolor: `${a.color}30`, color: a.color, width: 64, height: 64, mb: 2 }}>{a.icon}</Avatar>
                    <Typography variant="h6" fontWeight={600} mb={1}>{a.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{a.description}</Typography>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: 'center', py: 1.5 }}>
                    <Button size="small" onClick={() => navigate(a.path)} sx={{ textTransform: 'none', fontWeight: 500 }}>
                      Go
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Enhanced Recent Activity */}
          <Typography variant="h6" fontWeight={600} mt={4} mb={2}>Recent Activity</Typography>
          <Grid container spacing={3}>
            {recentActivity.length === 0 ? (
              <Typography color="text.secondary" sx={{ ml: 2 }}>No recent activity.</Typography>
            ) : (
              recentActivity.map((activity, index) => (
                <Grid item xs={12} md={6} key={activity._id}>
                  <Fade in timeout={400 + index * 150}>
                    <Card sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      boxShadow: theme.shadows[2],
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: theme.shadows[6],
                      }
                    }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                        {activity.createdBy?.name?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={600} variant="subtitle1">
                          {activity.createdBy?.name || 'Unknown'} created <strong>“{activity.title}”</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                        </Typography>
                      </Box>
                    </Card>
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
