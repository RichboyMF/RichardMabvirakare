import React, { useState, useEffect } from "react";
import { Section } from "./Section";
import { ABOUT_ME_TEXT, EXPERIENCE_DATA, PROJECTS_DATA } from "../constants";

const SkillTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-slate-800 text-cyan-300 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
    {children}
  </span>
);

// Core skills only - keeping it focused
const CORE_SKILLS = [
  "Python",
  "MATLAB",
  "Simulink",
  "JavaScript",
  "Flutter",
  "Power Systems",
  "Control Systems",
  "Full-Stack Development",
];

export const About: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Collect all images from projects and experiences
  const allImages = React.useMemo(() => {
    const images: Array<{ src: string; alt: string; caption?: string }> = [];

    // Add experience images
    EXPERIENCE_DATA.forEach((exp) => {
      exp.media?.forEach((media) => {
        if (media.type === "image") {
          images.push({
            src: media.src,
            alt: media.alt,
            caption: `${exp.role} - ${media.caption}`,
          });
        }
      });
    });

    // Add project images
    PROJECTS_DATA.forEach((project) => {
      project.media?.forEach((media) => {
        if (media.type === "image") {
          images.push({
            src: media.src,
            alt: media.alt,
            caption: `${project.title} - ${media.caption}`,
          });
        }
      });
    });

    return images;
  }, []);

  // Function to change image with fade transition
  const changeImage = (newIndex: number) => {
    if (newIndex === currentImageIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (allImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [allImages.length]);

  const currentImage = allImages[currentImageIndex];

  return (
    <Section id="about" title="About Me">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column - Image carousel */}
          <div className="space-y-4 relative">
            {currentImage && (
              <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-[4/3.5]">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-500 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <p className="text-white text-sm font-medium">
                    {currentImage.caption}
                  </p>
                </div>

                {/* Image counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>
            )}

            {/* Navigation dots */}
            {allImages.length > 1 && (
              <div className="flex justify-center space-x-2">
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => changeImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? "bg-cyan-400"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right column - Text content */}
          <div className="space-y-6">
            <div className="text-lg text-slate-300 leading-relaxed">
              <p>{ABOUT_ME_TEXT}</p>
            </div>
          </div>
        </div>

        {/* Bottom section - Skills, Stats and Engineering Focus */}
        <div className="mt-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Skills and Stats combined */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Core Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {CORE_SKILLS.map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">Top 10</div>
                  <div className="text-sm text-slate-400">
                    African Rover Challenge Finalist
                  </div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">2+</div>
                  <div className="text-sm text-slate-400">
                    Industry Internships
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Engineering Focus Areas */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">
                Engineering Focus Areas
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Power Systems</span>
                  <span className="text-cyan-400">●●●●○</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Software Development</span>
                  <span className="text-cyan-400">●●●●●</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Control Systems</span>
                  <span className="text-cyan-400">●●●●○</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Robotics</span>
                  <span className="text-cyan-400">●●●○○</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* More About Me - Interests and Hobbies */}
        <div className="mt-12 bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-6">More About Me</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Creative Pursuits */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-cyan-400">
                Creative Pursuits
              </h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">🎵</span>
                  <div>
                    <span className="font-medium">Music:</span> Playing guitar
                    and piano, exploring music production and sound engineering
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">🎨</span>
                  <div>
                    <span className="font-medium">Art:</span> Physical and
                    digital drawing, bringing ideas to life through visual
                    design
                  </div>
                </div>
              </div>
            </div>

            {/* Technical & Intellectual */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-cyan-400">
                Technical & Intellectual
              </h4>
              <div className="space-y-3 text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">💻</span>
                  <div>
                    <span className="font-medium">Coding Projects:</span>{" "}
                    Building interesting applications and experimenting with new
                    technologies
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">⚡</span>
                  <div>
                    <span className="font-medium">Electronics:</span> Arduino
                    projects and circuit design for hobby applications
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">♟️</span>
                  <div>
                    <span className="font-medium">Chess:</span> Strategic
                    thinking and pattern recognition through competitive play
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">📚</span>
                  <div>
                    <span className="font-medium">Reading:</span> Books on
                    entrepreneurship, self-development, history, and geopolitics
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-300 text-sm italic">
              These diverse interests fuel my creativity and provide fresh
              perspectives that I bring to my engineering work. Whether it's the
              systematic thinking from chess, the creativity from music and art,
              or the curiosity from reading, each hobby contributes to my
              holistic approach to problem-solving.
            </p>
          </div>

          {/* CV Download Call-to-Action */}
          <div className="mt-6 text-center">
            <a
              href="/docs/Curriculum Vitae.pdf"
              download
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
              Download Full CV
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};
