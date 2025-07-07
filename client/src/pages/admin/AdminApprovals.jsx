import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Toolbar,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { eventService } from '../../services/eventService';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const drawerWidth = 260; // match the Sidebar drawer width

const AdminApprovals = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const role = 'admin';

  const fetchPendingEvents = async () => {
    setLoading(true);
    try {
      const res = await eventService.getPendingEvents();
      setPendingEvents(res.data);
    } catch (err) {
      console.error('❌ Error fetching pending events', err);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, approved) => {
    try {
      await eventService.approveEvent(id, approved);
      toast.success(`Event ${approved ? 'approved' : 'rejected and deleted'} successfully`);
      setPendingEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      console.error('❌ Approval error:', err);
      toast.error('Approval failed');
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar role={role} darkMode={darkMode} onThemeChange={toggleTheme} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }, // ✅ This ensures content is not hidden behind sidebar
        }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            🛂 Pending Event Approvals
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : pendingEvents.length === 0 ? (
            <Typography>No pending events for approval.</Typography>
          ) : (
            <Grid container spacing={3}>
              {pendingEvents.map((event) => (
                <Grid item xs={12} md={6} key={event._id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Typography variant="h6">{event.title}</Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {dayjs(event.date).format('DD MMM YYYY, h:mm A')} — {event.location}
                      </Typography>
                      <Chip label={event.category} size="small" sx={{ mb: 1 }} />
                      <Typography variant="body2">{event.description}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        👤 Created by: {event.createdBy?.name || 'Unknown'} ({event.createdBy?.email || 'N/A'})
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: 'auto' }}>
                      <Button
                        color="success"
                        variant="outlined"
                        onClick={() => handleApproval(event._id, true)}
                      >
                        ✅ Approve
                      </Button>
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to reject and permanently delete this event?'
                            )
                          ) {
                            handleApproval(event._id, false);
                          }
                        }}
                      >
                        ❌ Reject
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminApprovals;
