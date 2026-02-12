"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  Chip,
  Avatar,
  IconButton,
  Divider,
  alpha,
  useTheme,
  Fade,
  Zoom,
  Slide,
} from "@mui/material";
import {
  Send as SendIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  ArrowBack as ArrowBackIcon,
  Code as CodeIcon,
  Instagram,
} from "@mui/icons-material";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/Layout/MainLayout";
import { useThemeMode } from "@/components/Layout/MainLayout";

const contactInfo = [
  {
    icon: <EmailIcon />,
    label: "Email",
    value: "mehtaneer143@gmail.com",
    link: "mailto:neer@example.com",
    color: "#1a73e8",
  },
  {
    icon: <PhoneIcon />,
    label: "Phone",
    value: "+91 9313202038",
    link: "tel:+919313202038",
    color: "#34a853",
  },
  {
    icon: <LocationIcon />,
    label: "Location",
    value: "Gujarat, India",
    link: "https://maps.google.com/?q=Gujarat,India",
    color: "#f9ab00",
  },
];

const socialLinks = [
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/neer-mehta-94a23b339/",
    color: "#0A66C2",
  },
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    url: "https://github.com/Neer2304",
    color: "#F5F5F",
  },
  {
    icon: <Instagram/>,
    label: "Instagram",
    url: "https://www.instagram.com/neer_mehta23?igsh=M2wyYnc0M3cxbXk3",
    color: "#F9C0C4",
  },
];

export default function ContactPage() {
  return (
    <MainLayout>
      <Contact />
    </MainLayout>
  );
}

function Contact() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.warning("Please enter your name", {
        position: "top-right",
        theme: mode,
      });
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.warning("Please enter a valid email address", {
        position: "top-right",
        theme: mode,
      });
      return;
    }
    if (!formData.message.trim()) {
      toast.warning("Please enter your message", {
        position: "top-right",
        theme: mode,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        toast.success("Message sent successfully! I'll get back to you soon.", {
          position: "top-right",
          theme: mode,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          theme: mode,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
        theme: mode,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            mode === "light"
              ? `radial-gradient(circle at 10% 20%, ${alpha(
                  theme.palette.primary.main,
                  0.03
                )} 0%, transparent 50%),
                 radial-gradient(circle at 90% 80%, ${alpha(
                   theme.palette.success.main,
                   0.03
                 )} 0%, transparent 50%)`
              : `radial-gradient(circle at 10% 20%, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )} 0%, transparent 50%),
                 radial-gradient(circle at 90% 80%, ${alpha(
                   theme.palette.success.main,
                   0.05
                 )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        {/* Enhanced Back Button */}
        <Zoom in={true} style={{ transitionDelay: "100ms" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              elevation={0}
              sx={{
                position: "fixed",
                top: { xs: 16, md: 24 },
                left: { xs: 16, md: 24 },
                zIndex: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 1.25,
                bgcolor: alpha(theme.palette.background.paper, 0.85),
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                color: "text.primary",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.main,
                  transform: "translateX(-4px)",
                  "& .back-icon": {
                    transform: "translateX(-4px)",
                  },
                },
              }}
            >
              <Box
                className="back-icon"
                sx={{
                  display: "flex",
                  transition: "transform 0.3s ease",
                  color: theme.palette.primary.main,
                }}
              >
                <ArrowBackIcon sx={{ fontSize: "1rem" }} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Back to Home
              </Typography>
            </Paper>
          </Link>
        </Zoom>

        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 6, md: 10 },
              mt: 0,
            }}
          >
            <Chip
              icon={<SendIcon />}
              label="Get in Touch"
              sx={{
                mb: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 600,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                "& .MuiChip-icon": {
                  color: "primary.main",
                },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                letterSpacing: "-0.02em",
              }}
            >
              Contact Me
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Have a question or want to work together? I'd love to hear from you!
            </Typography>
          </Box>
        </Fade>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column - Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={4}>
              {/* Contact Info Cards */}
              <Zoom in={true} style={{ transitionDelay: "200ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(12px)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EmailIcon sx={{ color: theme.palette.primary.main }} />
                    Contact Information
                  </Typography>

                  <Stack spacing={3}>
                    {contactInfo.map((info, index) => (
                      <Slide
                        key={info.label}
                        direction="right"
                        in={true}
                        style={{ transitionDelay: `${200 + index * 100}ms` }}
                      >
                        <Box
                          component="a"
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 3,
                            textDecoration: "none",
                            color: "text.primary",
                            bgcolor: alpha(info.color, 0.04),
                            border: "1px solid",
                            borderColor: alpha(info.color, 0.1),
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: alpha(info.color, 0.1),
                              borderColor: alpha(info.color, 0.3),
                              transform: "translateX(8px)",
                              "& .info-icon": {
                                transform: "scale(1.1)",
                                bgcolor: alpha(info.color, 0.2),
                              },
                            },
                          }}
                        >
                          <Avatar
                            className="info-icon"
                            sx={{
                              bgcolor: alpha(info.color, 0.1),
                              color: info.color,
                              width: 48,
                              height: 48,
                              transition: "all 0.3s ease",
                            }}
                          >
                            {info.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {info.label}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {info.value}
                            </Typography>
                          </Box>
                        </Box>
                      </Slide>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 4 }}>
                    <Chip label="Social Links" size="small" />
                  </Divider>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    {socialLinks.map((social, index) => (
                      <Zoom
                        key={social.label}
                        in={true}
                        style={{ transitionDelay: `${400 + index * 100}ms` }}
                      >
                        <IconButton
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            bgcolor: alpha(social.color, 0.1),
                            color: social.color,
                            width: 56,
                            height: 56,
                            "&:hover": {
                              bgcolor: social.color,
                              color: "#fff",
                              transform: "scale(1.15) rotate(8deg)",
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      </Zoom>
                    ))}
                  </Stack>
                </Paper>
              </Zoom>

              {/* Availability Card */}
              <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(12px)",
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.success.main,
                      0.05
                    )}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: theme.palette.success.main,
                        animation: "pulse 2s infinite",
                        "@keyframes pulse": {
                          "0%": { opacity: 1, transform: "scale(1)" },
                          "50%": { opacity: 0.5, transform: "scale(0.8)" },
                          "100%": { opacity: 1, transform: "scale(1)" },
                        },
                      }}
                    />
                    Available for Work
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    I'm currently open to freelance opportunities, internships, and full-time positions.
                  </Typography>
                  <Chip
                    label="Response time: within 24 hours"
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: "success.main",
                      fontWeight: 500,
                    }}
                  />
                </Paper>
              </Zoom>
            </Stack>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Zoom in={true} style={{ transitionDelay: "400ms" }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: "blur(12px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <SendIcon sx={{ color: theme.palette.primary.main }} />
                  Send Me a Message
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and I'll get back to you as soon as possible.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12 }}>
                      <Slide direction="up" in={true} style={{ transitionDelay: "500ms" }}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              "&:hover": {
                                bgcolor: alpha(theme.palette.background.default, 0.8),
                              },
                              "&.Mui-focused": {
                                bgcolor: alpha(theme.palette.background.default, 0.9),
                              },
                            },
                          }}
                        />
                      </Slide>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Slide direction="up" in={true} style={{ transitionDelay: "600ms" }}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              "&:hover": {
                                bgcolor: alpha(theme.palette.background.default, 0.8),
                              },
                              "&.Mui-focused": {
                                bgcolor: alpha(theme.palette.background.default, 0.9),
                              },
                            },
                          }}
                        />
                      </Slide>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Slide direction="up" in={true} style={{ transitionDelay: "700ms" }}>
                        <TextField
                          fullWidth
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          multiline
                          rows={6}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 3,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              "&:hover": {
                                bgcolor: alpha(theme.palette.background.default, 0.8),
                              },
                              "&.Mui-focused": {
                                bgcolor: alpha(theme.palette.background.default, 0.9),
                              },
                            },
                          }}
                        />
                      </Slide>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Slide direction="up" in={true} style={{ transitionDelay: "800ms" }}>
                        <Button
                          type="submit"
                          disabled={loading}
                          fullWidth
                          variant="contained"
                          endIcon={<SendIcon />}
                          sx={{
                            borderRadius: 3,
                            py: 1.8,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                            fontSize: "1rem",
                            fontWeight: 600,
                            "&:hover": {
                              background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.dark})`,
                              transform: "translateY(-2px)",
                              boxShadow: `0 12px 24px -8px ${alpha(
                                theme.palette.primary.main,
                                0.5
                              )}`,
                            },
                            "&:disabled": {
                              background: alpha(theme.palette.action.disabled, 0.2),
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </Button>
                      </Slide>
                    </Grid>
                  </Grid>
                </Box>

                {/* Trust Badge */}
                <Fade in={true} timeout={1000}>
                  <Box
                    sx={{
                      mt: 4,
                      pt: 3,
                      borderTop: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Chip
                      icon={<EmailIcon />}
                      label="End-to-end encrypted"
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: "divider" }}
                    />
                    <Chip
                      icon={<CodeIcon />}
                      label="Privacy guaranteed"
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: "divider" }}
                    />
                  </Box>
                </Fade>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        {/* Footer Note */}
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              pt: 4,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Prefer email? Reach me directly at{" "}
              <Link
                href="mailto:neer@example.com"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                neer@example.com
              </Link>
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              © 2025 • Neer Mehta • All messages are kept confidential
            </Typography>
          </Box>
        </Fade>
      </Container>

      <ToastContainer />
    </Box>
  );
}