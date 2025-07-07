import React from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  useTheme, useMediaQuery, Avatar, Paper, AppBar, Toolbar,
  IconButton, Divider, Chip, Stack, InputAdornment, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  EventAvailable, AppRegistration, Celebration,
  School, People, Explore, EmojiEvents, TrendingUp,
  VerifiedUser, LocationCity, SentimentVerySatisfied,
  Search, Menu, Facebook, Twitter, Instagram, LinkedIn,
  ArrowForward
} from '@mui/icons-material';

const categories = [
  { label: "Cultural", color: "#FF6B6B", icon: <Celebration />, bg: "#FFF5F5" },
  { label: "Technical", color: "#4D96FF", icon: <Explore />, bg: "#F5F9FF" },
  { label: "Management", color: "#6BCB77", icon: <TrendingUp />, bg: "#F5FFF7" },
  { label: "Workshop", color: "#FFD93D", icon: <School />, bg: "#FFFDF5" },
  { label: "Seminar", color: "#A459D1", icon: <People />, bg: "#FBF5FF" },
  { label: "Hackathon", color: "#FF8E50", icon: <EmojiEvents />, bg: "#FFF5F0" }, // Updated color
];

const statsData = [
  { number: '10K+', label: 'Events Listed', icon: <EventAvailable /> },
  { number: '500+', label: 'Colleges', icon: <LocationCity /> },
  { number: '1M+', label: 'Students', icon: <People /> },
  { number: '95%', label: 'Satisfaction', icon: <SentimentVerySatisfied /> }
];

const howItWorksData = [
  {
    step: '1',
    title: 'Discover Events',
    description: 'Browse thousands of events by category, date, or location with our powerful search tools.',
    icon: <EventAvailable sx={{ fontSize: '40px' }} />,
    color: '#2196F3'
  },
  {
    step: '2',
    title: 'Register Instantly',
    description: 'Secure your spot with a single click – no complicated forms or waiting periods.',
    icon: <AppRegistration sx={{ fontSize: '40px' }} />,
    color: '#4CAF50'
  },
  {
    step: '3',
    title: 'Attend & Enjoy',
    description: 'Receive your digital ticket, connect with attendees, and create unforgettable memories!',
    icon: <Celebration sx={{ fontSize: '40px' }} />,
    color: '#9C27B0'
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      background: 'radial-gradient(circle at 10% 20%, rgba(245,245,255,0.8) 0%, rgba(255,255,255,1) 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Modern App Bar */}
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ 
        backdropFilter: 'blur(8px)', 
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ 
                background: 'linear-gradient(45deg, #673AB7 10%, #9C27B0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Poppins", sans-serif',
                mr: 4
              }}>
                EventHub
              </Typography>
              
              {!isMobile && (
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Button color="inherit" sx={{ fontWeight: 600 }}>Events</Button>
                  <Button color="inherit" sx={{ fontWeight: 600 }}>Categories</Button>
                  <Button color="inherit" sx={{ fontWeight: 600 }}>Organizers</Button>
                  <Button color="inherit" sx={{ fontWeight: 600 }}>Resources</Button>
                </Box>
              )}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search events..."
                sx={{ 
                  width: isMobile ? 140 : 200,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 20,
                    height: 40,
                    fontSize: 14
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              
              {isMobile ? (
                <IconButton color="inherit">
                  <Menu />
                </IconButton>
              ) : (
                <>
                  <Button 
                    variant="text" 
                    color="inherit" 
                    onClick={() => navigate('/login')}
                    sx={{ fontWeight: 600 }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/register')}
                    sx={{
                      borderRadius: 20,
                      fontWeight: 600,
                      textTransform: 'none',
                      px: 3,
                      background: 'linear-gradient(45deg, #673AB7 0%, #9C27B0 100%)',
                      boxShadow: '0 4px 12px rgba(103, 58, 183, 0.25)',
                      '&:hover': {
                        boxShadow: '0 6px 16px rgba(103, 58, 183, 0.35)',
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ 
        py: 8, 
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* Hero Section - Centered */}
        <Grid container alignItems="center" justifyContent="center" spacing={6} sx={{ mb: 15, width: '100%' }}>
          <Grid item xs={12} md={6} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              fontWeight="bold"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #673AB7 10%, #9C27B0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: '-0.5px',
                lineHeight: 1.2,
                mb: 3
              }}
            >
              Discover & Register for College Events Nationwide
            </Typography>
            
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="text.secondary"
              mb={6}
              sx={{ 
                fontFamily: '"Inter", sans-serif', 
                maxWidth: 700,
                lineHeight: 1.6
              }}
            >
              India's premier platform connecting students with the best college fests, workshops, and competitions across the country
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate('/register')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '50px',
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1.2 : 1.8,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #673AB7 0%, #9C27B0 100%)',
                  boxShadow: '0 4px 20px rgba(103, 58, 183, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(103, 58, 183, 0.4)',
                    background: 'linear-gradient(45deg, #5E35B1 0%, #8E24AA 100%)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                Join as Student
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate('/register?roles=organizer')}
                sx={{
                  textTransform: 'none',
                  borderRadius: '50px',
                  px: isMobile ? 3 : 5,
                  py: isMobile ? 1.2 : 1.8,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  fontWeight: 600,
                  borderWidth: '2px',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderWidth: '2px',
                    transform: 'translateY(-3px)',
                    backgroundColor: 'rgba(103, 58, 183, 0.04)',
                    boxShadow: '0 4px 12px rgba(103, 58, 183, 0.1)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                }}
              >
                Join as Organizer
              </Button>
            </Box>
            
            <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Avatar key={i} sx={{ 
                  width: 40, 
                  height: 40, 
                  border: '2px solid white',
                  ml: i > 0 ? -1.5 : 0,
                  bgcolor: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#A459D1'][i]
                }}>
                  {i+1}
                </Avatar>
              ))}
              <Typography variant="body2" color="text.secondary">
                <b>10,000+</b> students already registered
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6} sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Paper elevation={0} sx={{ 
              borderRadius: 4, 
              overflow: 'hidden', 
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(103, 58, 183, 0.15)',
              width: '100%',
              maxWidth: 600,
              minHeight: 400,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Box sx={{ 
                width: '100%',
                background: 'linear-gradient(135deg, rgba(103,58,183,0.05) 0%, rgba(255,255,255,1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 4,
                border: '1px solid rgba(103, 58, 183, 0.1)'
              }}>
                <Box sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  bgcolor: 'rgba(103, 58, 183, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  color: 'primary.main'
                }}>
                  <EventAvailable sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  Find Your Next Event
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 500, mb: 3 }}>
                  Discover exciting events happening near you or at campuses across India
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 50 }}
                >
                  Explore Events
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Categories */}
        <Box mt={15} mb={12} sx={{ width: '100%' }}>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}>
            <Chip 
              label="Popular Categories" 
              color="primary" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(103, 58, 183, 0.1)', 
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
              }} 
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: 'text.primary',
                mb: 2
              }}
            >
              Explore Event Categories
            </Typography>
            <Typography color="text.secondary">
              Discover events tailored to your interests across diverse categories
            </Typography>
          </Box>
          
          <Grid container spacing={3} justifyContent="center">
            {categories.map((cat) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={cat.label} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card
                  sx={{
                    backgroundColor: cat.bg,
                    color: cat.color,
                    textAlign: 'center',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    minHeight: '160px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.04)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 16px 32px ${cat.color}40`,
                      backgroundColor: cat.color,
                      color: '#fff',
                      '& .MuiAvatar-root': {
                        backgroundColor: 'rgba(255,255,255,0.2)'
                      }
                    }
                  }}
                >
                  <CardContent>
                    <Avatar sx={{ 
                      bgcolor: `${cat.color}20`,
                      width: 60, 
                      height: 60,
                      mb: 2,
                      mx: 'auto',
                      transition: 'all 0.3s ease'
                    }}>
                      {React.cloneElement(cat.icon, { sx: { fontSize: '28px' } })}
                    </Avatar>
                    <Typography 
                      fontWeight="bold" 
                      sx={{ 
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '1.1rem'
                      }}
                    >
                      {cat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* How it works */}
        <Box mt={15} mb={12} sx={{ position: 'relative', width: '100%' }}>
          <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6 }}>
            <Chip 
              label="Simple Process" 
              color="primary" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(33, 150, 243, 0.1)', 
                color: '#2196F3',
                fontWeight: 600,
                mb: 2
              }} 
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontFamily: '"Poppins", sans-serif',
                color: 'text.primary',
                mb: 2
              }}
            >
              How It Works
            </Typography>
            <Typography color="text.secondary">
              Get started in just three simple steps and never miss an exciting event
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {howItWorksData.map((step) => (
              <Grid item xs={12} md={4} key={step.title} sx={{ 
                position: 'relative', 
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Paper
                  elevation={4}
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    borderRadius: '16px',
                    height: '100%',
                    background: '#fff',
                    borderTop: `6px solid ${step.color}`,
                    position: 'relative',
                    overflow: 'visible',
                    maxWidth: 380,
                    width: '100%',
                    '&::before': {
                      content: `"${step.step}"`,
                      position: 'absolute',
                      top: -28,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: step.color,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                      boxShadow: `0 4px 12px ${step.color}80`
                    },
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: `0 12px 28px ${step.color}30`,
                      '&::before': {
                        transform: 'translateX(-50%) scale(1.1)'
                      }
                    }
                  }}
                >
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: `${step.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: step.color,
                    border: `2px solid ${step.color}30`
                  }}>
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={2}
                    sx={{ 
                      fontFamily: '"Poppins", sans-serif',
                      color: 'text.primary'
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ 
                      fontFamily: '"Inter", sans-serif', 
                      lineHeight: 1.7,
                      fontSize: '1.05rem'
                    }}
                  >
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            backgroundColor: 'rgba(103, 58, 183, 0.03)',
            borderRadius: '20px',
            py: 8,
            px: 4,
            mb: 12,
            border: '1px solid rgba(103, 58, 183, 0.08)',
            boxShadow: '0 8px 32px rgba(103, 58, 183, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, #673AB7 0%, #9C27B0 100%)'
            }
          }}
        >
          <Grid container spacing={6} justifyContent="center">
            {statsData.map((stat) => (
              <Grid item xs={6} sm={3} key={stat.label} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box textAlign="center" sx={{ maxWidth: 200 }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(103, 58, 183, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                    color: 'primary.main'
                  }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: '32px' } })}
                  </Box>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    sx={{
                      background: 'linear-gradient(45deg, #673AB7 0%, #9C27B0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontFamily: '"Poppins", sans-serif',
                      lineHeight: 1.2,
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Organizer CTA */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(255,255,255,1) 100%)',
            borderRadius: '20px',
            py: 8,
            px: 4,
            border: '1px solid rgba(76, 175, 80, 0.1)',
            boxShadow: '0 8px 32px rgba(76, 175, 80, 0.08)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '5px',
              background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)'
            }
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ 
              fontFamily: '"Poppins", sans-serif',
              color: 'text.primary'
            }}
          >
            Are You an Event Organizer?
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            mb={6}
            sx={{
              fontFamily: '"Inter", sans-serif',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            Submit your college fest and get featured on India's largest student event platform with access to thousands of potential attendees.
          </Typography>
          
          <Button
            variant="contained"
            color="success"
            size="large"
            startIcon={<VerifiedUser />}
            sx={{
              textTransform: 'none',
              borderRadius: '50px',
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #4CAF50 0%, #8BC34A 100%)',
              boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
                background: 'linear-gradient(45deg, #43A047 0%, #7CB342 100%)'
              },
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
            }}
            onClick={() => navigate('/submit')}
          >
            Submit Your Event
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        pt: 8,
        pb: 4,
        width: '100%'
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ 
                background: 'linear-gradient(45deg, #673AB7 10%, #9C27B0 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Poppins", sans-serif',
                mb: 2,
                textAlign: { xs: 'center', md: 'left' }
              }}>
                EventHub
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 400, mb: 3, textAlign: { xs: 'center', md: 'left' } }}>
                Connecting students with the best college events across India. Discover, register, and enjoy campus life to the fullest.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton sx={{ bgcolor: 'rgba(103, 58, 183, 0.1)', color: 'primary.main' }}>
                  <Facebook />
                </IconButton>
                <IconButton sx={{ bgcolor: 'rgba(103, 58, 183, 0.1)', color: 'primary.main' }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ bgcolor: 'rgba(103, 58, 183, 0.1)', color: 'primary.main' }}>
                  <Instagram />
                </IconButton>
                <IconButton sx={{ bgcolor: 'rgba(103, 58, 183, 0.1)', color: 'primary.main' }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
            
            <Grid item xs={6} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>Explore</Typography>
              <Stack spacing={1.5}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Events</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Categories</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Organizers</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Trending</Button>
              </Stack>
            </Grid>
            
            <Grid item xs={6} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>Resources</Typography>
              <Stack spacing={1.5}>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Blog</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Help Center</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>FAQs</Button>
                <Button color="inherit" sx={{ justifyContent: 'flex-start', p: 0 }}>Contact</Button>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>Subscribe</Typography>
              <Typography color="text.secondary" mb={2} textAlign={{ xs: 'center', md: 'left' }}>
                Get updates on upcoming events in your area
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, width: '100%', maxWidth: 400 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Your email"
                  fullWidth
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ borderRadius: 20, px: 3, whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 6 }} />
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="body2" color="text.secondary">
              © 2023 EventHub. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button color="inherit" size="small">Privacy Policy</Button>
              <Button color="inherit" size="small">Terms of Service</Button>
              <Button color="inherit" size="small">Cookie Policy</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;