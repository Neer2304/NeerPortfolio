"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "next/link";

export default function Header({
  mode,
  setMode,
}: {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 1100,
        background: "rgba(15, 12, 41, 0.85)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          {`Neer's Portfolio`}
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                mt: 1,
                "& .MuiPaper-root": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                  minWidth: "200px",
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/about"
                  style={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  About
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/projects"
                  style={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Projects
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/dashboard"
                  style={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link
                  href="/contact"
                  style={{
                    width: "100%",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Contact
                </Link>
              </MenuItem>
              <MenuItem onClick={toggleMode}>
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1, md: 2 },
            }}
          >
            <Button
              color="inherit"
              sx={{
                minWidth: 0,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              <Link
                href="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                minWidth: 0,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              <Link
                href="/projects"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Projects
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                minWidth: 0,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              <Link
                href="/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Dashboard
              </Link>
            </Button>
            <Button
              color="inherit"
              sx={{
                minWidth: 0,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              }}
            >
              <Link
                href="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </Button>
            <Tooltip
              title={
                mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
              arrow
            >
              <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
