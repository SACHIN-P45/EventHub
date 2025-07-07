import React, { useState, useEffect, useRef } from 'react';
import {
  Container, TextField, Button, Typography, MenuItem, Alert,
  Box, Grid, Paper, Fade, InputAdornment, IconButton,
  FormControl, OutlinedInput, InputLabel, FormHelperText,
  CircularProgress, Slide, Zoom, Snackbar  // Added Snackbar
} from '@mui/material';
import { 
  Person, Email, Lock, Visibility, VisibilityOff, 
  School, Group, AdminPanelSettings, ArrowBack, 
  VerifiedUser, Security
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../../services/authService';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    roleSecret: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  useEffect(() => {
    // Simulate security check
    const timer = setTimeout(() => {
      setSecurityLevel(100);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setServerError('');
    
    // Show security tip when password is being entered
    if (name === 'password' && value.length > 0) {
      // Calculate password strength
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[a-z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      setSecurityLevel(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    if ((form.role === 'organizer' || form.role === 'admin') && !form.roleSecret.trim()) {
      newErrors.roleSecret = 'Secret key is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await registerUser(form);
      setIsSubmitting(false);
      
      // Show success animation
      setShowSuccess(true);
      
      // Navigate after delay
      setTimeout(() => {
        navigate('/login', { state: { registrationSuccess: true } });
      }, 1500);
    } catch (err) {
      setIsSubmitting(false);
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const getRoleIcon = () => {
    switch (form.role) {
      case 'organizer': return <Group sx={{ color: '#6a11cb' }} />;
      case 'admin': return <AdminPanelSettings sx={{ color: '#ff416c' }} />;
      default: return <School sx={{ color: '#4a00e0' }} />;
    }
  };

  const getRoleDescription = () => {
    switch (form.role) {
      case 'student':
        return 'Join as a student to discover and register for exciting events';
      case 'organizer':
        return 'Create and manage events as an event organizer';
      case 'admin':
        return 'Administrative access to manage the platform';
      default:
        return '';
    }
  };

  const SecurityIndicator = ({ level }) => {
    const getColor = () => {
      if (level < 30) return '#ff5252';
      if (level < 70) return '#ffb142';
      return '#2ed573';
    };
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Box sx={{ 
          width: '100%', 
          height: 6, 
          bgcolor: '#e0e0e0', 
          borderRadius: 3, 
          overflow: 'hidden',
          mr: 1
        }}>
          <Box sx={{ 
            width: `${level}%`, 
            height: '100%', 
            bgcolor: getColor(),
            transition: 'width 0.5s ease, background-color 0.5s ease'
          }} />
        </Box>
        <Typography variant="caption" sx={{ color: getColor(), fontWeight: 600 }}>
          {level}%
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      p: 2,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background elements */}
      <Box sx={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`,
        transform: 'rotate(30deg)',
      }} />
      
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(106, 17, 203, 0.2) 0%, transparent 70%)',
        transform: 'translate(50%, -50%)',
      }} />
      
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37, 117, 252, 0.15) 0%, transparent 70%)',
        transform: 'translate(-50%, 50%)',
      }} />

      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Slide in direction="up" timeout={500}>
              <Paper elevation={24} sx={{ 
                borderRadius: 4, 
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 1,
              }}>
                <Box sx={{ 
                  p: { xs: 3, sm: 4, md: 6 },
                  position: 'relative',
                }}>
                  {/* Security Shield */}
                  <Box sx={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4caf50',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <Security fontSize="small" />
                  </Box>
                  
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      top: 24, 
                      left: 24,
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                    onClick={() => navigate('/')}
                  >
                    <ArrowBack />
                  </IconButton>
                  
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Zoom in timeout={800}>
                      <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 8px 20px rgba(106, 17, 203, 0.4)',
                      }}>
                        <VerifiedUser sx={{ fontSize: 40, color: 'white' }} />
                      </Box>
                    </Zoom>
                    
                    <Typography variant="h4" sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      color: 'white',
                    }}>
                      Create Account
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      maxWidth: 500,
                      mx: 'auto'
                    }}>
                      Join our platform to discover and create amazing events
                    </Typography>
                  </Box>
                  
                  {serverError && (
                    <Fade in={true}>
                      <Alert severity="error" sx={{ 
                        mb: 3,
                        background: 'rgba(244, 67, 54, 0.15)',
                        color: 'white',
                        border: '1px solid rgba(244, 67, 54, 0.3)'
                      }}>
                        {serverError}
                      </Alert>
                    </Fade>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          onChange={handleChange}
                          value={form.name}
                          error={!!errors.name}
                          helperText={errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 2 }}
                          InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                          inputProps={{ style: { color: 'white' } }}
                          FormHelperTextProps={{ style: { color: '#ff5252' } }}
                        />
                        
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          onChange={handleChange}
                          value={form.email}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: 2 }}
                          InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                          inputProps={{ style: { color: 'white' } }}
                          FormHelperTextProps={{ style: { color: '#ff5252' } }}
                        />
                        
                        <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.password}>
                          <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Password</InputLabel>
                          <OutlinedInput
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            inputRef={passwordRef}
                            inputProps={{ style: { color: 'white' } }}
                            startAdornment={
                              <InputAdornment position="start">
                                <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                              </InputAdornment>
                            }
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {errors.password && <FormHelperText sx={{ color: '#ff5252' }}>{errors.password}</FormHelperText>}
                          
                          {form.password && (
                            <Box sx={{ 
                              mt: 2, 
                              p: 2, 
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderRadius: 2,
                              borderLeft: '3px solid #2575fc'
                            }}>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.7)',
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1
                              }}>
                                <Security fontSize="small" sx={{ mr: 1 }} />
                                Password Strength
                              </Typography>
                              <SecurityIndicator level={securityLevel} />
                              <Typography variant="caption" sx={{ 
                                color: 'rgba(255, 255, 255, 0.5)',
                                display: 'block',
                                mt: 1
                              }}>
                                {securityLevel < 70 
                                  ? 'Use uppercase, lowercase, numbers, and symbols' 
                                  : 'Strong password! Good job.'}
                              </Typography>
                            </Box>
                          )}
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          select
                          label="Account Type"
                          name="role"
                          value={form.role}
                          onChange={handleChange}
                          sx={{ mb: 3 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {getRoleIcon()}
                              </InputAdornment>
                            ),
                          }}
                          InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                          inputProps={{ style: { color: 'white' } }}
                        >
                          <MenuItem value="student">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <School sx={{ mr: 1, color: '#4a00e0' }} /> Student
                            </Box>
                          </MenuItem>
                          <MenuItem value="organizer">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Group sx={{ mr: 1, color: '#6a11cb' }} /> Organizer
                            </Box>
                          </MenuItem>
                          <MenuItem value="admin">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AdminPanelSettings sx={{ mr: 1, color: '#ff416c' }} /> Admin
                            </Box>
                          </MenuItem>
                        </TextField>
                        
                        <Box sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 2,
                          p: 3,
                          mb: 3,
                          borderLeft: '3px solid',
                          borderColor: form.role === 'student' ? '#4a00e0' : 
                                      form.role === 'organizer' ? '#6a11cb' : '#ff416c'
                        }}>
                          <Typography variant="body2" sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: 500,
                            mb: 1
                          }}>
                            {form.role.charAt(0).toUpperCase() + form.role.slice(1)} Account
                          </Typography>
                          <Typography variant="caption" sx={{ 
                            color: 'rgba(255, 255, 255, 0.5)',
                            display: 'block'
                          }}>
                            {getRoleDescription()}
                          </Typography>
                        </Box>

                        {(form.role === 'organizer' || form.role === 'admin') && (
                          <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.roleSecret}>
                            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Secret Key</InputLabel>
                            <OutlinedInput
                              label="Secret Key"
                              name="roleSecret"
                              type={showSecret ? 'text' : 'password'}
                              value={form.roleSecret}
                              onChange={handleChange}
                              inputProps={{ style: { color: 'white' } }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowSecret(!showSecret)}
                                    edge="end"
                                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                  >
                                    {showSecret ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            {errors.roleSecret && <FormHelperText sx={{ color: '#ff5252' }}>{errors.roleSecret}</FormHelperText>}
                            <Typography variant="caption" sx={{ 
                              color: 'rgba(255, 255, 255, 0.5)',
                              display: 'block',
                              mt: 1
                            }}>
                              {form.role === 'organizer' 
                                ? 'Organizer key required to create events' 
                                : 'Admin key required for platform management'}
                            </Typography>
                          </FormControl>
                        )}
                      </Grid>
                    </Grid>
                    
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        size="large"
                        disabled={isSubmitting}
                        sx={{
                          mt: 4,
                          py: 1.8,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #5e0db4 0%, #1c6df2 100%)',
                            boxShadow: '0 8px 20px rgba(106, 17, 203, 0.6)',
                          },
                          boxShadow: '0 6px 15px rgba(106, 17, 203, 0.5)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                          <>
                            Create Account
                            {showSuccess && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 10, opacity: 0 }}
                                transition={{ duration: 0.8 }}
                                style={{
                                  position: 'absolute',
                                  width: 20,
                                  height: 20,
                                  borderRadius: '50%',
                                  background: 'rgba(255, 255, 255, 0.5)',
                                }}
                              />
                            )}
                          </>
                        )}
                      </Button>
                    </motion.div>
                    
                    <Typography variant="body2" align="center" sx={{ mt: 3, color: 'rgba(255, 255, 255, 0.7)' }}>
                      Already have an account?{' '}
                      <Button 
                        color="primary" 
                        onClick={() => navigate('/login')}
                        sx={{ 
                          textTransform: 'none', 
                          fontWeight: 600,
                          p: 0,
                          color: '#2575fc',
                          '&:hover': { backgroundColor: 'transparent' }
                        }}
                      >
                        Sign In
                      </Button>
                    </Typography>
                    
                    <Box sx={{ 
                      mt: 4, 
                      p: 2, 
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: 2,
                      textAlign: 'center'
                    }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        <Security fontSize="inherit" sx={{ fontSize: 12, mr: 0.5 }} />
                        Your information is protected with enterprise-grade security measures
                      </Typography>
                    </Box>
                  </form>
                </Box>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
      </Container>
      
      {/* Success notification */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          icon={<VerifiedUser />}
          sx={{ 
            background: 'rgba(46, 213, 115, 0.9)',
            color: 'white',
            backdropFilter: 'blur(10px)',
            width: '100%',
          }}
        >
          Account created successfully! Redirecting to login...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;