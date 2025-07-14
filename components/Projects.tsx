"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const projects = [
    {
      title: "Admin Panel — Grocery Web App",
      status: "Completed",
      description:
        "Built a complete admin dashboard for a grocery app using Next.js, Tailwind, and REST APIs.",
      cover: assets.login,
    },
    {
      title: "Internal SaaS Platform",
      status: "Completed",
      description:
        "Developed reusable components, integrated APIs, and delivered responsive UIs in a real company product.",
      cover: assets.myclinicadminlogin,
    },
    {
      title: "AccuManage",
      status: "In Progress",
      description:
        "AccuManage automates your sales and inventory with precision. Add products, generate bills, and let the system instantly deduct stock. If items are unavailable, it alerts customers in real-time. Handles GST calculations, applies discounts, and manages all financial workflows—so you never oversell or lose track again.",
      cover: assets.accountmanagement,
    },
    {
      title: "Resume Maker Web App",
      status: "In Progress",
      description:
        "Developing a tool to help users create professional resumes quickly and easily.",
      cover: assets.resumemaker,
    },
  ];

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-100">
           My Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <Link href="/projects">
              <Image src={project.cover} alt="cover-image" className="w-full h-64 object-cover transform duration-500 group-hover:scale-105 group-hover:blur-sm"/>

              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/50 via-black/20 to-transparent">
                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full mb-2 ${
                    project.status === "Completed"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {project.status}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-200 text-sm transition duration-500 group-hover:text-white">
                  {project.description}
                </p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
