"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  MeshDistortMaterial,
  Stars,
  Sparkles,
  Html,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import * as THREE from "three";
import {
  Box as MuiBox,
  Typography,
  IconButton,
  Paper,
  useTheme,
  alpha,
  Avatar,
  Chip,
  Stack,
  Fade,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  Brush as BrushIcon,
  IntegrationInstructions as ApiIcon,
  DesignServices as FigmaIcon,
  Group as TeamIcon,
} from "@mui/icons-material";
import MainLayout from "@/components/Layout/MainLayout";
import { useThemeMode } from "@/components/Layout/MainLayout";

/**
 * Type Definitions
 */
interface PlanetProps {
  icon: string;
  radius: number;
  speed: number;
  color: string;
  mode: "light" | "dark";
}

interface SceneProps {
  mode: "light" | "dark";
  colors: {
    primary: string;
    secondary: string;
    background: string;
    paper: string;
    text: string;
  };
}

/**
 * Planet Component: Represents a Tech Icon orbiting the sun
 */
function Planet({ icon, radius, speed, color, mode }: PlanetProps) {
  const planetRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Mathematical Orbit Calculation
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (planetRef.current) {
      planetRef.current.position.x = Math.sin(t) * radius;
      planetRef.current.position.z = Math.cos(t) * radius;
      planetRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={planetRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Planet Sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.6}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>
        
        {/* Atmospheric Glow */}
        <mesh ref={glowRef} scale={1.15}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Tech Icon Label */}
        <Html center distanceFactor={10}>
          <MuiBox
            sx={{
              p: 1,
              borderRadius: "12px",
              bgcolor:
                mode === "dark"
                  ? "rgba(0,0,0,0.7)"
                  : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${alpha(color, 0.5)}`,
              fontSize: "1.2rem",
              display: "flex",
              cursor: "default",
              boxShadow: `0 0 20px ${alpha(color, 0.4)}`,
            }}
          >
            {icon}
          </MuiBox>
        </Html>
      </Float>
    </group>
  );
}

/**
 * Orbital Path Rings
 */
function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </mesh>
  );
}

/**
 * Realistic Sun Component
 */
function Sun({ color, mode }: { color: string; mode: "light" | "dark" }) {
  const sunRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y = t * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y = -t * 0.03;
      coronaRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group ref={sunRef}>
      {/* Core Sun */}
      <mesh>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={mode === "dark" ? 1.2 : 0.8}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Glow Layer */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Corona/Atmosphere */}
      <mesh ref={coronaRef} scale={1.15}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Glow */}
      <mesh scale={1.35}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={3}
        color={color}
        distance={50}
        decay={1.5}
      />
    </group>
  );
}

function Scene({ mode, colors }: SceneProps) {
  // Define Planet data: icon, orbit radius, orbital speed, and unique color
  const planets = useMemo(
    () => [
      { icon: "⚛️", radius: 5, speed: 0.6, color: "#61dafb" },
      {
        icon: "▲",
        radius: 8,
        speed: 0.4,
        color: mode === "dark" ? "#ffffff" : "#000000",
      },
      { icon: "JS", radius: 11, speed: 0.3, color: "#f7df1e" },
      { icon: "TS", radius: 14, speed: 0.2, color: "#3178c6" },
      { icon: "🍃", radius: 17, speed: 0.15, color: "#47a248" },
      { icon: "MUI", radius: 19, speed: 0.12, color: "#007FFF" },
    ],
    [mode],
  );

  return (
    <>
      <ambientLight intensity={mode === "dark" ? 0.1 : 0.3} />
      
      {/* Deep space stars */}
      <Stars
        radius={100}
        depth={50}
        count={mode === "dark" ? 10000 : 5000}
        factor={5}
        fade
        speed={0.5}
      />

      {/* The Sun (Center) */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sun color={colors.primary} mode={mode} />
      </Float>

      {/* Planets & Their Orbits */}
      {planets.map((p, i) => (
        <group key={i}>
          <OrbitRing radius={p.radius} />
          <Planet {...p} mode={mode} />
        </group>
      ))}

      <Environment preset="night" />
      
      {/* Subtle ground shadow */}
      <ContactShadows
        position={[0, -10, 0]}
        opacity={0.15}
        scale={50}
        blur={3}
      />
      
      {/* Space particles */}
      <Sparkles
        count={mode === "dark" ? 200 : 80}
        scale={30}
        size={1.5}
        color={colors.primary}
        speed={0.3}
      />
    </>
  );
}

export default function SolarPortfolioPage() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = useMemo(
    () => ({
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main || theme.palette.success.main,
      background: theme.palette.background.default,
      paper: theme.palette.background.paper,
      text: theme.palette.text.primary,
    }),
    [theme],
  );

  // Enhanced skills array with icons and custom colors
  const skills = [
    {
      label: "Next.js",
      icon: <CodeIcon fontSize="small" />,
      color: "#000000",
      bgColor: alpha("#000000", 0.1),
    },
    {
      label: "React",
      icon: <CodeIcon fontSize="small" />,
      color: "#61dafb",
      bgColor: alpha("#61dafb", 0.15),
    },
    {
      label: "TypeScript",
      icon: <CodeIcon fontSize="small" />,
      color: "#3178c6",
      bgColor: alpha("#3178c6", 0.15),
    },
    {
      label: "JavaScript",
      icon: <CodeIcon fontSize="small" />,
      color: "#f7df1e",
      bgColor: alpha("#f7df1e", 0.15),
    },
    {
      label: "MongoDB",
      icon: <StorageIcon fontSize="small" />,
      color: "#47a248",
      bgColor: alpha("#47a248", 0.15),
    },
    {
      label: "Tailwind",
      icon: <BrushIcon fontSize="small" />,
      color: "#38b2ac",
      bgColor: alpha("#38b2ac", 0.15),
    },
    {
      label: "REST APIs",
      icon: <ApiIcon fontSize="small" />,
      color: "#ff6b6b",
      bgColor: alpha("#ff6b6b", 0.15),
    },
    {
      label: "Figma",
      icon: <FigmaIcon fontSize="small" />,
      color: "#f24e1e",
      bgColor: alpha("#f24e1e", 0.15),
    },
    {
      label: "Team Lead",
      icon: <TeamIcon fontSize="small" />,
      color: "#9b59b6",
      bgColor: alpha("#9b59b6", 0.15),
    },
  ];

  if (!mounted) return null;

  return (
    <MainLayout>
      <MuiBox
        sx={{
          height: "100vh",
          width: "100%",
          position: "relative",
          bgcolor: "background.default",
          overflow: "hidden",
        }}
      >
        {/* BIG BACKGROUND TEXT */}
        <Fade in timeout={1500}>
          <MuiBox
            sx={{
              position: "absolute",
              top: "15%",
              width: "100%",
              textAlign: "center",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "3.5rem", md: "8rem" },
                opacity: mode === "dark" ? 0.04 : 0.07,
                color: "text.primary",
                textTransform: "uppercase",
              }}
            >
              Neer Mehta
            </Typography>
          </MuiBox>
        </Fade>

        {/* PROFILE CARD */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              position: "absolute",
              bottom: { xs: 20, md: 40 },
              left: { xs: 20, md: 40 },
              zIndex: 10,
              p: 3.5,
              width: { xs: "calc(100% - 40px)", sm: 420 },
              bgcolor: alpha(mode === "dark" ? "#1a1a1a" : colors.paper, 0.9),
              backdropFilter: "blur(20px)",
              border: "1px solid",
              borderColor: alpha(
                mode === "dark" ? "#ffffff" : colors.text,
                0.1,
              ),
              borderRadius: 6,
              boxShadow: `0 24px 80px ${alpha("#000000", 0.2)}`,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <Avatar
                sx={{
                  bgcolor: colors.primary,
                  width: 64,
                  height: 64,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: mode === "dark" ? "#ffffff" : "#000000",
                  boxShadow: `0 0 20px ${alpha(colors.primary, 0.4)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: `0 0 30px ${alpha(colors.primary, 0.6)}`,
                  },
                }}
              >
                NM
              </Avatar>
              <MuiBox>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: mode === "dark" ? "#ffffff" : "#000000",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Neer Mehta
                </div>
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.primary,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textShadow: `0 0 10px ${alpha(colors.primary, 0.3)}`,
                  }}
                >
                  CREATIVE DEVELOPER
                </Typography>
              </MuiBox>
            </Stack>

            {/* Enhanced Skills Grid */}
            <MuiBox sx={{ mb: 3, maxHeight: 200, overflowY: "auto", pr: 1 }}>
              <MuiBox sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {skills.map((skill) => (
                  <MuiBox key={skill.label} sx={{ display: "inline-block" }}>
                    <Chip
                      label={skill.label}
                      icon={skill.icon}
                      size="small"
                      sx={{
                        borderRadius: "12px",
                        fontWeight: 600,
                        bgcolor: skill.bgColor,
                        color: mode === "dark" ? "#ffffff" : "#000000",
                        border: `1px solid ${alpha(skill.color, 0.3)}`,
                        "& .MuiChip-icon": {
                          color: skill.color,
                        },
                        "& .MuiChip-label": {
                          color: mode === "dark" ? "#ffffff" : "#000000",
                        },
                        "&:hover": {
                          bgcolor: alpha(skill.color, 0.25),
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${alpha(skill.color, 0.3)}`,
                        },
                        transition: "all 0.2s ease-in-out",
                        cursor: "default",
                      }}
                    />
                  </MuiBox>
                ))}
              </MuiBox>
            </MuiBox>

            {/* Social Icons */}
            <Stack direction="row" spacing={2}>
              <IconButton
                component="a"
                href="https://github.com/Neer2304"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: alpha(colors.primary, 0.1),
                  color: colors.primary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: colors.primary,
                    color: mode === "dark" ? "#ffffff" : "#000000",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(colors.primary, 0.4)}`,
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/neer-mehta-94a23b339/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: alpha(colors.primary, 0.1),
                  color: colors.primary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: colors.primary,
                    color: mode === "dark" ? "#ffffff" : "#000000",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(colors.primary, 0.4)}`,
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/neer_mehta23?igsh=M2wyYnc0M3cxbXk3"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: alpha(colors.primary, 0.1),
                  color: colors.primary,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: colors.primary,
                    color: mode === "dark" ? "#ffffff" : "#000000",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${alpha(colors.primary, 0.4)}`,
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>

            {/* Decorative element */}
            <MuiBox
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${alpha(colors.primary, 0.2)} 0%, transparent 70%)`,
                filter: "blur(8px)",
                zIndex: -1,
              }}
            />
          </Paper>
        </Fade>

        {/* 3D CANVAS */}
        <Canvas camera={{ position: [0, 15, 30], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <Scene mode={mode} colors={colors} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              maxDistance={60}
              minDistance={12}
              autoRotate={true}
              autoRotateSpeed={0.3}
            />
          </Suspense>
        </Canvas>
      </MuiBox>
    </MainLayout>
  );
}