"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const projects = [
  {
    title: "E-commerce Dashboard",
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
  },
  {
    title: "AccuManage (Account Management)",
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
  },
  {
    title: "My Clinic a Companies Own Product",
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
  },
];

export default function ProjectsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <Container maxWidth="lg">
        <Link
          href="/"
          className="fixed top-6 left-6 text-white bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full shadow flex items-center gap-2 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            mb: 6,
          }}
        >
          My Projects
        </Typography>

        <Stack spacing={10}>
          {projects.map((project, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                p: { xs: 2, md: 4 },
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                borderRadius: 3,
                color: "#fff",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-line", mb: 4, lineHeight: 1.8 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ position: "relative" }}>
                  <Swiper
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={{
                      nextEl: `.next-${index}`,
                      prevEl: `.prev-${index}`,
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    {project.images.map((src, i) => (
                      <SwiperSlide key={i}>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 200, md: 500 },
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          }}
                        >
                          <Image
                            src={src}
                            alt={`${project.title} screenshot ${i + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </Box>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <IconButton
                    className={`prev-${index}`}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: 10,
                      zIndex: 100,
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.2)",
                      color: "#fff",
                      "&:hover": {
                        background: "rgba(0,0,0,0.6)",
                      },
                    }}
                  >
                    <ArrowBackIosNewIcon />
                  </IconButton>

                  <IconButton
                    className={`next-${index}`}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 10,
                      zIndex: 100,
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.2)",
                      color: "#fff",
                      "&:hover": {
                        background: "rgba(0,0,0,0.6)",
                      },
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
