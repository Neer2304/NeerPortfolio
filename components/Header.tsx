"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  useTheme,
  alpha,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  Home,
  Person,
  Code,
  Email,
  Dashboard,
  Close as CloseIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeMode } from "./Layout/MainLayout";

const navItems = [
  { name: "Home", path: "/", icon: <Home sx={{ fontSize: 18 }} /> },
  { name: "Projects", path: "/projects", icon: <Code sx={{ fontSize: 18 }} /> },
  { name: "About", path: "/about", icon: <Person sx={{ fontSize: 18 }} /> },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard sx={{ fontSize: 18 }} />,
  },
  { name: "Contact", path: "/contact", icon: <Email sx={{ fontSize: 18 }} /> },
];

export default function Header() {
  const theme = useTheme();
  const pathname = usePathname();
  const { mode, setMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  // Mobile drawer content
  const drawerContent = (
    <Box sx={{ width: 280, height: "100%", bgcolor: "background.paper" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          minHeight: 64,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "primary.main",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            N
          </Avatar>
          <Box>
            <Link
              href="/"
              style={{ textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.primary",
                  lineHeight: 1.2,
                  fontSize: "1.1rem",
                }}
              >
                {"Neer's Portfolio"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.7rem",
                }}
              >
                Frontend Developer
              </Typography>
            </Link>
          </Box>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mx: 2 }} />

      <List sx={{ px: 2, py: 3 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <Link
              href={item.path}
              style={{ textDecoration: "none", width: "100%" }}
              onClick={handleDrawerToggle}
            >
              <ListItemButton
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 3,
                  py: 1.2,
                  "&.Mui-selected": {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path)
                      ? "primary.main"
                      : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight: isActive(item.path) ? 600 : 500,
                    color: isActive(item.path)
                      ? "primary.main"
                      : "text.primary",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ mx: 2 }} />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1.5,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 3,
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: "0.875rem",
              mr: 1,
            }}
          >
            N
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Neer Mehta
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              neer@example.com
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.85),
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Left section - Menu button + Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Menu button for mobile/tablet - opens drawer */}
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: "text.primary",
                  mr: 1,
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    mr: 1,
                    bgcolor: "primary.main",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                  }}
                >
                  N
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                    color: "text.primary",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                {"Neer's Portfolio"}
                </Typography>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.path}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    startIcon={item.icon}
                    sx={{
                      color: isActive(item.path)
                        ? "primary.main"
                        : "text.primary",
                      fontWeight: isActive(item.path) ? 600 : 500,
                      borderRadius: "100px",
                      px: 2,
                      py: 1,
                      bgcolor: isActive(item.path)
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      "&:hover": {
                        bgcolor: isActive(item.path)
                          ? alpha(theme.palette.primary.main, 0.15)
                          : alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}

              <IconButton
                onClick={toggleMode}
                sx={{
                  ml: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "text.primary",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            {/* Mobile Actions */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton
                onClick={toggleMode}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "text.primary",
                }}
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              <IconButton
                onClick={handleMenuOpen}
                sx={{ color: "text.primary" }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                sx={{
                  mt: 1.5,
                  "& .MuiPaper-root": {
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    minWidth: "200px",
                  },
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={handleMenuClose}
                    sx={{
                      color: isActive(item.path)
                        ? "primary.main"
                        : "text.primary",
                      bgcolor: isActive(item.path)
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                    }}
                  >
                    <Link
                      href={item.path}
                      style={{
                        width: "100%",
                        color: "inherit",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer - for smaller screens */}
      <SwipeableDrawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </SwipeableDrawer>
    </>
  );
}
