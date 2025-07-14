"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 z-50">
      <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-xl font-semibold">Loading...</h2>
      <p className="text-sm opacity-70 mt-2">Please wait while we load your next page.</p>
    </div>
  );
}
