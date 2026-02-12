"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Box, Container, Typography, Chip, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const theme = useTheme();
  const mode = theme.palette.mode;
  
  const projects = [
    {
      id: 1,
      title: "Admin Panel — Grocery Web App",
      status: "Completed",
      description: "Complete admin dashboard for grocery management with real-time inventory tracking, order management, and analytics dashboard.",
      cover: assets.login,
      tech: ["Next.js", "Tailwind", "REST API", "Chart.js"],
      github: "https://github.com/Neer2304",
      live: "#",
    },
    {
      id: 2,
      title: "Internal SaaS Platform",
      status: "Completed",
      description: "Enterprise SaaS platform with reusable component library, API integration, and responsive dashboard interfaces.",
      cover: assets.myclinicadminlogin,
      tech: ["React", "Redux", "Material UI", "Node.js"],
      github: "https://github.com/Neer2304",
      live: "#",
    },
    {
      id: 3,
      title: "AccuManage",
      status: "In Progress",
      description: "Smart inventory & sales automation system with real-time stock deduction, GST calculations, and customer alerts.",
      cover: assets.accountmanagement,
      tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
      github: "https://github.com/Neer2304",
      live: "#",
    },
    {
      id: 4,
      title: "Resume Maker Web App",
      status: "In Progress",
      description: "Professional resume builder with customizable templates, real-time preview, and PDF export functionality.",
      cover: assets.resumemaker,
      tech: ["React", "Redux", "Tailwind", "HTML2PDF"],
      github: "https://github.com/Neer2304",
      live: "#",
    },
  ];

  const MotionBox = motion(Box);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 2, md: 4 },
        bgcolor: mode === 'light' ? '#f8f9fa' : 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Chip
            label="PORTFOLIO"
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
              mb: 1,
            }}
          >
            Featured Projects
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
            Here are some of my recent projects that showcase my skills and experience
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {projects.map((project, index) => (
            <MotionBox
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: mode === 'light' ? 'divider' : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: mode === 'light'
                    ? '0 12px 24px -8px rgba(0,0,0,0.15)'
                    : '0 12px 24px -8px rgba(0,0,0,0.3)',
                },
              }}
            >
              {/* Card content wrapper - NOT a link */}
              <Box>
                <Box sx={{ position: 'relative', height: { xs: 200, sm: 240 } }}>
                  {/* Main project link - wraps ONLY the image area */}
                  <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 50vw"
                        style={{
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        className="project-image"
                      />
                    </Box>
                  </Link>
                  
                  {/* Status Badge - positioned absolute, outside of Link */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                    }}
                  >
                    <Chip
                      label={project.status}
                      size="small"
                      sx={{
                        bgcolor: project.status === 'Completed' 
                          ? alpha(theme.palette.success.main, 0.9)
                          : alpha(theme.palette.warning.main, 0.9),
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        backdropFilter: 'blur(4px)',
                      }}
                    />
                  </Box>
                  
                  {/* Hover overlay with action buttons - NOT nested inside Link */}
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 3,
                      gap: 2,
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                  >
                    {/* Use regular anchor tags for external links - NOT Next.js Link */}
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        }}
                      >
                        <FaGithub size={20} />
                      </Box>
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'white', textDecoration: 'none' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          borderRadius: '50%',
                          backdropFilter: 'blur(4px)',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                        }}
                      >
                        <FiExternalLink size={20} />
                      </Box>
                    </a>
                  </Box>
                </Box>
              </Box>

              {/* Content Section */}
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Link href={`/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      '&:hover': { color: 'primary.main' },
                      cursor: 'pointer',
                    }}
                  >
                    {project.title}
                  </Typography>
                </Link>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.875rem', md: '0.9rem' },
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {project.tech.map((tech, i) => (
                    <Chip
                      key={i}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderRadius: '16px',
                        fontSize: '0.7rem',
                        height: '24px',
                        borderColor: 'divider',
                        color: 'text.secondary',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}