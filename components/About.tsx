'use client'
import React from "react";
import {
  Typography,
  Container,
  Box,
  Chip,
  useTheme,
  alpha,
  Avatar,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { FaHeart, FaCode, FaCoffee } from "react-icons/fa";

export default function About() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const MotionBox = motion(Box);

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 2, md: 4 },
        bgcolor: mode === 'light' ? '#f8f9fa' : 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Chip
            label="ABOUT ME"
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
            Who is Neer?
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Left - Stats Cards */}
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
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                📊 Quick Stats
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { label: 'Projects Completed', value: '7+', color: '#34a853' },
                  { label: 'Hours of Coding', value: '1000+', color: '#1a73e8' },
                  // { label: 'Coffee Consumed', value: '∞', color: '#f9ab00' },
                  { label: 'Happy Clients', value: '2+', color: '#d93025' },
                ].map((stat, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: alpha(stat.color, 0.05),
                      border: '1px solid',
                      borderColor: alpha(stat.color, 0.1),
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: stat.color }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 4,
                  justifyContent: 'space-around',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha('#1a73e8', 0.1), mx: 'auto', mb: 1 }}>
                    <FaCode color="#1a73e8" />
                  </Avatar>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Clean Code
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha('#34a853', 0.1), mx: 'auto', mb: 1 }}>
                    <FaHeart color="#34a853" />
                  </Avatar>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    User First
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: alpha('#f9ab00', 0.1), mx: 'auto', mb: 1 }}>
                    <FaCoffee color="#f9ab00" />
                  </Avatar>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Dedicated
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </MotionBox>

          {/* Right - Bio */}
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
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                💭 My Journey
              </Typography>
              
              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.8,
                  color: 'text.primary',
                }}
              >
                Hey! I am <strong>Neer</strong>, a passionate Frontend Developer with a keen eye for design and a love for building exceptional digital experiences. 
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                My journey into web development started with curiosity and evolved into a career where I get to blend creativity with technical problem-solving. I specialize in <strong>Next.js</strong> and <strong>React</strong>, creating responsive, performant, and accessible applications.
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.8,
                  color: 'text.secondary',
                }}
              >
                Currently, I am working on exciting projects like <strong>AccuManage</strong> (inventory automation) and a <strong>Resume Builder</strong> app. I believe in continuous learning and staying updated with the latest technologies.
              </Typography>

              <Box sx={{ mt: 'auto', pt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: 'italic',
                    color: 'primary.main',
                    fontWeight: 500,
                  }}
                >
                  Building the web, one component at a time.
                </Typography>
              </Box>
            </Paper>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}