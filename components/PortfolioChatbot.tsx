"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Stack,
  Fade,
  Zoom,
  useTheme,
  alpha,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Minimize as MinimizeIcon,
  OpenInFull as OpenInFullIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function PortfolioChatbot() {
  const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Neer's AI assistant. Ask me anything about his skills, projects, or experience!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading) return;

    const userMsgContent = input;
    const userMessage: Message = {
      role: "user",
      content: userMsgContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsgContent }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: data.reply,
        timestamp: new Date(),
      }]);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <>
      {/* Trigger Button */}
      <Zoom in={!isOpen}>
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: "fixed",
            bottom: { xs: 20, sm: 30 },
            right: { xs: 20, sm: 30 },
            width: 64,
            height: 64,
            bgcolor: theme.palette.primary.main,
            color: "white",
            boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
            "&:hover": { bgcolor: theme.palette.primary.dark, transform: "scale(1.1)" },
            zIndex: 1300,
          }}
        >
          <BotIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Zoom>

      <Fade in={isOpen}>
        <Paper
          elevation={0}
          sx={{
            position: "fixed",
            bottom: { xs: 0, sm: 30 },
            right: { xs: 0, sm: 30 },
            width: isMinimized ? 300 : { xs: "100vw", sm: 400 },
            height: isMinimized ? 72 : { xs: "90vh", sm: 600 },
            maxHeight: { xs: "100%", sm: "80vh" },
            borderRadius: { xs: isMinimized ? "20px 20px 0 0" : 0, sm: "24px" },
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            bgcolor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
            zIndex: 1300,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ position: "relative" }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 44, height: 44 }}>
                  <BotIcon />
                </Avatar>
                <Box sx={{ 
                  position: "absolute", bottom: 2, right: 2, width: 12, height: 12, 
                  bgcolor: "#4CAF50", borderRadius: "50%", border: `2px solid ${theme.palette.background.paper}` 
                }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                  Neer AI
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  {loading ? "Typing..." : "Always here to help"}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                {isMinimized ? <OpenInFullIcon fontSize="small" /> : <MinimizeIcon fontSize="small" />}
              </IconButton>
              <IconButton size="small" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {!isMinimized && (
            <>
              {error && (
                <Alert severity="error" action={
                  <IconButton size="small" onClick={() => { setInput(messages[messages.length-1]?.content || ""); setError(null); }}>
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                } sx={{ borderRadius: 0 }}>{error}</Alert>
              )}

              {/* Messages Area */}
              <Box sx={{ 
                flex: 1, p: 2, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2,
                bgcolor: alpha(theme.palette.background.default, 0.3)
              }}>
                {messages.map((msg, i) => (
                  <Box key={i} sx={{ alignSelf: msg.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
                    <Paper elevation={0} sx={{
                      p: 2,
                      borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                      bgcolor: msg.role === "user" ? theme.palette.primary.main : alpha(theme.palette.action.hover, 0.05),
                      color: msg.role === "user" ? "white" : "text.primary",
                      border: msg.role === "assistant" ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : "none",
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.6 }}>
                        {msg.content}
                      </Typography>
                    </Paper>
                    <Typography variant="caption" sx={{ mt: 0.5, display: "block", px: 1, opacity: 0.6 }}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                ))}
                {loading && (
                  <Box sx={{ alignSelf: "flex-start", p: 2, bgcolor: alpha(theme.palette.action.hover, 0.05), borderRadius: "20px" }}>
                    <Stack direction="row" spacing={0.5}>
                      {[0, 1, 2].map((d) => (
                        <Box key={d} sx={{
                          width: 8, height: 8, bgcolor: theme.palette.primary.main, borderRadius: "50%",
                          animation: "bounce 1.4s infinite ease-in-out both",
                          animationDelay: `${d * 0.2}s`,
                          "@keyframes bounce": { "0%, 80%, 100%": { transform: "scale(0)" }, "40%": { transform: "scale(1)" } }
                        }} />
                      ))}
                    </Stack>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* Input Area */}
              <Box sx={{ p: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, bgcolor: "background.paper" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    fullWidth
                    placeholder="Message Neer AI..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                        bgcolor: alpha(theme.palette.action.hover, 0.03),
                      }
                    }}
                  />
                  <IconButton 
                    onClick={sendMessage} 
                    disabled={!input.trim() || loading}
                    sx={{ 
                      bgcolor: theme.palette.primary.main, color: "white", 
                      "&:hover": { bgcolor: theme.palette.primary.dark },
                      "&.Mui-disabled": { bgcolor: alpha(theme.palette.primary.main, 0.2), color: "white" }
                    }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Fade>
    </>
  );
}