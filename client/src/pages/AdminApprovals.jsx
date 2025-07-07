import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Card, CardContent, Grid, Button, Chip
} from '@mui/material';
import { eventService } from '../services/eventService';
import dayjs from 'dayjs';

const AdminApprovals = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await eventService.getPendingEvents();
      setPendingEvents(res.data);
    } catch (err) {
      console.error('❌ Error fetching pending events', err);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      await eventService.approveEvent(id, decision);
      fetchPending(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Approval failed');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Pending Event Approvals</Typography>
      <Grid container spacing={3}>
        {pendingEvents.map((event) => (
          <Grid item xs={12} md={6} key={event._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2" gutterBottom>
                  {dayjs(event.date).format('DD MMM YYYY, h:mm A')} — {event.location}
                </Typography>
                <Chip label={event.category} color="primary" size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {event.description}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleDecision(event._id, true)}
                    >
                      Approve
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDecision(event._id, false)}
                    >
                      Reject
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminApprovals;
