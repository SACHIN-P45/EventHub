import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Toolbar,
  CircularProgress
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import { eventService } from '../services/eventService';

const drawerWidth = 240;

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = 'organizer'; // Assuming only organizers access this

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await eventService.getMyEvents();
        setEvents(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch your events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            📌 My Events
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {events.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No events created by you yet.
                </Typography>
              ) : (
                events.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event._id}>
                    <Card>
                      {event.image && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            event.image.startsWith('http')
                              ? event.image
                              : `http://localhost:5000${event.image}`
                          }
                          alt={event.title}
                        />
                      )}
                      <CardContent>
                        <Typography variant="h6">{event.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          🗓 {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📍 {event.location}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {event.description.length > 100
                            ? event.description.slice(0, 100) + '...'
                            : event.description}
                        </Typography>
                        {event.registerLink && (
                          <Button
                            href={event.registerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                          >
                            Registration Link
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default MyEvents;
