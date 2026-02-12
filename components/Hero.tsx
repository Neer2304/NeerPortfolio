"use client";

import React from "react";
import { Box, Typography, Button, Container, Chip, useTheme, alpha } from "@mui/material";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaDownload, FaPaperPlane } from "react-icons/fa";

export default function Hero() {
  const theme = useTheme();
  const MotionBox = motion(Box);

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: 'auto', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 4 },
        pb: { xs: 8, md: 0 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          {/* Left Content */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            sx={{
              order: { xs: 2, md: 1 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Chip
              label="👋 WELCOME TO MY PORTFOLIO"
              size="small"
              sx={{
                mb: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: '1px',
              }}
            />
            
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                mb: 2,
                lineHeight: 1.2,
                color: 'text.primary',
              }}
            >
              Hi, I am{' '}
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 4,
                    left: 0,
                    width: '100%',
                    height: '8px',
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    zIndex: -1,
                  },
                }}
              >
                Neer
              </Box>
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                maxWidth: { xs: '100%', md: '90%' },
              }}
            >
              Frontend Developer specializing in{' '}
              <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Next.js, React
              </Box>
              , and building beautiful web experiences.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="/Neer_Resume.pdf"
                target="_blank"
                startIcon={<FaDownload />}
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  px: { xs: 3, md: 4 },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                  },
                }}
              >
                Download CV
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#contact"
                startIcon={<FaPaperPlane />}
                sx={{
                  borderColor: 'divider',
                  color: 'text.primary',
                  px: { xs: 3, md: 4 },
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  },
                }}
              >
                Contact Me
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 3,
                mt: 5,
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              {['2+', '10+', '24/7'].map((stat, i) => (
                <Box key={i} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.1rem', md: '1.25rem' } }}
                  >
                    {stat}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {i === 0 ? 'Years Experience' : i === 1 ? 'Projects Done' : 'Support'}
                  </Typography>
                </Box>
              ))}
            </Box>
          </MotionBox>

          {/* Right Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              order: { xs: 1, md: 2 },
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 240, sm: 280, md: 320, lg: 360 },
                height: { xs: 240, sm: 280, md: 320, lg: 360 },
              }}
            >
              {/* Background decoration */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -10,
                  background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
                  borderRadius: '50%',
                  animation: 'pulse 3s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(0.95)', opacity: 0.5 },
                    '50%': { transform: 'scale(1.05)', opacity: 0.8 },
                    '100%': { transform: 'scale(0.95)', opacity: 0.5 },
                  },
                }}
              />
              
              {/* Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  overflow: 'hidden',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: `0 20px 40px -10px ${alpha('#000', 0.3)}`,
                }}
              >
                <Image
                  src={assets.neer_gibili}
                  alt="Neer"
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}