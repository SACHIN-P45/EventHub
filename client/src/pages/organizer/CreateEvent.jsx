import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Toolbar,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { eventService } from '../../services/eventService';
import Sidebar from '../../components/Sidebar';

const drawerWidth = 240;

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Workshop',
    registerLink: '',
    image: null,
    imageUrl: '',
  });

  const [imageType, setImageType] = useState('upload');
  const [errors, setErrors] = useState({});

  const categories = ['Workshop', 'Seminar', 'Hackathon', 'Tech Talk', 'Cultural'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.date) newErrors.date = 'Date & time is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.registerLink.trim()) newErrors.registerLink = 'Register link is required';
    else if (!form.registerLink.startsWith('http')) newErrors.registerLink = 'Invalid link';

    if (imageType === 'upload' && !form.image) newErrors.image = 'Please upload an image';
    if (imageType === 'link') {
      if (!form.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
      else if (!form.imageUrl.startsWith('http')) newErrors.imageUrl = 'Invalid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      for (const key in form) {
        if (key === 'image' && imageType === 'upload' && form.image) {
          formData.append('image', form.image);
        } else if (key === 'imageUrl' && imageType === 'link' && form.imageUrl) {
          formData.append('imageUrl', form.imageUrl);
        } else if (key !== 'image' && key !== 'imageUrl') {
          formData.append(key, form[key]);
        }
      }

      await eventService.createEvent(formData);
      alert('✅ Event created successfully!');

      setForm({
        title: '',
        description: '',
        date: '',
        location: '',
        category: 'Workshop',
        registerLink: '',
        image: null,
        imageUrl: '',
      });
      setErrors({});
    } catch (err) {
      if (err.response?.data?.errors) {
        const backendErrors = {};
        err.response.data.errors.forEach(({ param, msg }) => {
          backendErrors[param] = msg;
        });
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      } else {
        alert('❌ Failed to create event');
      }
    }
  };

  const role = 'organizer';

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            ➕ Create New Event
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="normal"
              value={form.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={form.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField
              label="Date & Time"
              name="date"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.date}
              helperText={errors.date}
            />
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              value={form.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
            />
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              margin="normal"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Registration Link"
              name="registerLink"
              fullWidth
              margin="normal"
              value={form.registerLink}
              onChange={handleChange}
              error={!!errors.registerLink}
              helperText={errors.registerLink}
            />

            <Typography sx={{ mt: 2 }}>📷 Image Option</Typography>
            <RadioGroup row value={imageType} onChange={(e) => setImageType(e.target.value)}>
              <FormControlLabel value="upload" control={<Radio />} label="Upload Image" />
              <FormControlLabel value="link" control={<Radio />} label="Image URL" />
            </RadioGroup>

            {imageType === 'upload' ? (
              <>
                <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
                  📤 Upload Event Image
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Button>
                {form.image && (
                  <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                    Selected: {form.image.name}
                  </Typography>
                )}
                {errors.image && (
                  <Typography variant="caption" color="error">{errors.image}</Typography>
                )}
              </>
            ) : (
              <TextField
                label="Image URL"
                name="imageUrl"
                fullWidth
                margin="normal"
                value={form.imageUrl}
                onChange={handleChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
              />
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
            >
              Submit Event
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
};

export default CreateEvent;
