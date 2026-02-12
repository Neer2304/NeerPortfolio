"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  Chip,
  useTheme,
  alpha,
  Paper,
} from "@mui/material";
import { FaEnvelope, FaUser, FaPaperPlane, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const MotionBox = motion(Box);

  const handleSend = async () => {
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setOpen(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please try again later.");
    }
  };

  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 2, md: 4 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="GET IN TOUCH"
            size="small"
            sx={{
              mb: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              mb: 2,
            }}
          >
            Let us Work Together
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1rem' },
            }}
          >
            Have a project in mind? I had love to hear about it. Drop me a message and I will get back to you as soon as possible.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.5fr' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Left - Contact Info */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'background.paper',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                📬 Contact Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { icon: <FaUser />, label: 'Name', value: 'Neer Mehta' },
                  { icon: <FaEnvelope />, label: 'Email', value: 'mehtaneer143@gmail.com' },
                  { icon: <FaPhone />, label: 'Phone', value: '+91 9313202038' },
                  { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Ahmedabad, India' },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                        fontSize: '1.1rem',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 4,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  border: '1px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.1),
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  ⏰ Response Time
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Within 24-48 hours
                </Typography>
              </Box>
            </Paper>
          </MotionBox>

          {/* Right - Contact Form */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                bgcolor: 'background.paper',
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                ✉️ Send Message
              </Typography>

              <Box
                component="form"
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <TextField
                  label="Your Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: <FaUser style={{ marginRight: 8, color: theme.palette.text.secondary }} />,
                  }}
                />
                <TextField
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  fullWidth
                  InputProps={{
                    startAdornment: <FaEnvelope style={{ marginRight: 8, color: theme.palette.text.secondary }} />,
                  }}
                />
                <TextField
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  fullWidth
                  placeholder="Tell me about your project..."
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<FaPaperPlane />}
                  sx={{
                    mt: 1,
                    py: 1.5,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.9),
                    },
                  }}
                >
                  Send Message
                </Button>

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Box>
            </Paper>
          </MotionBox>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          🎉 Message sent successfully! I will get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
}