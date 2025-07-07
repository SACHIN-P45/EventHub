import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Toolbar,
  Tooltip,
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { studentService } from '../../services/studentService';

const drawerWidth = 240;

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [followed, setFollowed] = useState([]);
  const role = 'student';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orgRes, followedRes] = await Promise.all([
        studentService.getAllOrganizations(),
        studentService.getFollowedOrganizations(),
      ]);
      setOrganizations(orgRes.data);
      setFollowed(followedRes.data.map((org) => org._id));
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      console.log('🔍 Error details:', err.response?.data || err.message);
    }
  };

  const handleFollowToggle = async (id) => {
    try {
      await studentService.toggleFollowOrganization(id);
      fetchData(); // 🔁 Refresh state
    } catch (err) {
      console.error('❌ Failed to toggle follow:', err);
    }
  };

  const isFollowed = (id) => followed.includes(id);

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
          <Typography variant="h4" gutterBottom>
            🎓 Student Organizations
          </Typography>

          <Grid container spacing={3}>
            {organizations.map((org) => (
              <Grid item xs={12} md={6} lg={4} key={org._id}>
                <Card elevation={3}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: '#1976d2',
                          width: 56,
                          height: 56,
                          fontSize: 24,
                        }}
                        alt={org.name}
                        src={org.logo}
                      >
                        {org.name?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{org.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {org.category} • {org.contactEmail}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                          {org.description?.substring(0, 90)}...
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Tooltip title={isFollowed(org._id) ? 'Unfollow this organization' : 'Follow this organization'}>
                      <Button
                        size="small"
                        onClick={() => handleFollowToggle(org._id)}
                        variant={isFollowed(org._id) ? 'contained' : 'outlined'}
                        color={isFollowed(org._id) ? 'primary' : 'secondary'}
                      >
                        {isFollowed(org._id) ? 'Unfollow' : 'Follow'}
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Organizations;
