import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { eventService } from '../../services/eventService';

const drawerWidth = 240;

const BookmarkedEvents = () => {
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        const res = await eventService.getBookmarkedEvents();
        setBookmarked(res.data);
      } catch (err) {
        console.error('Failed to fetch bookmarked events:', err);
      }
    };
    fetchBookmarked();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="student" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          ⭐ Bookmarked Events
        </Typography>
        <Grid container spacing={2}>
          {bookmarked.length > 0 ? (
            bookmarked.map(event => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card>
                  {event.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`}
                      alt={event.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      📍 {event.location} | 🗓 {new Date(event.date).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2">No bookmarked events yet.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookmarkedEvents;
