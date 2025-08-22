import React from "react";
import { STUDENT_NAME, STUDENT_HEADLINE } from "../constants";

interface HeroProps {
  useProfilePicture: boolean;
}

export const Hero: React.FC<HeroProps> = ({ useProfilePicture }) => {
  const nameParts = STUDENT_NAME.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 z-10">
        <div className="md:w-3/5 text-center md:text-left animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
            Hi, I'm <span className="text-cyan-400">{firstName}</span>
            {lastName && (
              <>
                <br />
                <span className="text-cyan-400">{lastName}</span>
              </>
            )}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-400">
            {STUDENT_HEADLINE}
          </p>
          <p className="mt-6 max-w-xl text-slate-300">
            Bridging theoretical knowledge with practical solutions across power
            systems, software development, and controls engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#contact"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              Get In Touch
            </a>
            <a
              href="/docs/Curriculum Vitae.pdf"
              download
              className="inline-flex items-center justify-center gap-2 border-2 border-cyan-500 text-white-500 hover:bg-cyan-500 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </a>
          </div>
        </div>
        <div className="md:w-2/5 flex justify-center animate-fade-in-up animation-delay-200">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full blur-2xl opacity-50"></div>
            <img
              src={
                useProfilePicture
                  ? "/media/my_pic.jpg"
                  : "https://images.unsplash.com/photo-1581092335878-8771e8d99974?q=80&w=400&h=400&fit=crop"
              }
              alt={
                useProfilePicture
                  ? "Richard Mabvirakare"
                  : "Modern electrical engineering workspace with circuits and components"
              }
              className={`relative w-full h-full object-cover rounded-full border-4 border-slate-700 shadow-2xl ${
                useProfilePicture ? "object-bottom" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
