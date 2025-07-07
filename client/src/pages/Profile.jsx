import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  useTheme,
  styled
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import { deepPurple, amber, teal, red } from '@mui/material/colors';
import {
  Edit,
  Logout,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Error,
  Person,
  Email,
  Badge,
  Business,
  LockReset
} from '@mui/icons-material';
import { updatePassword } from '../services/authService';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: theme.shadows[8],
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[16],
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[6],
  border: `3px solid ${theme.palette.primary.main}`,
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  fontWeight: 600,
  letterSpacing: '0.5px',
  boxShadow: theme.shadows[3],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
  },
}));

const InfoItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  background: theme.palette.mode === 'light' 
    ? theme.palette.grey[50] 
    : theme.palette.grey[800],
  transition: 'background 0.3s ease',
  '&:hover': {
    background: theme.palette.mode === 'light' 
      ? theme.palette.grey[100] 
      : theme.palette.grey[700],
  },
}));

const Profile = () => {
  const theme = useTheme();
  const [user, setUser] = useState({
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'guest',
    contact: 'Not provided',
    organization: 'Not provided'
  });
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    contact: '',
    organization: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser({
        ...user,
        ...storedUser,
        contact: storedUser.contact || 'Not provided',
        organization: storedUser.organization || 'Not provided'
      });
      setProfileForm({
        name: storedUser.name,
        contact: storedUser.contact || '',
        organization: storedUser.organization || ''
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleClickShowPassword = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      return setError("❌ Please fill in all fields");
    }

    if (newPassword.length < 8) {
      return setError("❌ Password must be at least 8 characters");
    }

    if (newPassword !== confirmPassword) {
      return setError("❌ New passwords don't match");
    }

    try {
      await updatePassword({ currentPassword, newPassword });
      setSuccess('✅ Password updated successfully');
      setTimeout(() => {
        setOpenPasswordDialog(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to update password');
    }
  };

  const handleUpdateProfile = () => {
    // In a real app, this would call an API to update the profile
    const updatedUser = {
      ...user,
      name: profileForm.name,
      contact: profileForm.contact,
      organization: profileForm.organization
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess('✅ Profile updated successfully');
    setOpenProfileDialog(false);
  };

  const handleCloseSnackbar = () => {
    setError('');
    setSuccess('');
  };

  const getRoleColor = () => {
    switch (user.role.toLowerCase()) {
      case 'admin':
        return theme.palette.error.main;
      case 'organizer':
        return theme.palette.warning.main;
      case 'student':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Sidebar role={user?.role || 'student'} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Toolbar />
        
        <Container maxWidth="md" sx={{ my: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <ProfileAvatar 
                  sx={{ 
                    bgcolor: deepPurple[500],
                    fontSize: '2.5rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </ProfileAvatar>
                
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
                  {user?.name}
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: getRoleColor() + '22',
                    color: getRoleColor(),
                    px: 2,
                    py: 0.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  <Badge fontSize="small" />
                  {user?.role?.toUpperCase()}
                </Typography>
              </Box>

              <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <InfoItem>
                    <Email sx={{ mr: 2, color: theme.palette.primary.main }} />
                    <Typography variant="body1">
                      <strong>Email:</strong> {user?.email}
                    </Typography>
                  </InfoItem>
                  
                  <InfoItem>
                    <Person sx={{ mr: 2, color: theme.palette.primary.main }} />
                    <Typography variant="body1">
                      <strong>Contact:</strong> {user?.contact}
                    </Typography>
                  </InfoItem>
                  
                  <InfoItem>
                    <Business sx={{ mr: 2, color: theme.palette.primary.main }} />
                    <Typography variant="body1">
                      <strong>Organization:</strong> {user?.organization}
                    </Typography>
                  </InfoItem>
                </Grid>
                
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '12px',
                      background: theme.palette.mode === 'light' 
                        ? 'linear-gradient(135deg, #e0f7fa, #f3e5f5)' 
                        : 'linear-gradient(135deg, #263238, #4527a0)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      textAlign: 'center'
                    }}
                  >
                    <LockReset sx={{ fontSize: 48, mb: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Account Security
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Last password change: 30 days ago
                    </Typography>
                    <ProfileButton 
                      variant="contained" 
                      color="primary"
                      onClick={() => setOpenPasswordDialog(true)}
                    >
                      Change Password
                    </ProfileButton>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <ProfileButton
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => setOpenProfileDialog(true)}
                  sx={{ bgcolor: theme.palette.primary.main }}
                >
                  Edit Profile
                </ProfileButton>
                
                <ProfileButton
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  sx={{ borderColor: theme.palette.error.main, color: theme.palette.error.main }}
                >
                  Logout
                </ProfileButton>
              </Box>
            </ProfileCard>
          </motion.div>
        </Container>
      </Box>

      {/* Password Update Dialog */}
      <Dialog 
        open={openPasswordDialog} 
        onClose={() => setOpenPasswordDialog(false)} 
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <LockReset /> Update Password
        </DialogTitle>
        <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            type={showPassword.current ? 'text' : 'password'}
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('current')}
                    edge="end"
                  >
                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <TextField
            type={showPassword.new ? 'text' : 'password'}
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            helperText="Password must be at least 8 characters"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('new')}
                    edge="end"
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <TextField
            type={showPassword.confirm ? 'text' : 'password'}
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            error={newPassword !== confirmPassword && confirmPassword !== ''}
            helperText={newPassword !== confirmPassword && confirmPassword !== '' 
              ? "Passwords don't match" 
              : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword('confirm')}
                    edge="end"
                  >
                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button 
            onClick={() => setOpenPasswordDialog(false)} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdatePassword} 
            variant="contained"
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
            sx={{ borderRadius: '8px' }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Update Dialog */}
      <Dialog 
        open={openProfileDialog} 
        onClose={() => setOpenProfileDialog(false)} 
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: 'white', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Edit /> Edit Profile
        </DialogTitle>
        <DialogContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Full Name"
            value={profileForm.name}
            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
            fullWidth
          />
          
          <TextField
            label="Contact Information"
            value={profileForm.contact}
            onChange={(e) => setProfileForm({...profileForm, contact: e.target.value})}
            fullWidth
            helperText="Phone number or other contact method"
          />
          
          <TextField
            label="Organization"
            value={profileForm.organization}
            onChange={(e) => setProfileForm({...profileForm, organization: e.target.value})}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button 
            onClick={() => setOpenProfileDialog(false)} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpdateProfile} 
            variant="contained"
            disabled={!profileForm.name}
            sx={{ borderRadius: '8px' }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbars for notifications */}
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity="error" 
          icon={<Error />}
          onClose={handleCloseSnackbar}
          sx={{ 
            bgcolor: red[50], 
            color: theme.palette.error.dark,
            border: `1px solid ${theme.palette.error.light}`,
            borderRadius: '12px',
            boxShadow: theme.shadows[3],
            alignItems: 'center'
          }}
        >
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          icon={<CheckCircle />}
          onClose={handleCloseSnackbar}
          sx={{ 
            bgcolor: theme.palette.success.light, 
            color: theme.palette.success.dark,
            border: `1px solid ${theme.palette.success.main}`,
            borderRadius: '12px',
            boxShadow: theme.shadows[3],
            alignItems: 'center'
          }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;