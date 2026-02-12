import { createTheme, alpha, PaletteMode } from "@mui/material";

// Google Material Design 3 color palette - 2024
export const googleColors = {
  light: {
    primary: '#1a73e8',      // Google Blue
    secondary: '#5f6368',    // Google Gray
    error: '#d93025',        // Google Red
    warning: '#f9ab00',      // Google Yellow
    info: '#1a73e8',         // Google Blue
    success: '#34a853',      // Google Green
    background: '#ffffff',
    surface: '#f8f9fa',
    surfaceVariant: '#f1f3f4',
    text: '#202124',
    textSecondary: '#5f6368',
    textDisabled: '#9aa0a6',
    border: '#dadce0',
    divider: '#e8eaed',
    focus: '#e8f0fe',
  },
  dark: {
    primary: '#8ab4f8',      // Google Blue (dark)
    secondary: '#9aa0a6',    // Google Gray (dark)
    error: '#f28b82',        // Google Red (dark)
    warning: '#fdd663',      // Google Yellow (dark)
    info: '#8ab4f8',         // Google Blue (dark)
    success: '#81c995',      // Google Green (dark)
    background: '#202124',
    surface: '#303134',
    surfaceVariant: '#3c4043',
    text: '#e8eaed',
    textSecondary: '#9aa0a6',
    textDisabled: '#5f6368',
    border: '#3c4043',
    divider: '#3c4043',
    focus: '#3c4043',
  }
};

// Google Material Design 3 theme creator
export const getGoogleTheme = (mode: PaletteMode) => {
  const colors = mode === 'light' ? googleColors.light : googleColors.dark;
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: alpha(colors.primary, 0.9),
        dark: alpha(colors.primary, 0.8),
        contrastText: '#ffffff',
      },
      secondary: {
        main: colors.secondary,
        light: alpha(colors.secondary, 0.9),
        dark: alpha(colors.secondary, 0.8),
        contrastText: '#ffffff',
      },
      error: {
        main: colors.error,
      },
      warning: {
        main: colors.warning,
      },
      info: {
        main: colors.info,
      },
      success: {
        main: colors.success,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      divider: colors.divider,
    },
    typography: {
      fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
      h1: {
        fontFamily: '"Google Sans Display", "Google Sans", "Roboto", sans-serif',
        fontWeight: 500,
        letterSpacing: '-0.5px',
      },
      h2: {
        fontFamily: '"Google Sans Display", "Google Sans", "Roboto", sans-serif',
        fontWeight: 500,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontFamily: '"Google Sans Display", "Google Sans", "Roboto", sans-serif',
        fontWeight: 500,
        letterSpacing: '-0.5px',
      },
      h4: {
        fontWeight: 500,
        letterSpacing: '-0.25px',
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        fontWeight: 500,
        letterSpacing: '0.25px',
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '100px',
            padding: '10px 24px',
            fontSize: '0.875rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3)',
            },
          },
          sizeLarge: {
            padding: '12px 32px',
            fontSize: '1rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: mode === 'light'
              ? '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
              : '0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)'
                : '0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '0.75rem',
            height: '24px',
          },
          filled: {
            backgroundColor: alpha(colors.primary, 0.1),
            color: colors.primary,
            '&:hover': {
              backgroundColor: alpha(colors.primary, 0.15),
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: mode === 'light' ? '#f8f9fa' : '#303134',
              '&:hover': {
                backgroundColor: mode === 'light' ? '#f1f3f4' : '#3c4043',
              },
              '&.Mui-focused': {
                backgroundColor: mode === 'light' ? '#ffffff' : '#202124',
              },
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            '@media (min-width: 600px)': {
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          },
        },
      },
    },
  });
};