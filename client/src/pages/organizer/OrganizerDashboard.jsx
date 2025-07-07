import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const drawerWidth = 240;

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const role = 'organizer'; // Or retrieve from localStorage if dynamic

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 🧭 Sidebar */}
      <Sidebar role={role} />

      {/* 📦 Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            👨‍💼 Organizer Dashboard
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Welcome! Manage your events, view submissions, and more.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/create-event')}
                >
                  ➕ Create Event
                </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => navigate('/my-events')}
                >
                  📋 My Events
                </Button>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate('/events')}
                >
                  🌐 All Events
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default OrganizerDashboard;
