"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Chip,
  Button,
  TextField,
  IconButton,
  Stack,
  Divider,
  Grid,
  alpha,
  useTheme,
  Fade,
  Zoom,
  Slide,
} from "@mui/material";
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Send as SendIcon,
  EmojiEmotions as EmojiIcon,
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAddSuggestionMutation } from "@/app/redux/Suggestion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/Layout/MainLayout";
import { useThemeMode } from "@/components/Layout/MainLayout";

const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
  "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗",
  "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥",
  "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜",
  "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🫠", "🤑", "😲",
  "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧",
  "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪",
  "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
  "😇", "🥳", "🥸", "😈", "👿", "💀", "☠️", "👻", "👽", "🤖",
  "💩", "🔥", "✨", "💫", "⭐", "🌟", "💥", "💦", "💨", "🕳️",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "🔮",
  "🎉", "🎊", "🎈", "🎂", "🍰", "🍕", "🍔", "🍟", "🌭", "🍿",
  "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧃", "☕", "🍵",
  "🥤", "🍼", "💤", "🏆", "🥇", "🥈", "🥉", "🎖️", "🏅", "🚀",
  "🛸", "🪐", "🌈", "⚡", "💡", "🎵", "🎶", "🎤", "🎧", "📯",
];

const skills = [
  "React.js",
  "Next.js",
  "Redux Toolkit",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Git & GitHub",
  "REST APIs",
  "Material UI",
  "Chart.js",
  "Responsive Design",
  "Agile Methodology",
];

const languages = [
  { name: "Gujarati", level: "Native" },
  { name: "Hindi", level: "Fluent" },
  { name: "English", level: "Professional Working" },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <About />
    </MainLayout>
  );
}

function About() {
  const theme = useTheme();
  const { mode } = useThemeMode();
  const [message, setMessage] = useState("");
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const [addSuggestion, { isLoading}] =
    useAddSuggestionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") {
      toast.warning("Please enter a suggestion", {
        position: "top-right",
        theme: mode,
      });
      return;
    }
    try {
      await addSuggestion(message).unwrap();
      setMessage("");
      setShowEmojiPanel(false);
      toast.success("Thank you for your suggestion!", {
        position: "top-right",
        theme: mode,
      });
    } catch{
      toast.error("Something went wrong. Try again.", {
        position: "top-right",
        theme: mode,
      });
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(e.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
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
          background:
            mode === "light"
              ? `radial-gradient(circle at 10% 20%, ${alpha(
                  theme.palette.primary.main,
                  0.03
                )} 0%, transparent 50%),
                 radial-gradient(circle at 90% 80%, ${alpha(
                   theme.palette.success.main,
                   0.03
                 )} 0%, transparent 50%)`
              : `radial-gradient(circle at 10% 20%, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )} 0%, transparent 50%),
                 radial-gradient(circle at 90% 80%, ${alpha(
                   theme.palette.success.main,
                   0.05
                 )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        {/* Enhanced Back Button */}
        <Zoom in={true} style={{ transitionDelay: "100ms" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Paper
              elevation={0}
              sx={{
                position: "fixed",
                top: { xs: 16, md: 24 },
                left: { xs: 16, md: 24 },
                zIndex: 9999,
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2.5,
                py: 1.25,
                bgcolor: alpha(theme.palette.background.paper, 0.85),
                backdropFilter: "blur(12px)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                color: "text.primary",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderColor: theme.palette.primary.main,
                  transform: "translateX(-4px)",
                  "& .back-icon": {
                    transform: "translateX(-4px)",
                  },
                },
              }}
            >
              <Box
                className="back-icon"
                sx={{
                  display: "flex",
                  transition: "transform 0.3s ease",
                  color: theme.palette.primary.main,
                }}
              >
                <ArrowBackIcon sx={{ fontSize: "1rem" }} />
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
              textAlign: "center",
              mb: { xs: 6, md: 10 },
              mt: 0,
            }}
          >
            <Chip
              icon={<CodeIcon />}
              label="About Me"
              sx={{
                mb: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 600,
                px: 2,
                py: 1.5,
                borderRadius: 2,
                "& .MuiChip-icon": {
                  color: "primary.main",
                },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                letterSpacing: "-0.02em",
              }}
            >
              Get to Know Me
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Software Developer passionate about creating beautiful, functional,
              and user-centric web applications
            </Typography>
          </Box>
        </Fade>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Left Column - Profile Card */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Zoom in={true} style={{ transitionDelay: "200ms" }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: "blur(12px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 140, md: 180 },
                    height: { xs: 140, md: 180 },
                    mb: 3,
                    border: "4px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    boxShadow: `0 12px 24px -8px ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                  }}
                >
                  <Image
                    src={assets.neer}
                    alt="Neer Mehta"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Avatar>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 0.5, textAlign: "center" }}
                >
                  Neer Mehta
                </Typography>

                <Chip
                  label="Software Developer"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "primary.main",
                    fontWeight: 600,
                    mb: 3,
                    px: 2,
                  }}
                />

                <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/neer-mehta-94a23b339/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      width: 48,
                      height: 48,
                      "&:hover": {
                        bgcolor: theme.palette.primary.main,
                        color: "#fff",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://github.com/Neer2304"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: alpha(theme.palette.text.primary, 0.05),
                      color: "text.primary",
                      width: 48,
                      height: 48,
                      "&:hover": {
                        bgcolor: theme.palette.text.primary,
                        color: "background.paper",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="mailto:neer@example.com"
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      width: 48,
                      height: 48,
                      "&:hover": {
                        bgcolor: theme.palette.success.main,
                        color: "#fff",
                        transform: "scale(1.1)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Stack>

                <Divider sx={{ width: "100%", mb: 3 }}>
                  <Chip label="Languages" size="small" />
                </Divider>

                <Stack spacing={2} sx={{ width: "100%", mb: 3 }}>
                  {languages.map((lang) => (
                    <Box
                      key={lang.name}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {lang.name}
                      </Typography>
                      <Chip
                        label={lang.level}
                        size="small"
                        sx={{
                          bgcolor: alpha(theme.palette.info.main, 0.1),
                          color: "info.main",
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ width: "100%", mb: 3 }}>
                  <Chip label="Education" size="small" />
                </Divider>

                <Box sx={{ width: "100%", mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: "1.2rem" }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      GH Patel College of Engineering and Technology
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", ml: 4 }}>
                    B.Tech in Computer Science (IoT)
                  </Typography>
                </Box>

                <Button
                  component="a"
                  href="/Neer_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                    "&:hover": {
                      background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.dark})`,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 16px -4px ${alpha(
                        theme.palette.primary.main,
                        0.4
                      )}`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Download Resume
                </Button>
              </Paper>
            </Zoom>
          </Grid>

          {/* Right Column - About Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={4}>
              {/* About Me Card */}
              <Zoom in={true} style={{ transitionDelay: "300ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <WorkIcon sx={{ color: theme.palette.primary.main }} />
                    About Me
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: "1rem",
                    }}
                  >
                    I m <strong>Neer Mehta</strong> — a dedicated software
                    developer passionate about crafting clean, user-friendly,
                    and responsive web applications. My journey began with
                    curiosity about how the web works, and now I turn ideas into
                    functional, polished products.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      lineHeight: 1.8,
                      mb: 2,
                      fontSize: "1rem",
                    }}
                  >
                    I specialize in <strong>React.js</strong> and{" "}
                    <strong>Next.js</strong>, styling with{" "}
                    <strong>Tailwind CSS</strong> and <strong>Material UI</strong>,
                    and state management with <strong>Redux Toolkit</strong>.
                    I have built real projects like admin panels, e-commerce
                    dashboards, and SaaS platforms, collaborating with teams,
                    integrating REST APIs, and delivering pixel-perfect UIs.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.primary",
                      lineHeight: 1.8,
                      fontSize: "1rem",
                    }}
                  >
                    Beyond code, I love learning new tools, following trends, and
                    staying sharp in the ever-evolving web ecosystem. My goal is
                    to solve real problems with elegant, maintainable solutions
                    and to build products that make a difference.
                  </Typography>
                </Paper>
              </Zoom>

              {/* Tech Stack Card */}
              <Zoom in={true} style={{ transitionDelay: "400ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CodeIcon sx={{ color: theme.palette.success.main }} />
                    Tech Stack & Skills
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                    {skills.map((skill, index) => (
                      <Slide
                        key={skill}
                        direction="up"
                        in={true}
                        style={{ transitionDelay: `${400 + index * 50}ms` }}
                      >
                        <Chip
                          label={skill}
                          sx={{
                            bgcolor: alpha(
                              index % 2 === 0
                                ? theme.palette.primary.main
                                : theme.palette.success.main,
                              0.1
                            ),
                            color:
                              index % 2 === 0
                                ? "primary.main"
                                : "success.main",
                            fontWeight: 600,
                            px: 2,
                            py: 2,
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: alpha(
                                index % 2 === 0
                                  ? theme.palette.primary.main
                                  : theme.palette.success.main,
                                0.15
                              ),
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        />
                      </Slide>
                    ))}
                  </Box>
                </Paper>
              </Zoom>

              {/* Suggestion Form Card */}
              <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <EmojiIcon sx={{ color: theme.palette.warning.main }} />
                    Leave a Suggestion
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Your feedback helps me improve and grow!
                  </Typography>

                  <form onSubmit={handleSubmit} ref={formRef}>
                    <Box sx={{ position: "relative", mb: 2 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Share your thoughts, suggestions, or just say hi! 👋"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setShowEmojiPanel(true)}
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: alpha(theme.palette.background.default, 0.5),
                            "&:hover": {
                              bgcolor: alpha(theme.palette.background.default, 0.8),
                            },
                          },
                        }}
                      />

                      <IconButton
                        ref={emojiButtonRef}
                        onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.main,
                          "&:hover": {
                            bgcolor: theme.palette.warning.main,
                            color: "#fff",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <EmojiIcon />
                      </IconButton>

                      {showEmojiPanel && (
                        <Fade in={showEmojiPanel}>
                          <Paper
                            elevation={8}
                            sx={{
                              position: "absolute",
                              zIndex: 10,
                              bottom: "100%",
                              mb: 1,
                              left: 0,
                              width: "100%",
                              maxHeight: 200,
                              overflowY: "auto",
                              p: 2,
                              bgcolor: alpha(theme.palette.background.paper, 0.95),
                              backdropFilter: "blur(12px)",
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: 3,
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                            }}
                          >
                            {emojis.map((emoji) => (
                              <IconButton
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                sx={{
                                  fontSize: "1.5rem",
                                  p: 1,
                                  "&:hover": {
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    transform: "scale(1.2)",
                                  },
                                  transition: "all 0.2s ease",
                                }}
                              >
                                {emoji}
                              </IconButton>
                            ))}
                          </Paper>
                        </Fade>
                      )}
                    </Box>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      fullWidth
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{
                        borderRadius: 3,
                        py: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.main})`,
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.warning.dark}, ${theme.palette.warning.dark})`,
                          transform: "translateY(-2px)",
                          boxShadow: `0 8px 16px -4px ${alpha(
                            theme.palette.warning.main,
                            0.4
                          )}`,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isLoading ? "Sending..." : "Send Suggestion"}
                    </Button>
                  </form>
                </Paper>
              </Zoom>
            </Stack>
          </Grid>
        </Grid>

        {/* Footer Note */}
        <Fade in={true} timeout={1000}>
          <Box
            sx={{
              textAlign: "center",
              mt: 8,
              pt: 4,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Open to opportunities and collaborations! Feel free to reach out.
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mt: 1 }}
            >
              © 2025 • Neer Mehta • Software Developer
            </Typography>
          </Box>
        </Fade>
      </Container>

      <ToastContainer />
    </Box>
  );
}