import React, { useState, useEffect } from 'react';
import { 
  Container, TextField, Button, Typography, Alert, 
  Box, Grid, Paper, Fade, InputAdornment, IconButton, 
  FormControl, OutlinedInput, InputLabel, FormHelperText,
  Divider, Link, CircularProgress, Slide, Zoom, Snackbar
} from '@mui/material';
import { 
  Email, Lock, Visibility, VisibilityOff, 
  Google, Facebook, GitHub, ArrowBack, VerifiedUser, Security
} from '@mui/icons-material';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations after component mounts
    setIsMounted(true);
    
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
    if (name === 'email' && emailError) setEmailError('');
    if (name === 'password' && passwordError) setPasswordError('');
    if (error) setError('');
    
    // Calculate password strength
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[a-z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      setSecurityLevel(strength);
    }
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!form.email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    
    if (!form.password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (form.password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      setPasswordError('Password must contain uppercase, lowercase, and number');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await loginUser(form);
      const { token, user } = res.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Show success animation
      setShowSuccess(true);
      
      setTimeout(() => {
        // Role-based redirect
        if (user.role === 'student') {
          navigate('/student/dashboard');
        } else if (user.role === 'organizer') {
          navigate('/organizer/dashboard');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          setError('Unknown role');
        }
      }, 1500);

    } catch (err) {
      setIsSubmitting(false);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Logging in with ${provider} - This would redirect to authentication in a real app`);
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
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)`,
          transform: 'rotate(30deg)',
        }}
      />
      
      <motion.div
        initial={{ x: 100, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106, 17, 203, 0.2) 0%, transparent 70%)',
          transform: 'translate(50%, -50%)',
        }}
      />
      
      <motion.div
        initial={{ x: -100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 117, 252, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, 50%)',
        }}
      />

      <Container maxWidth="md">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Slide in={isMounted} direction="up" timeout={500}>
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
                  <Zoom in={isMounted} timeout={800} style={{ transitionDelay: isMounted ? '300ms' : '0ms' }}>
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
                  </Zoom>
                  
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
                    <Zoom in={isMounted} timeout={800}>
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
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700, 
                        mb: 1,
                        color: 'white',
                      }}>
                        Welcome Back
                      </Typography>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Typography variant="body1" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxWidth: 500,
                        mx: 'auto'
                      }}>
                        Sign in to access your personalized dashboard and manage events
                      </Typography>
                    </motion.div>
                  </Box>
                  
                  {error && (
                    <Fade in={true}>
                      <Alert severity="error" sx={{ 
                        mb: 3,
                        background: 'rgba(244, 67, 54, 0.15)',
                        color: 'white',
                        border: '1px solid rgba(244, 67, 54, 0.3)'
                      }}>
                        {error}
                      </Alert>
                    </Fade>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        error={!!emailError}
                        helperText={emailError}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                        InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                        inputProps={{ style: { color: 'white' } }}
                        FormHelperTextProps={{ style: { color: '#ff5252' } }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <FormControl fullWidth variant="outlined" margin="normal" error={!!passwordError}>
                        <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Password</InputLabel>
                        <OutlinedInput
                          label="Password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={form.password}
                          onChange={handleChange}
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
                        {passwordError && <FormHelperText sx={{ color: '#ff5252' }}>{passwordError}</FormHelperText>}
                        
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
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Link 
                          underline="hover"
                          onClick={() => navigate('/forgot-password')}
                          sx={{ 
                            color: '#2575fc', 
                            fontWeight: 500,
                            cursor: 'pointer',
                            '&:hover': { color: '#6a11cb' }
                          }}
                        >
                          Forgot Password?
                        </Link>
                      </Box>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
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
                            Sign In
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
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                    >
                      <Divider sx={{ 
                        my: 4, 
                        color: 'rgba(255, 255, 255, 0.3)',
                        '&::before, &::after': {
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}>
                        or continue with
                      </Divider>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.8 }}
                    >
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={4}>
                          <Button 
                            fullWidth 
                            variant="outlined" 
                            startIcon={<Google />}
                            onClick={() => handleSocialLogin('Google')}
                            sx={{
                              py: 1.5,
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              backgroundColor: 'rgba(219, 68, 55, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(219, 68, 55, 0.2)',
                                borderColor: '#C1351E'
                              }
                            }}
                          >
                            Google
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button 
                            fullWidth 
                            variant="outlined" 
                            startIcon={<Facebook />}
                            onClick={() => handleSocialLogin('Facebook')}
                            sx={{
                              py: 1.5,
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              backgroundColor: 'rgba(66, 103, 178, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(66, 103, 178, 0.2)',
                                borderColor: '#365899'
                              }
                            }}
                          >
                            Facebook
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button 
                            fullWidth 
                            variant="outlined" 
                            startIcon={<GitHub />}
                            onClick={() => handleSocialLogin('GitHub')}
                            sx={{
                              py: 1.5,
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              backgroundColor: 'rgba(51, 51, 51, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(51, 51, 51, 0.2)',
                                borderColor: '#24292e'
                              }
                            }}
                          >
                            GitHub
                          </Button>
                        </Grid>
                      </Grid>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.0 }}
                    >
                      <Typography variant="body2" align="center" sx={{ mt: 3, color: 'rgba(255, 255, 255, 0.7)' }}>
                        Don't have an account?{' '}
                        <Button 
                          color="primary" 
                          onClick={() => navigate('/register')}
                          sx={{ 
                            textTransform: 'none', 
                            fontWeight: 600,
                            p: 0,
                            color: '#2575fc',
                            '&:hover': { backgroundColor: 'transparent' }
                          }}
                        >
                          Create Account
                        </Button>
                      </Typography>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2.2 }}
                    >
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
                    </motion.div>
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
          Login successful! Redirecting to dashboard...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;