"use client";

import { Box, Typography, CircularProgress, alpha, useTheme, Fade } from "@mui/material";
import { motion } from "framer-motion";
import CodeIcon from "@mui/icons-material/Code";

export default function Loading() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'all 0.3s ease',
        zIndex: 9999,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: {
            light: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 50%),
                    radial-gradient(circle at 90% 80%, ${alpha(theme.palette.success.main, 0.03)} 0%, transparent 50%)`,
            dark: `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                   radial-gradient(circle at 90% 80%, ${alpha(theme.palette.success.main, 0.05)} 0%, transparent 50%)`,
          }[theme.palette.mode],
          pointerEvents: 'none',
        },
      }}
    >
      <Fade in={true} timeout={1000}>
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Animated Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                width: { xs: 100, md: 120 },
                height: { xs: 100, md: 120 },
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  borderTopColor: 'transparent',
                  borderBottomColor: 'transparent',
                  animation: 'spin 2s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                },
              }}
            >
              <CodeIcon 
                sx={{ 
                  fontSize: { xs: 48, md: 64 },
                  color: theme.palette.primary.main,
                  animation: 'pulse 1.5s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 0.6, transform: 'scale(0.95)' },
                    '50%': { opacity: 1, transform: 'scale(1.05)' },
                    '100%': { opacity: 0.6, transform: 'scale(0.95)' },
                  },
                }} 
              />
            </Box>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Loading...
            </Typography>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <CircularProgress
                size={48}
                thickness={4}
                sx={{
                  color: theme.palette.primary.main,
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
            </Box>
          </motion.div>

          {/* Subtext */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 400,
                mx: 'auto',
                fontSize: { xs: '0.875rem', md: '1rem' },
              }}
            >
              Please wait while we prepare your experience
            </Typography>

            {/* Loading Dots Animation */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    animation: 'bounce 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.16}s`,
                    '@keyframes bounce': {
                      '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: 0.4 },
                      '40%': { transform: 'scale(1)', opacity: 1 },
                    },
                  }}
                />
              ))}
            </Box>
          </motion.div>

          {/* Gradient Bar Animation */}
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 200,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main}, ${theme.palette.warning.main}, ${theme.palette.error.main})`,
              backgroundSize: '300% 100%',
              animation: 'gradient 2s ease infinite',
              '@keyframes gradient': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
            }}
          />
        </Box>
      </Fade>
    </Box>
  );
}