"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const bgStyle = {
    minHeight: "100vh",
    background: isDarkMode
      ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
      : "#f5f5f5",
    color: isDarkMode ? "#ffffff" : "#111111",
  };

  return (
    <main style={bgStyle} className="flex flex-col items-center justify-center px-6 py-16 text-center transition-all duration-300">
      <h1 className="text-9xl font-extrabold text-indigo-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="mb-6 text-lg opacity-80">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-full shadow hover:bg-indigo-700 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      <p className="mt-12 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Your Portfolio Name. All rights reserved.
      </p>
    </main>
  );
}
