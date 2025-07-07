import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  MenuItem,
  Grid,
  Paper,
  Toolbar,
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { studentService } from '../../services/studentService';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const categories = ['Tech', 'Arts', 'Cultural', 'Sports', 'Other'];

const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    contactEmail: '',
    logo: null,
    website: '',
    instagram: '',
    twitter: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('contactEmail', formData.contactEmail);
      if (formData.logo) data.append('logo', formData.logo);
      data.append('socialLinks[website]', formData.website);
      data.append('socialLinks[instagram]', formData.instagram);
      data.append('socialLinks[twitter]', formData.twitter);

      await studentService.createOrganization(data);
      navigate('/student/organizations');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create organization');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="student" />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Create Student Organization
            </Typography>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Category"
                    name="category"
                    select
                    fullWidth
                    required
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Contact Email"
                    name="contactEmail"
                    type="email"
                    fullWidth
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">Logo (optional)</Typography>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Website"
                    name="website"
                    fullWidth
                    value={formData.website}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Instagram"
                    name="instagram"
                    fullWidth
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Twitter"
                    name="twitter"
                    fullWidth
                    value={formData.twitter}
                    onChange={handleChange}
                  />
                </Grid>

                {error && (
                  <Grid item xs={12}>
                    <Typography color="error">{error}</Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Create Organization
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default CreateOrganization;
