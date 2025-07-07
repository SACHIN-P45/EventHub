import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Card, CardMedia, CircularProgress, Toolbar
} from '@mui/material';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { eventService } from '../services/eventService';

const drawerWidth = 240;

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = 'student';

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.getAllEvents();
        const single = res.data.find(ev => ev._id === id);
        setEvent(single);
      } catch (err) {
        console.error('❌ Failed to load event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  if (!event) return <Typography variant="h6">Event not found.</Typography>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>{event.title}</Typography>
          {event.image && (
            <Card sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                height="300"
                image={
                  event.image.startsWith('http')
                    ? event.image
                    : `http://localhost:5000${event.image}`
                }
                alt={event.title}
              />
            </Card>
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>{event.description}</Typography>
          <Typography variant="subtitle1">📍 Location: {event.location}</Typography>
          <Typography variant="subtitle1">🗓 Date & Time: {new Date(event.date).toLocaleString()}</Typography>
          <Typography variant="subtitle1">📂 Category: {event.category}</Typography>
          {event.registerLink && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              🔗 <a href={event.registerLink} target="_blank" rel="noreferrer">Registration Link</a>
            </Typography>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default EventDetails;
