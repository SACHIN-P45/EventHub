import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Toolbar,
  Paper,
  Divider,
  Tabs,
  Tab,
  Button,
  IconButton,
} from '@mui/material';
import { eventService } from '../../services/eventService';
import dayjs from 'dayjs';
import Sidebar from '../../components/Sidebar';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TodayIcon from '@mui/icons-material/Today';

const drawerWidth = 240;

const TabPanel = ({ children, value, index }) => {
  return value === index && <Box sx={{ mt: 2 }}>{children}</Box>;
};

const StudentDashboard = () => {
  const [registered, setRegistered] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [tab, setTab] = useState(0);

  const fetchStudentEvents = async () => {
    try {
      const regRes = await eventService.getRegisteredEvents();
      const bmRes = await eventService.getBookmarkedEvents();
      setRegistered(regRes.data);
      setBookmarked(bmRes.data);
      setBookmarkedIds(new Set(bmRes.data.map((e) => e._id)));
    } catch (err) {
      console.error('❌ Failed to load student dashboard data', err);
    }
  };

  useEffect(() => {
    fetchStudentEvents();
  }, []);

  const upcomingCount = registered.filter((event) =>
    dayjs(event.date).isAfter(dayjs())
  ).length;

  const toggleBookmark = async (eventId) => {
    try {
      const res = await eventService.bookmarkEvent(eventId);
      const { bookmarked: isNowBookmarked } = res.data;

      setBookmarkedIds((prev) => {
        const newSet = new Set(prev);
        if (isNowBookmarked) {
          newSet.add(eventId);
        } else {
          newSet.delete(eventId);
        }
        return newSet;
      });

      // Refetch bookmarked events only on bookmarked tab
      if (tab === 1) {
        const bmRes = await eventService.getBookmarkedEvents();
        setBookmarked(bmRes.data);
      }
    } catch (err) {
      console.error('❌ Bookmark toggle failed:', err);
    }
  };

  const renderEvents = (events, allowToggle = false) =>
    events.map((event) => (
      <Grid item xs={12} md={6} key={event._id}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📅 {dayjs(event.date).format('DD MMM YYYY, h:mm A')} | 📍 {event.location}
            </Typography>

            <Chip
              label={event.approved ? '✅ Approved' : '⏳ Pending'}
              color={event.approved ? 'success' : 'warning'}
              size="small"
              sx={{ mt: 1 }}
            />

            <Typography variant="body2" sx={{ mt: 1 }}>
              {event.description?.substring(0, 100)}...
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => alert(`📍 Navigate to event detail: ${event._id}`)}
              >
                View More
              </Button>

              {allowToggle && (
                <IconButton
                  size="small"
                  color={bookmarkedIds.has(event._id) ? 'error' : 'default'}
                  onClick={() => toggleBookmark(event._id)}
                >
                  {bookmarkedIds.has(event._id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ));

  const role = 'student';

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <SchoolIcon sx={{ mr: 1 }} />
            Student Dashboard
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <PlaylistAddCheckIcon fontSize="large" color="primary" />
                <Typography variant="subtitle1">Registered</Typography>
                <Typography variant="h5">{registered.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <BookmarkIcon fontSize="large" color="secondary" />
                <Typography variant="subtitle1">Bookmarked</Typography>
                <Typography variant="h5">{bookmarkedIds.size}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                <TodayIcon fontSize="large" color="success" />
                <Typography variant="subtitle1">Upcoming</Typography>
                <Typography variant="h5">{upcomingCount}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs
              value={tab}
              onChange={(e, newVal) => setTab(newVal)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Registered Events" icon={<EventAvailableIcon />} iconPosition="start" />
              <Tab label="Bookmarked Events" icon={<StarIcon />} iconPosition="start" />
            </Tabs>

            <Divider sx={{ my: 2 }} />

            <TabPanel value={tab} index={0}>
              <Grid container spacing={2}>
                {registered.length > 0 ? (
                  renderEvents(registered, true)
                ) : (
                  <Typography>No registered events.</Typography>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={tab} index={1}>
              <Grid container spacing={2}>
                {bookmarked.length > 0 ? (
                  renderEvents(bookmarked, true)
                ) : (
                  <Typography>No bookmarked events.</Typography>
                )}
              </Grid>
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default StudentDashboard;

