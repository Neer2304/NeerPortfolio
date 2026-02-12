"use client";

import { useEffect, useState } from "react";
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
import { eachDayOfInterval, eachWeekOfInterval, format, subDays } from "date-fns";
import {
  Box,
  Card,
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
  Container,
  Button,
  ButtonGroup,
  Fade,
  Zoom,
  Tooltip as MuiTooltip,
} from "@mui/material";
import {
  People as PeopleIcon,
  WorkOutline as WorkIcon,
  BuildCircle as BuildIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  DateRange as DateRangeIcon,
  Today as TodayIcon,
  // Week as WeekIcon,
  CalendarMonth as MonthIcon,
  AllInclusive as AllIcon,
  Analytics as AnalyticsIcon,
  Download as DownloadIcon,
  Weekend,
} from "@mui/icons-material";
import CountUp from "react-countup";
import MainLayout from "@/components/Layout/MainLayout";

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
  Filler
);

interface Visitor {
  _id: string;
  visitedAt: string;
}

// Time range options
const timeRangeOptions = [
  { value: "7days", label: "Last 7 Days", icon: <Weekend fontSize="small" />, days: 7 },
  { value: "30days", label: "Last 30 Days", icon: <MonthIcon fontSize="small" />, days: 30 },
  { value: "90days", label: "Last 90 Days", icon: <MonthIcon fontSize="small" />, days: 90 },
  { value: "6months", label: "Last 6 Months", icon: <MonthIcon fontSize="small" />, days: 180 },
  { value: "1year", label: "Last Year", icon: <TodayIcon fontSize="small" />, days: 365 },
  { value: "all", label: "All Time", icon: <AllIcon fontSize="small" />, days: null },
] as const;

type TimeRange = typeof timeRangeOptions[number]["value"];

export default function DashboardPage() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

function Dashboard() {
  const theme = useTheme();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Store visitor
        await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const [visitorsRes] = await Promise.all([
          fetch("/api/visitor")
        ]);
        
        const visitorsData = await visitorsRes.json();
        setVisitors(visitorsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process visitor data
  const dates = visitors
    .map((v) => v.visitedAt ? new Date(v.visitedAt) : null)
    .filter((date): date is Date => date !== null && !isNaN(date.getTime()));

  // Filter dates based on time range
  const filteredDates = dates.filter(date => {
    const selectedOption = timeRangeOptions.find(opt => opt.value === timeRange);
    if (!selectedOption?.days) return true;
    return date >= subDays(new Date(), selectedOption.days);
  });

  const startDate = filteredDates.length
    ? new Date(Math.min(...filteredDates.map((d) => d.getTime())))
    : subDays(new Date(), 30);
  const endDate = new Date();

  // Daily data (limit to 30 days max for better performance)
  const days = eachDayOfInterval({ 
    start: filteredDates.length ? startDate : subDays(new Date(), 30), 
    end: endDate 
  }).slice(-30); // Only show last 30 days max
  
  const dayCounts = days.map(
    (day) =>
      filteredDates.filter(
        (date) => format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      ).length
  );

  // Weekly data
  const weeks = eachWeekOfInterval({ 
    start: filteredDates.length ? startDate : subDays(new Date(), 90), 
    end: endDate 
  }).slice(-12); // Only show last 12 weeks max
  
  const weekCounts = weeks.map((weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return filteredDates.filter((date) => date >= weekStart && date <= weekEnd).length;
  });

  // Monthly data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthCounts = new Array(12).fill(0);
  filteredDates.forEach((date) => {
    monthCounts[date.getMonth()]++;
  });

  // Yearly data
  const yearCounts: Record<number, number> = {};
  filteredDates.forEach((date) => {
    const y = date.getFullYear();
    yearCounts[y] = (yearCounts[y] || 0) + 1;
  });

  // Calculate trends
  const last7Days = filteredDates.filter(d => d >= subDays(new Date(), 7)).length;
  const previous7Days = filteredDates.filter(
    d => d >= subDays(new Date(), 14) && d < subDays(new Date(), 7)
  ).length;
  const visitorTrend = previous7Days === 0 ? 100 : ((last7Days - previous7Days) / previous7Days) * 100;

  // Stats cards data
  const stats = [
    {
      label: "Total Visitors",
      value: filteredDates.length,
      icon: <PeopleIcon />,
      color: theme.palette.primary.main,
      trend: Math.round(visitorTrend * 10) / 10,
      trendLabel: "vs last week",
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.02)})`,
    },
    {
      label: "Projects",
      value: 7,
      icon: <WorkIcon />,
      color: theme.palette.warning.main,
      trend: 0,
      trendLabel: "total projects",
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)}, ${alpha(theme.palette.warning.main, 0.02)})`,
    },
    {
      label: "In Progress",
      value: 4,
      icon: <BuildIcon />,
      color: theme.palette.error.main,
      trend: 1,
      trendLabel: "active",
      bgGradient: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)}, ${alpha(theme.palette.error.main, 0.02)})`,
    },
  ];

  const yearLabels = Object.keys(yearCounts).sort();
  const yearData = yearLabels.map(year => yearCounts[Number(year)]);

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

  // Chart options - enhanced
  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       mode: 'index' as const,
  //       intersect: false,
  //       backgroundColor: alpha(theme.palette.background.paper, 0.95),
  //       titleColor: theme.palette.text.primary,
  //       bodyColor: theme.palette.text.secondary,
  //       borderColor: theme.palette.divider,
  //       borderWidth: 1,
  //       padding: 12,
  //       bodySpacing: 8,
  //       titleFont: {
  //         weight: '600' as const,
  //         size: 14,
  //       },
  //       bodyFont: {
  //         size: 13,
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //         color: theme.palette.divider,
  //       },
  //       ticks: {
  //         color: theme.palette.text.secondary,
  //         maxRotation: 45,
  //         minRotation: 45,
  //         font: {
  //           size: 11,
  //         },
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         color: alpha(theme.palette.divider, 0.5),
  //         drawBorder: false,
  //       },
  //       ticks: {
  //         color: theme.palette.text.secondary,
  //         stepSize: 1,
  //         font: {
  //           size: 11,
  //         },
  //       },
  //     },
  //   },
  // };

  const handleExport = () => {
    // Export functionality
    const data = {
      visitors: filteredDates.length,
      timeRange,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      dailyData: days.map((d, i) => ({
        date: format(d, "yyyy-MM-dd"),
        visitors: dayCounts[i]
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-data-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
  };

  const selectedOption = timeRangeOptions.find(opt => opt.value === timeRange);

  return (
    <Box
      component="section"
      id="dashboard"
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          px: { xs: 0, sm: 2, md: 3 },
        }}
      >
        {/* Enhanced Header with better spacing */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            mb: { xs: 4, md: 5 },
            gap: 3,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                }}
              >
                <AnalyticsIcon />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.2,
                  }}
                >
                  Analytics Dashboard
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.875rem", sm: "0.9375rem" },
                    mt: 0.5,
                  }}
                >
                  Track your portfolio's performance and visitor analytics in real-time
                </Typography>
              </Box>
            </Box>
          </Box>

          <Stack 
            direction="row" 
            spacing={1.5} 
            sx={{ 
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "flex-start", md: "flex-end" },
              flexWrap: "wrap",
            }}
          >
            {/* Better Time Range Selector */}
            <Paper
              elevation={0}
              sx={{
                p: 0.5,
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                display: { xs: "none", sm: "flex" },
              }}
            >
              <ButtonGroup variant="text" sx={{ gap: 0.5 }}>
                {timeRangeOptions.slice(0, 3).map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    startIcon={option.icon}
                    sx={{
                      color: timeRange === option.value ? "primary.main" : "text.secondary",
                      bgcolor: timeRange === option.value 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      fontWeight: timeRange === option.value ? 600 : 500,
                      borderRadius: 2,
                      px: 2,
                      py: 0.75,
                      fontSize: "0.8125rem",
                      "&:hover": {
                        bgcolor: timeRange === option.value
                          ? alpha(theme.palette.primary.main, 0.15)
                          : alpha(theme.palette.primary.main, 0.05),
                      },
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
                      bgcolor: showFilters ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                      borderRadius: 2,
                      mx: 0.5,
                    }}
                  >
                    <DateRangeIcon fontSize="small" />
                  </IconButton>
                </MuiTooltip>
              </ButtonGroup>
            </Paper>

            {/* Mobile Time Range Selector */}
            <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
              <Chip
                icon={<DateRangeIcon />}
                label={selectedOption?.label || "Select Range"}
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  borderRadius: 3,
                  py: 3,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "text.primary",
                  "& .MuiChip-label": {
                    flex: 1,
                    textAlign: "left",
                  },
                }}
              />
            </Box>

            <IconButton
              onClick={handleExport}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "text.primary",
                borderRadius: 2,
                "&:hover": { 
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => window.location.reload()}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "text.primary",
                borderRadius: 2,
                "&:hover": { 
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  transform: "rotate(180deg)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Extended Time Range Options */}
        <Fade in={showFilters}>
          <Box
            sx={{
              mb: 4,
              p: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(8px)",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              display: showFilters ? "block" : "none",
            }}
          >
            <Typography 
              variant="subtitle2" 
              sx={{ 
                mb: 1.5, 
                color: "text.secondary",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DateRangeIcon fontSize="small" />
              Select Time Range
            </Typography>
            <Grid container spacing={1}>
              {timeRangeOptions.map((option) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={option.value}>
                  <Button
                    fullWidth
                    onClick={() => {
                      setTimeRange(option.value);
                      setShowFilters(false);
                    }}
                    startIcon={option.icon}
                    sx={{
                      color: timeRange === option.value ? "primary.main" : "text.secondary",
                      bgcolor: timeRange === option.value 
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      border: "1px solid",
                      borderColor: timeRange === option.value 
                        ? alpha(theme.palette.primary.main, 0.3)
                        : "divider",
                      borderRadius: 2,
                      py: 1,
                      fontSize: "0.8125rem",
                      fontWeight: timeRange === option.value ? 600 : 400,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    {option.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Stats Cards with better spacing and animations */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {loading
            ? Array(3).fill(0).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${index}`}>
                  <Card sx={{ p: 3.5, borderRadius: 4 }}>
                    <Skeleton variant="circular" width={52} height={52} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="40%" height={24} />
                  </Card>
                </Grid>
              ))
            : stats.map((stat, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={stat.label}>
                  <Zoom in={!loading} style={{ transitionDelay: `${index * 100}ms` }}>
                    <Card
                      sx={{
                        p: 3.5,
                        borderRadius: 4,
                        position: "relative",
                        overflow: "hidden",
                        background: stat.bgGradient,
                        backdropFilter: "blur(10px)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        border: "1px solid",
                        borderColor: alpha(stat.color, 0.1),
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: `0 12px 24px -8px ${alpha(stat.color, 0.25)}`,
                          borderColor: alpha(stat.color, 0.3),
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: `linear-gradient(90deg, ${stat.color}, ${alpha(stat.color, 0.5)})`,
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(stat.color, 0.15),
                            color: stat.color,
                            width: 56,
                            height: 56,
                            boxShadow: `0 4px 12px -4px ${alpha(stat.color, 0.3)}`,
                          }}
                        >
                          {stat.icon}
                        </Avatar>
                        {stat.trend > 0 && (
                          <Chip
                            icon={<TrendingUpIcon sx={{ fontSize: "1rem !important" }} />}
                            label={`+${stat.trend}%`}
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.success.main, 0.1),
                              color: theme.palette.success.main,
                              fontWeight: 600,
                              borderRadius: 2,
                              height: 28,
                              "& .MuiChip-icon": {
                                color: "inherit",
                              },
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, fontSize: "2.5rem" }}>
                        <CountUp end={stat.value} duration={2.5} />
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5, fontWeight: 500 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                        {stat.trendLabel}
                      </Typography>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
        </Grid>

        {/* Charts Grid with enhanced spacing */}
        <Grid container spacing={3.5}>
          {/* Daily Visitors - Full width with better padding */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 4,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.08)}`,
                },
              }}
            >
              <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between", 
                alignItems: { xs: "flex-start", sm: "center" }, 
                mb: 3,
                gap: 2,
              }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem", mb: 0.5 }}>
                    Daily Visitors
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <DateRangeIcon sx={{ fontSize: "1rem" }} />
                    {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                  </Typography>
                </Box>
                <Chip
                  label={`Total: ${filteredDates.length} visitors`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: "text.primary",
                    fontWeight: 500,
                    borderRadius: 2,
                    height: 32,
                  }}
                />
              </Box>
              <Box sx={{ height: 320, width: "100%" }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
                ) : (
                  <Line
                    data={{
                      labels: days.map((d) => format(d, "MMM dd")),
                      datasets: [
                        {
                          label: "Visitors",
                          data: dayCounts,
                          borderColor: theme.palette.primary.main,
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          borderWidth: 2.5,
                          pointRadius: 4,
                          pointHoverRadius: 6,
                          pointBackgroundColor: theme.palette.primary.main,
                          pointBorderColor: theme.palette.background.paper,
                          pointBorderWidth: 2,
                          tension: 0.3,
                          fill: true,
                        },
                      ],
                    }}
                    // options={chartOptions}
                  />
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Year Distribution */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 4,
                height: "100%",
                minHeight: 440,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  borderColor: alpha(theme.palette.success.main, 0.3),
                  boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.08)}`,
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem", mb: 2 }}>
                Visitors by Year
              </Typography>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                {loading ? (
                  <Skeleton variant="circular" width={200} height={200} />
                ) : yearLabels.length > 0 ? (
                  <Doughnut
                    data={{
                      labels: yearLabels,
                      datasets: [
                        {
                          data: yearData,
                          backgroundColor: [
                            theme.palette.primary.main,
                            theme.palette.success.main,
                            theme.palette.warning.main,
                            theme.palette.error.main,
                            "#6366f1",
                            "#14b8a6",
                          ],
                          borderWidth: 0,
                          hoverOffset: 15,
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
                            padding: 20,
                            font: {
                              size: 12,
                            },
                          },
                        },
                        tooltip: {
                          backgroundColor: alpha(theme.palette.background.paper, 0.95),
                          titleColor: theme.palette.text.primary,
                          bodyColor: theme.palette.text.secondary,
                          borderColor: theme.palette.divider,
                          borderWidth: 1,
                          padding: 12,
                        },
                      },
                      cutout: "65%",
                    }}
                  />
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <VisibilityIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                    <Typography color="text.secondary">No data available</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Weekly Visitors */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: alpha(theme.palette.success.main, 0.3),
                  boxShadow: `0 8px 24px ${alpha(theme.palette.success.main, 0.08)}`,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  Weekly Visitors
                </Typography>
                <Chip
                  label={`${weeks.length} weeks`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box sx={{ height: 260 }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
                ) : (
                  <Bar
                    data={{
                      labels: weeks.map((w) => format(w, "MMM dd")),
                      datasets: [
                        {
                          label: "Visitors",
                          data: weekCounts,
                          backgroundColor: alpha(theme.palette.success.main, 0.8),
                          borderRadius: 8,
                          barPercentage: 0.55,
                          categoryPercentage: 0.8,
                        },
                      ],
                    }}
                    // options={{
                    //   ...chartOptions,
                    //   scales: {
                    //     ...chartOptions.scales,
                    //     y: {
                    //       ...chartOptions.scales.y,
                    //       grid: {
                    //         ...chartOptions.scales.y.grid,
                    //         color: alpha(theme.palette.divider, 0.3),
                    //       },
                    //     },
                    //   },
                    // }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Monthly Visitors */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: alpha(theme.palette.warning.main, 0.3),
                  boxShadow: `0 8px 24px ${alpha(theme.palette.warning.main, 0.08)}`,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.125rem" }}>
                  Monthly Visitors
                </Typography>
                <Chip
                  label={new Date().getFullYear()}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    fontWeight: 500,
                    borderRadius: 2,
                  }}
                />
              </Box>
              <Box sx={{ height: 260 }}>
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: 2 }} />
                ) : (
                  <Bar
                    data={{
                      labels: months,
                      datasets: [
                        {
                          label: "Visitors",
                          data: monthCounts,
                          backgroundColor: monthColors.map(color => alpha(color, 0.8)),
                          borderRadius: 8,
                          barPercentage: 0.65,
                          categoryPercentage: 0.8,
                        },
                      ],
                    }}
                    // options={{
                    //   ...chartOptions,
                    //   scales: {
                    //     ...chartOptions.scales,
                    //     y: {
                    //       ...chartOptions.scales.y,
                    //       grid: {
                    //         ...chartOptions.scales.y.grid,
                    //         color: alpha(theme.palette.divider, 0.3),
                    //       },
                    //     },
                    //   },
                    // }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Enhanced Footer Stats */}
        <Paper
          elevation={0}
          sx={{
            mt: 5,
            p: { xs: 2.5, sm: 3 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(8px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            >
              <AnalyticsIcon sx={{ fontSize: "1.25rem" }} />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Last Updated
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <RefreshIcon sx={{ fontSize: "0.875rem" }} />
                {format(new Date(), "MMM dd, yyyy HH:mm:ss")}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Chip
              icon={<VisibilityIcon />}
              label={`${filteredDates.length} Total Views`}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "text.primary",
                fontWeight: 500,
                borderRadius: 2,
                height: 32,
              }}
            />
            <Chip
              icon={<DateRangeIcon />}
              label={selectedOption?.label}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "divider",
                borderRadius: 2,
                height: 32,
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}