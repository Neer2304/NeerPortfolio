'use client'
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaFigma,
  FaNodeJs,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiVercel,
} from 'react-icons/si';
import { GiMaterialsScience } from "react-icons/gi";
import { motion } from 'framer-motion';

export default function Skills() {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const techStack = [
    { name: 'HTML5', color: '#e44d26', icon: <FaHtml5 />, category: 'Frontend' },
    { name: 'CSS3', color: '#1572b6', icon: <FaCss3Alt />, category: 'Frontend' },
    { name: 'JavaScript', color: '#f7df1e', icon: <FaJs />, category: 'Frontend' },
    { name: 'TypeScript', color: '#3178c6', icon: <SiTypescript />, category: 'Frontend' },
    { name: 'React', color: '#61dafb', icon: <FaReact />, category: 'Frontend' },
    { name: 'Next.js', color: '#000000', icon: <SiNextdotjs />, category: 'Frontend' },
    { name: 'Redux', color: '#764abc', icon: <SiRedux />, category: 'State' },
    { name: 'Material UI', color: '#007fff', icon: <GiMaterialsScience />, category: 'UI' },
    { name: 'Tailwind', color: '#38bdf8', icon: <SiTailwindcss />, category: 'UI' },
    { name: 'Node.js', color: '#339933', icon: <FaNodeJs />, category: 'Backend' },
    { name: 'MongoDB', color: '#47A248', icon: <SiMongodb />, category: 'Database' },
    { name: 'Firebase', color: '#FFCA28', icon: <SiFirebase />, category: 'Backend' },
    { name: 'Git', color: '#f1502f', icon: <FaGitAlt />, category: 'Tools' },
    { name: 'Figma', color: '#F24E1E', icon: <FaFigma />, category: 'Design' },
    { name: 'Vercel', color: '#000000', icon: <SiVercel />, category: 'DevOps' },
  ];

  const categories = ['Frontend', 'UI', 'State', 'Backend', 'Database', 'Tools', 'Design', 'DevOps'];
  
  const MotionBox = motion(Box);

  return (
    <Box
      component="section"
      id="skills"
      sx={{
        py: { xs: 4, md: 6 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
          <Chip
            label="EXPERTISE"
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
            Skills & Technologies
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
            Technologies I work with to build amazing applications
          </Typography>
        </Box>

        {categories.map((category, catIndex) => {
          const categorySkills = techStack.filter(tech => tech.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <Box key={category} sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.secondary',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  letterSpacing: '1px',
                }}
              >
                {category.toUpperCase()}
              </Typography>
              
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    sm: 'repeat(4, 1fr)',
                    md: 'repeat(5, 1fr)',
                    lg: 'repeat(6, 1fr)',
                  },
                  gap: { xs: 1.5, sm: 2, md: 2.5 },
                }}
              >
                {categorySkills.map((tech, index) => (
                  <MotionBox
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + catIndex * 0.1 }}
                    whileHover={{ y: -5 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: { xs: 1.5, sm: 2 },
                      bgcolor: 'background.paper',
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: tech.color,
                        boxShadow: `0 8px 16px -4px ${alpha(tech.color, 0.2)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        fontSize: { xs: 24, sm: 28, md: 32 },
                        color: tech.color,
                        mb: 0.5,
                      }}
                    >
                      {tech.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                        color: 'text.primary',
                        textAlign: 'center',
                      }}
                    >
                      {tech.name}
                    </Typography>
                  </MotionBox>
                ))}
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}