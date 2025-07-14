import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#8e2de2",
      },
      secondary: {
        main: "#4a00e0",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });
