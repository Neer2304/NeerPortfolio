'use client'
import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Paper,
  Skeleton,
} from "@mui/material";

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 sec fake delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(8px)",
          borderRadius: 3,
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" width="40%" height={50} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="90%" height={30} />
            <Skeleton variant="text" width="95%" height={30} />
            <Skeleton variant="text" width="100%" height={30} />
            <Skeleton variant="text" width="85%" height={30} />
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              About Me
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Hey! I’m <strong>Neer</strong>, a passionate{" "}
              <strong>Frontend Developer</strong> specializing in building modern,
              responsive web applications with <strong>Next.js</strong>,{" "}
              <strong>React</strong> and the best of today’s frontend stack.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              I love crafting clean UI and turning ideas into pixel-perfect,
              functional experiences. Whether it’s designing reusable components,
              integrating APIs, or polishing the user flow — I’m always pushing
              for better performance and maintainable code.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              I enjoy collaborating with teams, staying updated with the latest
              tech, and constantly leveling up my skills. Right now, I’m
              exploring advanced dashboard designs, building custom tools like a{" "}
              <strong>CRM model</strong> (like Tally) and a{" "}
              <strong>Resume Maker</strong> app — always learning, always building.
            </Typography>

            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
              Let’s connect — I’m excited to bring your ideas to life!
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
}
