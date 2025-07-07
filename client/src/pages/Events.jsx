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
  CircularProgress,
  Toolbar,
  IconButton,
  Tooltip
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Sidebar from '../components/Sidebar';
import { eventService } from '../services/eventService';

const drawerWidth = 240;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = 'student'; // You can dynamically set this based on localStorage/user

  // 🔃 Fetch all events and bookmarked events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, bookmarkRes] = await Promise.all([
          eventService.getAllEvents(),
          eventService.getBookmarkedEvents(),
        ]);
        setEvents(eventRes.data);
        setBookmarkedIds(bookmarkRes.data.map(e => e._id));
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ⭐ Handle bookmark toggle
  const handleToggleBookmark = async (eventId) => {
    try {
      await eventService.bookmarkEvent(eventId);
      const updatedBookmarks = await eventService.getBookmarkedEvents();
      setBookmarkedIds(updatedBookmarks.data.map(e => e._id));
    } catch (error) {
      console.error('❌ Bookmark error:', error);
    }
  };

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
            📅 Upcoming Events
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {events.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                  No events found.
                </Typography>
              ) : (
                events.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event._id}>
                    <Card sx={{ height: '100%', position: 'relative' }}>
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <Typography variant="h6">{event.title}</Typography>
                          <Tooltip title={bookmarkedIds.includes(event._id) ? 'Remove Bookmark' : 'Add Bookmark'}>
                            <IconButton onClick={() => handleToggleBookmark(event._id)} size="small">
                              {bookmarkedIds.includes(event._id) ? (
                                <BookmarkIcon color="primary" />
                              ) : (
                                <BookmarkBorderIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                          📍 {event.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          🗓 {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {event.description.length > 100
                            ? `${event.description.substring(0, 100)}...`
                            : event.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mt: 2 }}
                          onClick={() => window.location.href = `/events/${event._id}`}
                        >
                          View Details
                        </Button>
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

export default Events;
