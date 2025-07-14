"use client";

import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-4">📄 Download My Resume</h1>
      <p className="mb-6 text-center max-w-md">
        Click the button below to download my latest resume in PDF format. 
        If you have any questions, feel free to contact me!
      </p>
      <Link
        href="/resume.pdf"
        target="_blank"
        download
        className="px-6 py-3 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Download Resume
      </Link>
    </main>
  );
}
