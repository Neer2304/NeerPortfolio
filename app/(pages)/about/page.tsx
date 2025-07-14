"use client";

import { useState, useEffect, useRef } from "react";
import { useAddSuggestionMutation } from "@/app/redux/Suggestion";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [message, setMessage] = useState("");
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const [addSuggestion, { isLoading, isSuccess, error }] =
    useAddSuggestionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    await addSuggestion(message);
    setMessage("");
    setShowEmojiPanel(false);
  };
 const emojis = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
  "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗",
  "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥",
  "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜",
  "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🫠", "🤑", "😲",
  "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧",
  "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪",
  "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
  "😇", "🥳", "🥸", "😈", "👿", "💀", "☠️", "👻", "👽", "🤖",
  "💩", "🔥", "✨", "💫", "⭐", "🌟", "💥", "💦", "💨", "🕳️",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "🔮",
  "🎉", "🎊", "🎈", "🎂", "🍰", "🍕", "🍔", "🍟", "🌭", "🍿",
  "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧃", "☕", "🍵",
  "🥤", "🍼", "💤", "🏆", "🥇", "🥈", "🥉", "🎖️", "🏅", "🚀",
  "🛸", "🪐", "🌈", "⚡", "💡", "🎵", "🎶", "🎤", "🎧", "📯",
];
  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formRef.current &&
        !formRef.current.contains(e.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="min-h-screen py-16 px-4 flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative">
      <Link
        href="/"
        className="fixed top-6 left-6 text-white bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-full shadow flex items-center gap-2 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </Link>

      {/* Hero Card */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg">
        <div className="bg-indigo-700/80 text-white flex flex-col items-center justify-center p-10 md:w-1/3">
          <div className="w-46 h-46 rounded-full overflow-hidden relative bg-white bg-opacity-20 flex items-center justify-center mb-6">
            <Image
              src={assets.neer}
              alt="Owner Image"
              fill
              className="object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">Neer Mehta</h2>
          <p className="text-indigo-100 mb-4">Software Developer</p>

          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://www.linkedin.com/in/neer-mehta-94a23b339/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/Neer2304"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              💻 GitHub
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-4xl font-bold mb-6">About Me</h1>

            <p className="mb-4 leading-relaxed text-slate-100">
              I’m <strong>Neer Mehta</strong> — a dedicated software developer
              passionate about crafting clean, user-friendly, and responsive web
              applications. My journey began with curiosity about how the web
              works, and now I turn ideas into functional, polished products.
            </p>

            <p className="mb-4 leading-relaxed text-slate-100">
              I specialize in <strong>React.js</strong> and{" "}
              <strong>Next.js</strong>, styling with{" "}
              <strong>Tailwind CSS</strong>, and state management with{" "}
              <strong>Redux Toolkit</strong>. I’ve built real projects like
              admin panels and SaaS dashboards, collaborating with teams,
              integrating APIs, and delivering pixel-perfect UIs.
            </p>

            <p className="mb-4 leading-relaxed text-slate-100">
              Beyond code, I love learning new tools, following trends, and
              staying sharp in the ever-evolving web ecosystem. My goal is to
              solve real problems with elegant, maintainable solutions and to
              build products that make a difference.
            </p>

            <p className="mb-6 leading-relaxed text-slate-100">
              I have done my Under Graduate in Bachelor of Technology in
              Computer Science (Internet of Things) at GH Patel College of
              Engineering and Technology. I’m fluent in Gujarati, Hindi, and
              comfortable in English.
            </p>

            <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "React.js",
                "Next.js",
                "Redux Toolkit",
                "JavaScript",
                "TypeScript",
                "Tailwind CSS",
                "Git & GitHub",
                "REST APIs",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-indigo-200 text-indigo-900 text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <a
            href="/Neer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-4 rounded-full shadow text-lg font-medium"
          >
            📄 Download My Resume
          </a>

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-xl mx-auto flex flex-col gap-4"
            ref={formRef}
          >
            <div className="relative">
              <textarea
                placeholder="Leave a suggestion..."
                className="w-full p-4 rounded-lg border border-gray-300 text-gray-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                onFocus={() => setShowEmojiPanel(true)}
              />

              <button
                type="button"
                ref={emojiButtonRef}
                onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                className="absolute top-2 right-2 text-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full"
                title="Toggle Emoji Panel"
              >
                😀
              </button>

              {showEmojiPanel && (
                <div className="absolute z-10 bottom-full mb-2 left-0 w-full max-h-40 overflow-y-auto bg-[#0f0c29] border border-indigo-600 rounded-lg p-3 flex flex-wrap gap-2 shadow-xl">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl hover:scale-110 transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-full shadow"
            >
              {isLoading ? "Sending..." : "Send Suggestion"}
            </button>
            {isSuccess && (
              <p className="text-green-500">Thank you for your suggestion!</p>
            )}
            {error && (
              <p className="text-red-500">Something went wrong. Try again.</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
