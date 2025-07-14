'use client'
import React from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
} from 'react-icons/si';
import { GiMaterialsScience } from "react-icons/gi";
import { BiLogoTypescript } from "react-icons/bi";

export default function Skills() {
  const techStack = [
    { name: 'HTML', color: '#e44d26', icon: <FaHtml5 /> },
    { name: 'CSS', color: '#1572b6', icon: <FaCss3Alt /> },
    { name: 'JavaScript', color: '#f7df1e', icon: <FaJs /> },
    { name: 'React', color: '#61dafb', icon: <FaReact /> },
    { name: 'Next.js', color: '#000000', icon: <SiNextdotjs /> },
    { name: 'Material UI', color: '#007fff', icon: <GiMaterialsScience /> },
    { name: 'TypeScript', color: '#3178c6', icon: <BiLogoTypescript /> },
    { name: 'Git', color: '#f1502f', icon: <FaGitAlt /> },
    { name: 'Redux', color: '#764abc', icon: <SiRedux /> },
    { name: 'Tailwind CSS', color: '#38bdf8', icon: <SiTailwindcss /> },
  ];

  return (
    <Container sx={{ 
      py: { xs: 4, sm: 6, md: 8 },
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
        textAlign: { xs: 'center', sm: 'left' }
      }}>
        Skills & Technologies
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1, 
        }}
      >
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="w-full sm:w-1/4 md:w-1/6 lg:w-1/8 p-1"
            style={{
              flex: '0 0 auto',
              maxWidth: '100%',
            }}
          >
            <Box
              sx={{
                width: { 
                  xs: 80, 
                  sm: 85, 
                  md: 90, 
                  lg: 100 
                },
                height: { 
                  xs: 80, 
                  sm: 85, 
                  md: 90, 
                  lg: 100 
                },
                bgcolor: tech.color,
                color: tech.color === '#f7df1e' || tech.color === '#61dafb' ? '#000' : '#fff',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                },
                textAlign: 'center',
                p: 1,
                margin: '0 auto', 
              }}
            >
              <Box sx={{ 
                fontSize: { 
                  xs: 24, 
                  sm: 28, 
                  md: 32 
                } 
              }}>
                {tech.icon}
              </Box>
              <Typography
                variant="body2"
                sx={{ 
                  mt: { xs: 0.5, sm: 1 },
                  fontWeight: 500,
                  fontSize: { 
                    xs: '0.7rem', 
                    sm: '0.75rem', 
                    md: '0.8125rem' 
                  }
                }}
              >
                {tech.name}
              </Typography>
            </Box>
          </div>
        ))}
      </Box>
    </Container>
  );
}
