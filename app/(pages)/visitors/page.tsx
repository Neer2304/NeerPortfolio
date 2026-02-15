"use client";

import { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Skeleton,
  Grid,
  Chip,
  IconButton,
  Paper,
  Stack,
  useTheme,
  alpha,
  Button,
  ButtonGroup,
  Fade,
  Zoom,
  Tooltip as MuiTooltip,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  DateRange as DateRangeIcon,
  Today as TodayIcon,
  CalendarMonth as MonthIcon,
  AllInclusive as AllIcon,
  Analytics as AnalyticsIcon,
  Download as DownloadIcon,
  Weekend,
  Public as PublicIcon,
  PhoneIphone as DeviceIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Map as MapIcon,
  Computer,
} from "@mui/icons-material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { format, subDays, eachDayOfInterval } from "date-fns";
import CountUp from "react-countup";
import MainLayout from "@/components/Layout/MainLayout";
import PortfolioChatbot from "@/components/PortfolioChatbot";
import { useGetVisitorAnalyticsQuery } from "@/app/redux/VisitorAnalyticsApi";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// Time range options
const timeRangeOptions = [
  {
    value: "7days",
    label: "Last 7 Days",
    icon: <Weekend fontSize="small" />,
    days: 7,
  },
  {
    value: "30days",
    label: "Last 30 Days",
    icon: <MonthIcon fontSize="small" />,
    days: 30,
  },
  {
    value: "90days",
    label: "Last 90 Days",
    icon: <MonthIcon fontSize="small" />,
    days: 90,
  },
  {
    value: "6months",
    label: "Last 6 Months",
    icon: <MonthIcon fontSize="small" />,
    days: 180,
  },
  {
    value: "1year",
    label: "Last Year",
    icon: <TodayIcon fontSize="small" />,
    days: 365,
  },
  {
    value: "all",
    label: "All Time",
    icon: <AllIcon fontSize="small" />,
    days: null,
  },
] as const;

type TimeRange = (typeof timeRangeOptions)[number]["value"];

export default function VisitorAnalyticsPage() {
  return (
    <MainLayout>
      <VisitorAnalytics />
      <PortfolioChatbot />
    </MainLayout>
  );
}

function VisitorAnalytics() {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: visitors = [],
    isLoading,
    refetch,
  } = useGetVisitorAnalyticsQuery();

  // Filter visitors based on time range - get last 50 only
  const filteredVisitors = visitors
    .filter((v) => {
      const selectedOption = timeRangeOptions.find(
        (opt) => opt.value === timeRange,
      );
      if (!selectedOption?.days) return true;
      return new Date(v.createdAt) >= subDays(new Date(), selectedOption.days);
    })
    .slice(0, 50); // Only last 50 visitors

  // Process dates for charts - using filtered visitors
  const dates = filteredVisitors.map((v) => new Date(v.createdAt));

  const startDate = dates.length
    ? new Date(Math.min(...dates.map((d) => d.getTime())))
    : subDays(new Date(), 30);
  const endDate = new Date();

  // Daily data - limit to last 50 data points
  const days = eachDayOfInterval({ start: startDate, end: endDate }).slice(-50);
  const dayCounts = days.map(
    (day) =>
      dates.filter(
        (date) => format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"),
      ).length,
  );

  // Country distribution (from filtered visitors)
  const countryCount: Record<string, number> = {};
  filteredVisitors.forEach((v) => {
    const country = v.country || "Unknown";
    countryCount[country] = (countryCount[country] || 0) + 1;
  });

  const topCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Page views distribution
  const pageCount: Record<string, number> = {};
  filteredVisitors.forEach((v) => {
    const page = v.page || "/";
    pageCount[page] = (pageCount[page] || 0) + 1;
  });

  const topPages = Object.entries(pageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Calculate stats
  const totalVisitors = filteredVisitors.length;
  const uniqueIPs = new Set(filteredVisitors.map((v) => v.ip)).size;
  const todayVisits = filteredVisitors.filter(
    (v) =>
      format(new Date(v.createdAt), "yyyy-MM-dd") ===
      format(new Date(), "yyyy-MM-dd"),
  ).length;

  // Calculate trends
  const last7Days = filteredVisitors.filter(
    (v) => new Date(v.createdAt) >= subDays(new Date(), 7),
  ).length;
  const previous7Days = filteredVisitors.filter((v) => {
    const date = new Date(v.createdAt);
    return date >= subDays(new Date(), 14) && date < subDays(new Date(), 7);
  }).length;
  const visitorTrend =
    previous7Days === 0
      ? 100
      : ((last7Days - previous7Days) / previous7Days) * 100;

  const stats = [
    {
      label: "Total Visitors",
      value: totalVisitors,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
      trend: Math.round(visitorTrend * 10) / 10,
      trendLabel: "vs last week",
    },
    {
      label: "Unique Visitors",
      value: uniqueIPs,
      icon: <PublicIcon />,
      color: theme.palette.success.main,
      trend: Math.round((uniqueIPs / totalVisitors) * 100) || 0,
      trendLabel: "of total",
    },
    {
      label: "Today's Visits",
      value: todayVisits,
      icon: <TodayIcon />,
      color: theme.palette.warning.main,
      trend: 0,
      trendLabel: "active today",
    },
    {
      label: "Countries",
      value: Object.keys(countryCount).length,
      icon: <MapIcon />,
      color: theme.palette.error.main,
      trend: topCountries[0]?.[1] || 0,
      trendLabel: "top country visits",
    },
  ];

  const selectedOption = timeRangeOptions.find(
    (opt) => opt.value === timeRange,
  );

  // Chart colors
  const monthColors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    "#6366f1",
    "#14b8a6",
    "#f43f5e",
    "#f97316",
    "#8b5cf6",
    "#22d3ee",
    "#eab308",
    "#ec4899",
  ];

  // Handle pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  };

  // Add this helper function before the return statement
  const getPageDisplayName = (page: string | undefined): string => {
    if (!page) return "Unknown";
    if (page === "/") return "Home";
    if (page.startsWith("/")) return page.substring(1);
    return page;
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      component="section"
      id="visitor-analytics"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: { xs: 3, md: 4 },
            gap: 2,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.5 },
                mb: 0.5,
              }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                }}
              >
                <AnalyticsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                  }}
                >
                  Visitor Analytics
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Last 50 visitors analytics
                </Typography>
              </Box>
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "wrap",
              width: { xs: "100%", sm: "auto" },
              justifyContent: { xs: "space-between", sm: "flex-end" },
            }}
          >
            {/* Time Range Selector - Desktop */}
            <Paper
              elevation={0}
              sx={{
                p: 0.5,
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                display: { xs: "none", md: "flex" },
              }}
            >
              <ButtonGroup variant="text" sx={{ gap: 0.5 }}>
                {timeRangeOptions.slice(0, 3).map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    startIcon={option.icon}
                    sx={{
                      color:
                        timeRange === option.value
                          ? "primary.main"
                          : "text.secondary",
                      bgcolor:
                        timeRange === option.value
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                      fontWeight: timeRange === option.value ? 600 : 500,
                      borderRadius: 2,
                      px: 1.5,
                      py: 0.75,
                      fontSize: "0.75rem",
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
                <MuiTooltip title="More time ranges">
                  <IconButton
                    onClick={() => setShowFilters(!showFilters)}
                    size="small"
                    sx={{
                      color: showFilters ? "primary.main" : "text.secondary",
                      bgcolor: showFilters
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      borderRadius: 2,
                      mx: 0.5,
                    }}
                  >
                    <DateRangeIcon fontSize="small" />
                  </IconButton>
                </MuiTooltip>
              </ButtonGroup>
            </Paper>

            {/* Mobile/Tablet Selector */}
            <Box sx={{ display: { xs: "block", md: "none" }, flex: 1 }}>
              <Chip
                icon={<DateRangeIcon />}
                label={selectedOption?.label || "Select Range"}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  borderRadius: 3,
                  py: 2.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "& .MuiChip-label": {
                    fontSize: "0.75rem",
                  },
                }}
              />
            </Box>

            <IconButton
              onClick={() => refetch()}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "text.primary",
                borderRadius: 2,
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                "&:hover": { transform: "rotate(180deg)" },
                transition: "all 0.3s ease",
              }}
            >
              <RefreshIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
            </IconButton>
          </Stack>
        </Box>

        {/* Extended Time Range Options */}
        <Fade in={showFilters}>
          <Box
            sx={{
              mb: 3,
              p: 1.5,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(8px)",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              display: showFilters ? "block" : "none",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                mb: 1,
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <DateRangeIcon fontSize="inherit" />
              Select Time Range
            </Typography>
            <Grid container spacing={0.5}>
              {timeRangeOptions.map((option) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={option.value}>
                  <Button
                    fullWidth
                    onClick={() => {
                      setTimeRange(option.value);
                      setShowFilters(false);
                    }}
                    startIcon={option.icon}
                    size="small"
                    sx={{
                      color:
                        timeRange === option.value
                          ? "primary.main"
                          : "text.secondary",
                      bgcolor:
                        timeRange === option.value
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                      border: "1px solid",
                      borderColor:
                        timeRange === option.value
                          ? alpha(theme.palette.primary.main, 0.3)
                          : "divider",
                      borderRadius: 1.5,
                      py: 0.75,
                      fontSize: "0.7rem",
                      justifyContent: "flex-start",
                    }}
                  >
                    {option.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <Grid
                    size={{ xs: 6, sm: 6, md: 3 }}
                    key={`skeleton-${index}`}
                  >
                    <Card sx={{ p: 2, borderRadius: 3 }}>
                      <Skeleton
                        variant="circular"
                        width={36}
                        height={36}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton variant="text" width="80%" height={28} />
                      <Skeleton variant="text" width="60%" height={20} />
                    </Card>
                  </Grid>
                ))
            : stats.map((stat, index) => (
                <Grid size={{ xs: 6, sm: 6, md: 3 }} key={stat.label}>
                  <Zoom
                    in={!isLoading}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <Card
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        borderRadius: 3,
                        position: "relative",
                        overflow: "hidden",
                        background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.02)})`,
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid",
                        borderColor: alpha(stat.color, 0.1),
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 8px 16px -4px ${alpha(stat.color, 0.2)}`,
                          borderColor: alpha(stat.color, 0.3),
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "3px",
                          background: `linear-gradient(90deg, ${stat.color}, ${alpha(stat.color, 0.5)})`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(stat.color, 0.15),
                            color: stat.color,
                            width: { xs: 36, sm: 40 },
                            height: { xs: 36, sm: 40 },
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        {stat.trend > 0 && (
                          <Chip
                            icon={
                              <TrendingUpIcon
                                sx={{ fontSize: "0.75rem !important" }}
                              />
                            }
                            label={`+${stat.trend}%`}
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              color: theme.palette.success.main,
                              fontWeight: 600,
                              borderRadius: 1.5,
                              height: 20,
                              fontSize: "0.6rem",
                              "& .MuiChip-icon": { fontSize: "0.7rem" },
                            }}
                          />
                        )}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          fontSize: { xs: "1.25rem", sm: "1.5rem" },
                        }}
                      >
                        <CountUp end={stat.value} duration={2} />
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.65rem", display: "block" }}
                      >
                        {stat.label}
                      </Typography>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={2}>
          {/* Daily Visitors */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1.5,
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    Daily Visitors
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <DateRangeIcon sx={{ fontSize: "0.75rem" }} />
                    {format(startDate, "MMM dd")} - {format(endDate, "MMM dd")}
                  </Typography>
                </Box>
                <Chip
                  label={`${totalVisitors} total`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    height: 24,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Box
                sx={{ height: { xs: 200, sm: 250, md: 280 }, width: "100%" }}
              >
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <Line
                    data={{
                      labels: days.map((d) => format(d, "MMM dd")),
                      datasets: [
                        {
                          data: dayCounts,
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1,
                          ),
                          borderWidth: 2,
                          pointRadius: 2,
                          pointHoverRadius: 4,
                          tension: 0.3,
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: {
                          grid: { display: false },
                          ticks: {
                            maxRotation: 45,
                            font: { size: 9 },
                          },
                        },
                        y: {
                          beginAtZero: true,
                          grid: { color: alpha(theme.palette.divider, 0.3) },
                          ticks: { font: { size: 9 } },
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Country Distribution */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, fontSize: "0.875rem", mb: 1 }}
              >
                Visitors by Country
              </Typography>
              <Box
                sx={{
                  height: { xs: 200, sm: 220 },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={140} height={140} />
                ) : topCountries.length > 0 ? (
                  <Doughnut
                    data={{
                      labels: topCountries.map(([country]) => country),
                      datasets: [
                        {
                          data: topCountries.map(([, count]) => count),
                          backgroundColor: monthColors,
                          borderWidth: 0,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            color: theme.palette.text.secondary,
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 8,
                            font: { size: 9 },
                          },
                        },
                      },
                      cutout: "60%",
                    }}
                  />
                ) : (
                  <Box sx={{ textAlign: "center", alignSelf: "center" }}>
                    <WarningIcon
                      sx={{ fontSize: 32, color: "text.disabled", mb: 0.5 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      No data
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Top Pages */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  Most Visited Pages
                </Typography>
                <Chip
                  label={`${topPages.length} pages`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    height: 22,
                    fontSize: "0.65rem",
                  }}
                />
              </Box>
              <Box sx={{ height: { xs: 180, sm: 200 } }}>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height="100%"
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <Bar
                    data={{
                      labels: topPages.map(([page]) =>
                        page === "/" ? "Home" : page,
                      ),
                      datasets: [
                        {
                          data: topPages.map(([, count]) => count),
                          backgroundColor: monthColors.slice(
                            0,
                            topPages.length,
                          ),
                          borderRadius: 4,
                          barPercentage: 0.6,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: {
                          grid: { display: false },
                          ticks: { font: { size: 9 } },
                        },
                        y: {
                          beginAtZero: true,
                          grid: { color: alpha(theme.palette.divider, 0.2) },
                          ticks: { font: { size: 9 } },
                        },
                      },
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Recent Visitors Table */}
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  bgcolor: alpha(theme.palette.background.paper, 0.6),
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <InfoIcon
                    sx={{ color: theme.palette.info.main, fontSize: "1rem" }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    Recent Visitors
                  </Typography>
                  <Chip
                    label={`${filteredVisitors.length} of 50`}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      color: theme.palette.info.main,
                      height: 20,
                      fontSize: "0.65rem",
                    }}
                  />
                </Stack>
                <Button
                  startIcon={<DownloadIcon sx={{ fontSize: "0.875rem" }} />}
                  size="small"
                  sx={{
                    color: theme.palette.info.main,
                    fontSize: "0.7rem",
                    "&:hover": { bgcolor: alpha(theme.palette.info.main, 0.1) },
                  }}
                >
                  Export
                </Button>
              </Box>

              <TableContainer
                ref={tableContainerRef}
                sx={{
                  maxHeight: { xs: 300, sm: 350, md: 400 },
                  "&::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: alpha(theme.palette.divider, 0.1),
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: alpha(theme.palette.primary.main, 0.3),
                    borderRadius: "10px",
                    "&:hover": {
                      background: alpha(theme.palette.primary.main, 0.5),
                    },
                  },
                }}
              >
                <Table size="small" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: "0.7rem", fontWeight: 600, py: 1 }}
                      >
                        Location
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "0.7rem", fontWeight: 600, py: 1 }}
                      >
                        Page
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "0.7rem", fontWeight: 600, py: 1 }}
                      >
                        Date
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "0.7rem", fontWeight: 600, py: 1 }}
                      >
                        Device
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredVisitors
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((v) => (
                        <TableRow
                          key={v._id}
                          sx={{
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                        >
                          <TableCell sx={{ py: 1 }}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={0.5}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.1,
                                  ),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <PublicIcon
                                  sx={{
                                    fontSize: 12,
                                    color: theme.palette.primary.main,
                                  }}
                                />
                              </Box>
                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{ fontSize: "0.7rem", fontWeight: 500 }}
                                >
                                  {v.country || "Unknown"}
                                </Typography>
                                {v.city && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                      fontSize: "0.6rem",
                                      display: "block",
                                    }}
                                  >
                                    {v.city}
                                  </Typography>
                                )}
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Chip
                              label={getPageDisplayName(v.page)}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                height: 20,
                                fontSize: "0.6rem",
                                "& .MuiChip-label": { px: 1 },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Typography
                              variant="caption"
                              sx={{ fontSize: "0.7rem" }}
                            >
                              {format(new Date(v.createdAt), "MMM dd, yyyy")}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            {v.userAgent?.includes("Mobile") ? (
                              <DeviceIcon
                                sx={{
                                  fontSize: 16,
                                  color: theme.palette.success.main,
                                }}
                              />
                            ) : (
                              <Computer
                                sx={{
                                  fontSize: 16,
                                  color: theme.palette.info.main,
                                }}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  bgcolor: alpha(theme.palette.background.paper, 0.4),
                }}
              >
                <TablePagination
                  component="div"
                  count={filteredVisitors.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[7, 14, 21]}
                  labelRowsPerPage={
                    <span style={{ fontSize: "0.7rem" }}>Rows:</span>
                  }
                  sx={{
                    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        fontSize: "0.7rem",
                      },
                    "& .MuiTablePagination-select": {
                      fontSize: "0.7rem",
                      py: 0,
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer Stats */}
        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: { xs: 1.5, sm: 2 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(4px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 28,
                height: 28,
              }}
            >
              <TimelineIcon sx={{ fontSize: "1rem" }} />
            </Avatar>
            <Box>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, fontSize: "0.65rem" }}
              >
                Last Updated
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: "0.6rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                }}
              >
                <RefreshIcon sx={{ fontSize: "0.7rem" }} />
                {format(new Date(), "MMM dd, yyyy HH:mm")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              icon={<BarChartIcon sx={{ fontSize: "0.7rem !important" }} />}
              label={`${totalVisitors} Views`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                height: 24,
                fontSize: "0.65rem",
                "& .MuiChip-icon": { fontSize: "0.7rem" },
              }}
            />
            <Chip
              icon={<DateRangeIcon sx={{ fontSize: "0.7rem !important" }} />}
              label={selectedOption?.label}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                height: 24,
                fontSize: "0.65rem",
                "& .MuiChip-icon": { fontSize: "0.7rem" },
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
