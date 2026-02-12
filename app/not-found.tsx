"use client";

import { Box, Container, Typography, Button, Paper, alpha, useTheme, Fade, Zoom } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

export default function NotFound() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          background: {
            light: `radial-gradient(circle at 10% 20%, ${alpha(
              theme.palette.primary.main,
              0.03
            )} 0%, transparent 50%),
                     radial-gradient(circle at 90% 80%, ${alpha(
                       theme.palette.success.main,
                       0.03
                     )} 0%, transparent 50%)`,
            dark: `radial-gradient(circle at 10% 20%, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, transparent 50%),
                   radial-gradient(circle at 90% 80%, ${alpha(
                     theme.palette.success.main,
                     0.05
                   )} 0%, transparent 50%)`,
          }[theme.palette.mode],
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              backdropFilter: "blur(12px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
              },
            }}
          >
            {/* Animated 404 Number */}
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <Box sx={{ position: "relative", mb: 4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "6rem", sm: "8rem", md: "10rem" },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main}, ${theme.palette.warning.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  404
                </Typography>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "20%",
                    right: "15%",
                  }}
                >
                  <CodeIcon sx={{ fontSize: 40, color: alpha(theme.palette.primary.main, 0.2) }} />
                </motion.div>
                
                <motion.div
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: 32, color: alpha(theme.palette.warning.main, 0.2) }} />
                </motion.div>
              </Box>
            </Zoom>

            {/* Error Message */}
            <Fade in={true} timeout={800} style={{ transitionDelay: "400ms" }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  }}
                >
                  Page Not Found
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 4,
                    maxWidth: 500,
                    mx: "auto",
                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                    lineHeight: 1.7,
                  }}
                >
                  The page you are looking for might have been removed, 
                  had its name changed, or is temporarily unavailable.
                </Typography>
              </Box>
            </Fade>

            {/* Search Suggestion */}
            <Fade in={true} timeout={800} style={{ transitionDelay: "500ms" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  mb: 4,
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    borderRadius: 3,
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Try: Home, Projects, About
                  </Typography>
                </Box>
              </Box>
            </Fade>

            {/* Action Buttons */}
            <Fade in={true} timeout={800} style={{ transitionDelay: "600ms" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  component={Link}
                  href="/"
                  variant="contained"
                  size="large"
                  startIcon={<HomeIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.success.dark})`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 24px -8px ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Back to Home
                </Button>

                <Button
                  component={Link}
                  href="/projects"
                  variant="outlined"
                  size="large"
                  startIcon={<CodeIcon />}
                  sx={{
                    borderRadius: 3,
                    px: 4,
                    py: 1.5,
                    borderColor: "divider",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  View Projects
                </Button>
              </Box>
            </Fade>

            {/* Back Button Alternative */}
            <Fade in={true} timeout={800} style={{ transitionDelay: "700ms" }}>
              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Button
                  component={Link}
                  href="/"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      transform: "translateX(-4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Return to Homepage
                </Button>
              </Box>
            </Fade>

            {/* Copyright */}
            <Fade in={true} timeout={800} style={{ transitionDelay: "800ms" }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 4,
                  color: "text.disabled",
                }}
              >
                © {new Date().getFullYear()} Neer Mehta • Portfolio
              </Typography>
            </Fade>
          </Paper>
        </Fade>

        {/* Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            left: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            filter: "blur(40px)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.success.main, 0.05),
            filter: "blur(50px)",
            zIndex: 0,
          }}
        />
      </Container>
    </Box>
  );
}