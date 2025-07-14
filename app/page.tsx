"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { getTheme } from "./theme";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isReady, setIsReady] = useState(false); 

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as "light" | "dark";
    if (savedMode) {
      setMode(savedMode);
    }
    setIsReady(true); 
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode, isReady]);

  const theme = getTheme(mode);

  useEffect(() => {
    const storeVisitor = async () => {
      const res = await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      console.log("Status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.error("Request failed");
      }
    };

    storeVisitor();
  }, []);

  if (!isReady) return null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            mode === "light"
              ? "#f5f5f5"
              : "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
          color: mode === "light" ? "#111" : "#fff",
        }}
      >
        <Header mode={mode} setMode={setMode} />
        <Hero mode={mode} />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
