"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent successfully!", {
          position: "top-right",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.", {
          position: "top-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", {
        position: "top-right",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY: "hidden", // ✅ Hide vertical scroll
        py: 10,
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
          }}
        >
          Contact Me
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {
                color: "#fff",
                background: "transparent",
              },
            }}
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#aaa" },
                "&:hover fieldset": { borderColor: "#ccc" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {
                color: "#fff",
                background: "transparent",
              },
            }}
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#aaa" },
                "&:hover fieldset": { borderColor: "#ccc" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={5}
            variant="outlined"
            InputProps={{
              style: {
                color: "#fff",
                background: "transparent",
              },
            }}
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#aaa" },
                "&:hover fieldset": { borderColor: "#ccc" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
            fullWidth
          >
            Send Message
          </Button>
        </Box>

        <ToastContainer />
      </Container>
    </Box>
  );
}
