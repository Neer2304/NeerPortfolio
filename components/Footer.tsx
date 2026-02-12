"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { Instagram } from "@mui/icons-material";

export default function Footer() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: mode === 'light' ? '#f8f9fa' : '#202124',
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 4, md: 5 },
        mt: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Logo/Brand */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Neer Mehta
          </Typography>

          {/* Social Links */}
          <Stack direction="row" spacing={1}>
            <IconButton
              component="a"
              href="https://github.com/Neer2304"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.primary',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                },
              }}
            >
              <FaGithub />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/neer-mehta-94a23b339/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.primary',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: '#0a66c2',
                },
              }}
            >
              <FaLinkedin />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/neer_mehta23?igsh=M2wyYnc0M3cxbXk3"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.primary',
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: '#1DA1F2',
                },
              }}
            >
              <Instagram />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ my: 3, borderColor: 'divider' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            © {year} Neer Mehta. All rights reserved.
          </Typography>

          {/* Made with love */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.8rem', md: '0.875rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            Made with <FaHeart style={{ color: '#d93025', fontSize: '12px' }} /> using Next.js & MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}