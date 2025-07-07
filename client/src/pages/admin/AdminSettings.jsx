import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Switch, 
  FormControlLabel, 
  TextField, 
  Button, 
  Divider, 
  MenuItem, 
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Toolbar
} from '@mui/material';
import {
  Settings,
  Search,
  Notifications,
  DarkMode,
  LightMode,
  Lock,
  People,
  Event,
  Security,
  Email,
  Save,
  Refresh,
  Delete,
  CloudUpload,
  Dashboard
} from '@mui/icons-material';
import Sidebar from '../../components/Sidebar';

const AdminSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [systemStatus, setSystemStatus] = useState('Operational');
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleBackupFrequencyChange = (event) => {
    setBackupFrequency(event.target.value);
  };

  const handleSystemBackup = () => {
    console.log('Initiating system backup...');
    // Backup logic would go here\
  };

  const handleResetSettings = () => {
    console.log('Resetting to default settings...');
    // Reset logic would go here
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: darkMode ? '#121212' : '#f5f7fa' }}>
      <Sidebar role="admin" />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          backgroundColor: darkMode ? '#1e1e1e' : 'white',
          p: 2,
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <Box>
            <Typography variant="h4" fontWeight="700" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Settings sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
              Admin Settings
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Manage system configurations and preferences
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search settings..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 300,
                backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8',
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            
            <IconButton>
              <Badge badgeContent={notifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            
            <Avatar sx={{ bgcolor: darkMode ? '#4caf50' : '#2e7d32' }}>A</Avatar>
          </Box>
        </Box>
        
        {/* Main Content */}
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* General Settings */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                backgroundColor: darkMode ? '#1e1e1e' : 'white',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                  <Dashboard sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
                  <Typography variant="h6" fontWeight="600">General Settings</Typography>
                </Box>
                
                <FormControlLabel
                  control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
                  label="Dark Mode"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Email Notifications"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Push Notifications"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <TextField
                  select
                  label="System Status"
                  value={systemStatus}
                  onChange={(e) => setSystemStatus(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="Operational">Operational</MenuItem>
                  <MenuItem value="Maintenance">Maintenance</MenuItem>
                  <MenuItem value="Down">Down</MenuItem>
                </TextField>
                
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" startIcon={<Save />} sx={{ flex: 1 }}>
                    Save Settings
                  </Button>
                  <Button variant="outlined" startIcon={<Refresh />} onClick={handleResetSettings} sx={{ flex: 1 }}>
                    Reset to Default
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Security Settings */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                backgroundColor: darkMode ? '#1e1e1e' : 'white',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                  <Lock sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
                  <Typography variant="h6" fontWeight="600">Security Settings</Typography>
                </Box>
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Two-Factor Authentication"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Password Complexity Requirements"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch />}
                  label="Auto-Lock After Inactivity"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <TextField
                  select
                  label="Session Timeout"
                  defaultValue="30"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  <MenuItem value="15">15 minutes</MenuItem>
                  <MenuItem value="30">30 minutes</MenuItem>
                  <MenuItem value="60">60 minutes</MenuItem>
                  <MenuItem value="120">120 minutes</MenuItem>
                </TextField>
                
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button variant="contained" startIcon={<Save />} sx={{ flex: 1 }}>
                    Save Security Settings
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* User Management */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                backgroundColor: darkMode ? '#1e1e1e' : 'white',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                  <People sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
                  <Typography variant="h6" fontWeight="600">User Management</Typography>
                </Box>
                
                <TextField
                  label="New User Default Role"
                  select
                  defaultValue="student"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="organizer">Event Organizer</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </TextField>
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require Email Verification"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch />}
                  label="Allow User Registration"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button variant="contained" sx={{ flex: 1 }}>
                    Manage Users
                  </Button>
                  <Button variant="outlined" color="error" sx={{ flex: 1 }} startIcon={<Delete />}>
                    Delete Inactive Users
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Event Settings */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                backgroundColor: darkMode ? '#1e1e1e' : 'white',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                  <Event sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
                  <Typography variant="h6" fontWeight="600">Event Settings</Typography>
                </Box>
                
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Require Event Approval"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <FormControlLabel
                  control={<Switch />}
                  label="Allow External Event Links"
                  sx={{ mb: 2, width: '100%', p: 1, borderRadius: '8px', backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8' }}
                />
                
                <TextField
                  label="Max Events Per User"
                  type="number"
                  defaultValue="5"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  label="Max Attendees Per Event"
                  type="number"
                  defaultValue="100"
                  fullWidth
                />
                
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" startIcon={<Save />} fullWidth>
                    Save Event Settings
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* System Configuration */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: '16px',
                backgroundColor: darkMode ? '#1e1e1e' : 'white'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
                  <Security sx={{ color: darkMode ? '#4caf50' : '#2e7d32' }} />
                  <Typography variant="h6" fontWeight="600">System Configuration</Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>Backup Settings</Typography>
                      <TextField
                        select
                        label="Backup Frequency"
                        value={backupFrequency}
                        onChange={handleBackupFrequencyChange}
                        fullWidth
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                      </TextField>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      startIcon={<CloudUpload />} 
                      onClick={handleSystemBackup}
                      fullWidth
                    >
                      Backup Now
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>Email Configuration</Typography>
                      <TextField
                        label="SMTP Server"
                        defaultValue="smtp.example.com"
                        fullWidth
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        label="SMTP Port"
                        defaultValue="587"
                        fullWidth
                      />
                    </Box>
                    
                    <Button variant="outlined" fullWidth>
                      Test Email Configuration
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>System Information</Typography>
                      <Box sx={{ backgroundColor: darkMode ? '#2d2d2d' : '#f0f4f8', p: 2, borderRadius: '8px' }}>
                        <Typography variant="body2">
                          <strong>Version:</strong> 3.2.1
                        </Typography>
                        <Typography variant="body2">
                          <strong>Last Updated:</strong> 2023-06-15
                        </Typography>
                        <Typography variant="body2">
                          <strong>Database:</strong> PostgreSQL 14.5
                        </Typography>
                        <Typography variant="body2">
                          <strong>Server:</strong> Ubuntu 20.04
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button variant="outlined" color="error" fullWidth startIcon={<Delete />}>
                      Clear Cache
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminSettings;