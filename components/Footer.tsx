"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Skeleton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        background: "rgba(15, 12, 41, 0.85)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        py: 3,
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          {/* Brand / Name */}
          {loading ? (
            <Skeleton variant="text" width={120} height={30} />
          ) : (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Neer Mehta
            </Typography>
          )}

          {/* Copyright */}
          {loading ? (
            <Skeleton variant="text" width={200} height={20} />
          ) : (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 4,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              © {new Date().getFullYear()} Neer Mehta. All rights reserved.
            </Typography>
          )}

          {/* Socials */}
          {loading ? (
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </Stack>
          ) : (
            <Stack direction="row" spacing={2}>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/neer-mehta-94a23b339/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://github.com/Neer2304"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff" }}
              >
                <GitHubIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
