"use client";

import { useEffect, useRef, useState } from "react";
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
} from "chart.js";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { eachDayOfInterval, eachWeekOfInterval, format } from "date-fns";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Skeleton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

interface Visitor {
  _id: string;
  visitedAt: string;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
}

export default function Dashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const anchorRef = useRef<HTMLHeadingElement | null>(null);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }
    setOpen(false);
  };

  const handleNavigate = (section: string) => {
    setOpen(false);
    if (section.startsWith("#")) {
      const el = document.querySelector(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(section);
    }
  };

  useEffect(() => {
    const storeVisitor = async () => {
      await fetch("/api/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    };

    const getVisitors = async () => {
      const res = await fetch("/api/visitor");
      const data = await res.json();
      setVisitors(data);
    };

    const getMessages = async () => {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    };

    storeVisitor().then(() => {
      getVisitors();
      getMessages();
    });
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem("mode") as "light" | "dark" | null;
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  const dates = visitors.map((v) => new Date(v.visitedAt));

  const startDate = dates.length
    ? new Date(Math.min(...dates.map((d) => d.getTime())))
    : new Date();
  const endDate = new Date();

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const dayCounts = days.map(
    (day) =>
      dates.filter(
        (date) => format(date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
      ).length
  );

  const weeks = eachWeekOfInterval({ start: startDate, end: endDate });
  const weekCounts = weeks.map((weekStart) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    return dates.filter((date) => date >= weekStart && date <= weekEnd).length;
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthCounts = new Array(12).fill(0);
  dates.forEach((date) => {
    monthCounts[date.getMonth()]++;
  });

  const yearCounts: Record<number, number> = {};
  dates.forEach((date) => {
    const y = date.getFullYear();
    yearCounts[y] = (yearCounts[y] || 0) + 1;
  });

  const stats = [
    {
      label: "Total Visitors",
      value: visitors.length,
      icon: <PeopleIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      label: "Total Contacts Sent",
      value: messages.length,
      icon: <EmailIcon fontSize="large" />,
      color: "#388e3c",
    },
    {
      label: "Total Messages",
      value: messages.length,
      icon: <MessageIcon fontSize="large" />,
      color: "#f57c00",
    },
    {
      label: "Projects",
      value: 2,
      icon: <WorkOutlineIcon fontSize="large" />,
      color: "#b0003a",
    },
    {
      label: "Project in Progress",
      value: 2,
      icon: <BuildCircleIcon fontSize="large" />,
      color: "#6366f1",
    },
  ];

  const yearLabels = Object.keys(yearCounts);
  const yearData = Object.values(yearCounts);

  const monthColors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#6366f1",
    "#14b8a6",
    "#f43f5e",
    "#f97316",
    "#8b5cf6",
    "#22d3ee",
    "#eab308",
    "#ec4899",
  ];

  const tickColor = mode === "light" ? "#1f2937" : "#f3f4f6";
  const gridColor = mode === "light" ? "#e5e7eb" : "#374151";

  return (
    <main
      className={`min-h-screen p-10 transition-colors duration-300 ${
        mode === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <div className="flex justify-between items-center mb-10">
        <h1
          ref={anchorRef}
          onClick={handleToggle}
          className="text-4xl font-bold cursor-pointer relative group"
        >
          Portfolio Dashboard
          <span className="absolute -bottom-8 left-0 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Click for menu
          </span>
        </h1>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: "top left" }}>
              <Paper elevation={4} sx={{ mt: 1, zIndex: 2000 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open}>
                    <MenuItem onClick={() => handleNavigate("/")}>
                      Home
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/about")}>
                      About
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/projects")}>
                      Projects
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate("/contact")}>
                      Contact
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <button
          onClick={toggleMode}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {mode === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>

      {/* Stats Cards */}
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <Grid container spacing={3}>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={`skeleton-${index}`} style={{ flex: "1 1 30%" }}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 3,
                        boxShadow: 4,
                        borderRadius: 3,
                        bgcolor: mode === "light" ? "#ffffff" : "#1e293b",
                      }}
                    >
                      <Skeleton
                        variant="circular"
                        width={56}
                        height={56}
                        sx={{
                          mr: 2,
                          bgcolor: mode === "light" ? "#e5e7eb" : "#334155",
                        }}
                      />
                      <Box>
                        <Skeleton
                          variant="text"
                          width={120}
                          height={24}
                          sx={{
                            bgcolor: mode === "light" ? "#e5e7eb" : "#334155",
                          }}
                        />
                        <Skeleton
                          variant="text"
                          width={80}
                          height={40}
                          sx={{
                            bgcolor: mode === "light" ? "#e5e7eb" : "#334155",
                          }}
                        />
                      </Box>
                    </Card>
                  </div>
                ))
            : stats.map((stat) => (
                <div className="p-2 flex-1 min-w-[250px]" key={stat.label}>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 3,
                      boxShadow: 4,
                      borderRadius: 3,
                      bgcolor: stat.color,
                      color: "#fff",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        mr: 2,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        <CountUp end={stat.value} duration={2} />
                      </Typography>
                    </Box>
                  </Card>
                </div>
              ))}
        </Grid>
      </Box>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`p-6 rounded-xl shadow transition-colors duration-300 ${
            mode === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Visitors by Day</h2>
          <div className="h-64">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: mode === "light" ? "#e5e7eb" : "#334155" }}
              />
            ) : (
              <Line
                data={{
                  labels: days.map((d) => format(d, "MMM dd")),
                  datasets: [
                    {
                      label: "Visitors",
                      data: dayCounts,
                      borderColor: "#3b82f6",
                      backgroundColor: "rgba(59,130,246,0.2)",
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                    y: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: tickColor },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Week-wise */}
        <div
          className={`p-6 rounded-xl shadow transition-colors duration-300 ${
            mode === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Visitors by Week</h2>
          <div className="h-64">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: mode === "light" ? "#e5e7eb" : "#334155" }}
              />
            ) : (
              <Bar
                data={{
                  labels: weeks.map((w) => format(w, "MMM dd")),
                  datasets: [
                    {
                      label: "Visitors",
                      data: weekCounts,
                      backgroundColor: "#10b981",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                    y: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: tickColor },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Month-wise */}
        <div
          className={`p-6 rounded-xl shadow transition-colors duration-300 ${
            mode === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Visitors by Month</h2>
          <div className="h-64">
            {loading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                sx={{ bgcolor: mode === "light" ? "#e5e7eb" : "#334155" }}
              />
            ) : (
              <Bar
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: "Visitors",
                      data: monthCounts,
                      backgroundColor: monthColors,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                    y: {
                      ticks: { color: tickColor },
                      grid: { color: gridColor },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: { color: tickColor },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>

        {/* Year-wise */}
        <div
          className={`p-6 rounded-xl shadow flex flex-col items-center transition-colors duration-300 ${
            mode === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Visitors by Year</h2>
          <div className="w-full max-w-xs">
            {loading ? (
              <Skeleton
                variant="circular"
                width={300}
                height={300}
                sx={{ bgcolor: mode === "light" ? "#e5e7eb" : "#334155" }}
              />
            ) : (
              <Doughnut
                data={{
                  labels: yearLabels,
                  datasets: [
                    {
                      label: "Visitors",
                      data: yearData,
                      backgroundColor: [
                        "#3b82f6",
                        "#10b981",
                        "#f59e0b",
                        "#ef4444",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { color: tickColor },
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
