"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline, PaletteMode } from "@mui/material";
import { getGoogleTheme, googleColors } from "@/theme/googleTheme";

interface ThemeContextType {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  colors: typeof googleColors.light | typeof googleColors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
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

  const theme = getGoogleTheme(mode);
  const colors = mode === 'light' ? googleColors.light : googleColors.dark;

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ mode, setMode, colors }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeMode must be used within a ThemeContextProvider");
  }
  return context;
};