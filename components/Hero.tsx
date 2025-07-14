"use client";

import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function Hero({ mode }: { mode: "light" | "dark" }) {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        px: { xs: 4, md: 12 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: { xs: 4, md: 8 }
        }}
      >
        {/* LEFT side - Text content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: { xs: "center", md: "left" },
            width: { xs: "100%", md: "50%" },
            order: { xs: 2, md: 1 }
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              lineHeight: 1.2,
              color: mode === "light" ? "#111827" : "#f5f5f5",
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.5rem",
                lg: "3rem",
                xl: "3.5rem",
              },
            }}
          >
            {`Hi, I'm Neer 👋`}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: mode === "light" ? "#374151" : "#e5e7eb",
              maxWidth: "95%",
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
                lg: "1.5rem",
              },
              lineHeight: {
                xs: 1.5,
                md: 1.6,
              },
            }}
          >
            Detail-oriented software developer building clean, responsive web
            apps with Next.js, Tailwind CSS, and Redux.
          </Typography>

          <Stack 
            direction="row" 
            spacing={2}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Button
              variant="contained"
              color="primary"
              href="/Neer_Resume.pdf"
              target="_blank"
              rel="noopener"
              size="large"
            >
              📄 Download CV
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href="#contact"
              size="large"
            >
              ✨ Hire Me
            </Button>
          </Stack>
        </Box>

        {/* RIGHT side - Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
            order: { xs: 1, md: 2 }
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: {
                xs: "80%",
                sm: 300,
                md: 360,
              },
              maxWidth: 400,
              height: "auto",
              ml: { md: "-60px" },
            }}
          >
            <Image
              src={assets.neer_gibili}
              alt="Neer Ghibli Portrait"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "20px",
              }}
              priority
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}