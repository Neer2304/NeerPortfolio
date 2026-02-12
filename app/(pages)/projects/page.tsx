"use client";

import React from "react"; // Removed useRef
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  Chip,
  Avatar,
  Paper,
  alpha,
  useTheme,
  Fade,
  Zoom,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CodeIcon from "@mui/icons-material/Code";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import MainLayout from "@/components/Layout/MainLayout";
import { useThemeMode } from "@/components/Layout/MainLayout";

const projects = [
  {
    title: "E-commerce Dashboard",
    icon: <DashboardIcon />,
    color: "#1a73e8",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "REST API", "Admin Panel"],
    description: `
1. Admin Panel – Grocery Web Application
Role: Frontend Developer Intern
Developed the complete frontend for the admin dashboard of a grocery web application using Next.js, Tailwind CSS, and JavaScript.
Designed responsive UI components for product management, order tracking, user management, and analytics.
Implemented API integration for real-time data display and actions like updating product inventory and order status.
    `,
    images: [
      assets.dashboard,
      assets.login,
      assets.forget,
      assets.home,
      assets.otp,
    ],
    links: {
      github: "https://github.com/yourusername/ecommerce-dashboard",
      live: "https://ecommerce-dashboard-demo.vercel.app",
    },
  },
  {
    title: "AccuManage (Account Management)",
    icon: <StorefrontIcon />,
    color: "#34a853",
    tags: ["Inventory Management", "Billing System", "GST", "Analytics", "Multi-user"],
    description: `
2. AccuManage automates your sales and inventory with precision. Add products, generate bills, and let the system instantly deduct stock. If items are unavailable, it alerts customers in real-time. It handles GST calculations, applies discounts, and manages all financial workflows—so you never oversell or lose track again.

With detailed analytics and customizable reports, AccuManage helps you make informed business decisions. Monitor stock levels, track sales trends, and identify top-selling products in a glance.

The system supports multi-user access with role-based permissions, so your entire team—from cashiers to managers—can collaborate securely. Easily integrate with your existing POS hardware, online storefronts, or third-party services to keep your operations connected and up to date.
    `,
    images: [
      assets.accountmanagement,
      assets.Amlogin,
      assets.Amdash,
      assets.Amproduct,
      assets.Amadd,
      assets.Ambilling,
      assets.Amorders
    ],
    links: {
      github: "https://github.com/yourusername/accumanage",
      live: "https://accumanage-demo.vercel.app",
    },
  },
  {
    title: "My Clinic",
    icon: <LocalHospitalIcon />,
    color: "#f9ab00",
    tags: ["SaaS", "Healthcare", "React", "REST API", "Agile"],
    description: `
3. Company Product – Internal SaaS Platform
Role: Frontend Developer Intern
Built dynamic and reusable components, integrated REST APIs for data-driven features, and ensured responsive layout across devices.
Worked closely with the backend team and followed Agile practices to meet sprint goals and deliver high-quality features.
Enhanced UI/UX with consistent design patterns and optimized code performance.
    `,
    images: [
      assets.myclinicadminlogin,
      assets.mycliniclogin,
      assets.myclinicpage1,
      assets.myclinicpage2,
      assets.myclinicpage3,
      assets.myclinicpage4,
      assets.myclinicpage5
    ],
    links: {
      github: "https://github.com/yourcompany/myclinic",
      live: "https://myclinic-demo.vercel.app",
    },
  },
];

export default function ProjectsPage() {
  return (
    <MainLayout>
      <Projects />
    </MainLayout>
  );
}

function Projects() {
  const theme = useTheme();
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: mode === 'light' 
            ? `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 50%),
               radial-gradient(circle at 90% 80%, ${alpha(theme.palette.success.main, 0.03)} 0%, transparent 50%)`
            : `radial-gradient(circle at 10% 20%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
               radial-gradient(circle at 90% 80%, ${alpha(theme.palette.success.main, 0.05)} 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        {/* Enhanced Back Button */}
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Paper
              elevation={0}
              sx={{
                position: 'fixed',
                top: { xs: 16, md: 24 },
                left: { xs: 16, md: 24 },
                zIndex: 9999,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2.5,
                py: 1.25,
                bgcolor: alpha(theme.palette.background.paper, 0.85),
                backdropFilter: 'blur(12px)',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 3,
                color: 'text.primary',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.main,
                  transform: 'translateX(-4px)',
                  '& .back-icon': {
                    transform: 'translateX(-4px)',
                  },
                },
              }}
            >
              <Box 
                className="back-icon"
                sx={{ 
                  display: 'flex', 
                  transition: 'transform 0.3s ease',
                  color: theme.palette.primary.main,
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: '1rem' }} />
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
              textAlign: 'center',
              mb: { xs: 6, md: 10 },
              mt: 0,
            }}
          >
            <Chip
              icon={<CodeIcon />}
              label="Portfolio Showcase"
              sx={{
                mb: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 600,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                '& .MuiChip-icon': {
                  color: 'primary.main',
                },
              }}
            />
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              My Projects
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              A collection of my work from internships, company products, and personal projects
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 3,
              }}
            >
              <Chip
                label={`${projects.length} Projects`}
                variant="outlined"
                sx={{ borderColor: 'divider' }}
              />
              <Chip
                label="2024-2025"
                variant="outlined"
                sx={{ borderColor: 'divider' }}
              />
            </Box>
          </Box>
        </Fade>

        {/* Projects Stack */}
        <Stack spacing={8}>
          {projects.map((project, index) => (
            <Zoom
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3, md: 5 },
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(12px)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  color: 'text.primary',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${project.color}, ${alpha(project.color, 0.3)})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 24px 48px -12px ${alpha(project.color, 0.25)}`,
                    borderColor: alpha(project.color, 0.3),
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  {/* Project Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(project.color, 0.15),
                          color: project.color,
                          width: { xs: 56, md: 64 },
                          height: { xs: 56, md: 64 },
                          boxShadow: `0 8px 16px -4px ${alpha(project.color, 0.2)}`,
                        }}
                      >
                        {React.cloneElement(project.icon, { 
                          sx: { fontSize: { xs: 28, md: 32 } } 
                        })}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', md: '1.75rem' },
                            color: 'text.primary',
                            mb: 0.5,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <CodeIcon sx={{ fontSize: '1rem' }} />
                          {project.tags.slice(0, 2).join(' • ')}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Project Links */}
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        component="a"
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: alpha(theme.palette.text.primary, 0.05),
                          color: 'text.primary',
                          borderRadius: 2,
                          p: 1.5,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          bgcolor: alpha(project.color, 0.1),
                          color: project.color,
                          borderRadius: 2,
                          p: 1.5,
                          '&:hover': {
                            bgcolor: alpha(project.color, 0.2),
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <LaunchIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Tags */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 3,
                    }}
                  >
                    {project.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: alpha(project.color, 0.08),
                          color: project.color,
                          fontWeight: 500,
                          borderRadius: 1.5,
                          height: 28,
                          '&:hover': {
                            bgcolor: alpha(project.color, 0.15),
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-line',
                      mb: 4,
                      lineHeight: 1.8,
                      color: 'text.primary',
                      fontSize: { xs: '0.95rem', md: '1rem' },
                      p: 3,
                      bgcolor: alpha(theme.palette.background.default, 0.5),
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Image Gallery */}
                  <Box sx={{ position: 'relative' }}>
                    <Swiper
                      modules={[Pagination, Navigation, Autoplay, EffectFade]}
                      effect="fade"
                      fadeEffect={{ crossFade: true }}
                      pagination={{ 
                        clickable: true,
                        dynamicBullets: true,
                      }}
                      navigation={{
                        nextEl: `.next-${index}`,
                        prevEl: `.prev-${index}`,
                      }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }}
                      spaceBetween={20}
                      slidesPerView={1}
                      style={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                      }}
                    >
                      {project.images.map((src, i) => (
                        <SwiperSlide key={i}>
                          <Box
                            sx={{
                              position: 'relative',
                              width: '100%',
                              height: { xs: 250, sm: 350, md: 450, lg: 500 },
                              borderRadius: 3,
                              overflow: 'hidden',
                              border: '1px solid',
                              borderColor: 'divider',
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                '& img': {
                                  transform: 'scale(1.02)',
                                },
                              },
                            }}
                          >
                            <Image
                              src={src}
                              alt={`${project.title} screenshot ${i + 1}`}
                              fill
                              style={{ 
                                objectFit: 'cover',
                                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                              }}
                              sizes="(max-width: 600px) 100vw, (max-width: 960px) 90vw, 1200px"
                              priority={i === 0}
                            />
                            
                            {/* Image Counter */}
                            <Paper
                              elevation={0}
                              sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                px: 2,
                                py: 1,
                                bgcolor: alpha(theme.palette.background.paper, 0.9),
                                backdropFilter: 'blur(8px)',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                zIndex: 10,
                              }}
                            >
                              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {i + 1} / {project.images.length}
                              </Typography>
                            </Paper>
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Navigation Buttons */}
                    <IconButton
                      className={`prev-${index}`}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: { xs: 8, md: 16 },
                        zIndex: 20,
                        transform: 'translateY(-50%)',
                        bgcolor: alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(8px)',
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.9),
                          color: '#fff',
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                        '&.swiper-button-disabled': {
                          opacity: 0.5,
                          cursor: 'not-allowed',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ArrowBackIosNewIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                    </IconButton>

                    <IconButton
                      className={`next-${index}`}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        right: { xs: 8, md: 16 },
                        zIndex: 20,
                        transform: 'translateY(-50%)',
                        bgcolor: alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(8px)',
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                        width: { xs: 40, md: 48 },
                        height: { xs: 40, md: 48 },
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.9),
                          color: '#fff',
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                        '&.swiper-button-disabled': {
                          opacity: 0.5,
                          cursor: 'not-allowed',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                    </IconButton>

                    {/* Autoplay Indicator */}
                    <Paper
                      elevation={0}
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        px: 1.5,
                        py: 0.75,
                        bgcolor: alpha(theme.palette.background.paper, 0.9),
                        backdropFilter: 'blur(8px)',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        zIndex: 10,
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: project.color,
                          animation: 'pulse 2s infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 1, transform: 'scale(1)' },
                            '50%': { opacity: 0.5, transform: 'scale(0.8)' },
                            '100%': { opacity: 1, transform: 'scale(1)' },
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        Auto-playing
                      </Typography>
                    </Paper>
                  </Box>
                </CardContent>
              </Card>
            </Zoom>
          ))}
        </Stack>

        {/* Footer Note */}
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              textAlign: 'center',
              mt: 8,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Each project includes detailed documentation and live demos. Click the links to explore more.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              © 2025 • All projects are either internship work, company products, or personal projects
            </Typography>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}