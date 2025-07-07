import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  TextField,
  Button,
  Toolbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sidebar from '../components/Sidebar';

const drawerWidth = 240;

const studentFAQs = [
  {
    question: 'How do I register for an event?',
    answer: 'Go to the Events page, click on an event, and click "Register". You may get a QR code after registration.',
  },
  {
    question: 'How do I follow a student organization?',
    answer: 'Visit the Organizations page and click "Follow" next to the organization you are interested in.',
  },
  {
    question: 'Can I unfollow an organization?',
    answer: 'Yes, just click the "Unfollow" button on the Organizations page.',
  },
  {
    question: 'Where can I see my registered events?',
    answer: 'Go to the Student Dashboard or My Events section.',
  },
];

const Help = () => {
  const [search, setSearch] = useState('');

  const filteredFAQs = studentFAQs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase()) ||
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="student" />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            📘 Help & Support
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Frequently asked questions for students.
          </Typography>

          {/* 🔍 Search */}
          <TextField
            fullWidth
            label="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ my: 3 }}
          />

          <Divider sx={{ mb: 3 }} />

          {/* 📂 FAQ List */}
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails>{faq.answer}</AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No FAQs found.
            </Typography>
          )}

          {/* 📩 Contact */}
          <Box mt={5} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Still need help?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="mailto:support@eventhub.com"
            >
              Contact Support
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Help;
