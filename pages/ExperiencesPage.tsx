import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { EXPERIENCE_DATA } from "../constants";
import type { ExperienceItem } from "../types";
import {
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  GithubIcon,
  LinkIcon,
} from "../components/Icons";

// Build a YouTube embed URL from a normal YouTube link
const getYouTubeEmbedUrl = (url?: string | null): string | null => {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.split("/")[1];
      return id
        ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
        : null;
    }
    if (u.hostname.includes("youtube.com")) {
      // Shorts format: /shorts/{id}
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        return id
          ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`
          : null;
      }
      const id = u.searchParams.get("v");
      if (id)
        return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
      const parts = u.pathname.split("/");
      const embedIdx = parts.indexOf("embed");
      if (embedIdx !== -1 && parts[embedIdx + 1]) {
        return `https://www.youtube.com/embed/${
          parts[embedIdx + 1]
        }?rel=0&modestbranding=1`;
      }
    }
  } catch {}
  return null;
};

const MediaGallery: React.FC<{
  media: NonNullable<ExperienceItem["media"]>;
}> = ({ media }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Ensure selectedIndex is within bounds when media changes
  useEffect(() => {
    if (media.length > 0 && selectedIndex >= media.length) {
      setSelectedIndex(0);
    }
  }, [media.length, selectedIndex]);

  const selectedMedia = media[selectedIndex];

  const togglePlay = () => {
    const video = document.getElementById(
      "exp-detail-video"
    ) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    }
  };

  const advanceNext = () => {
    setSelectedIndex((prev) => (prev + 1) % media.length);
  };

  // Auto-play video when selected
  useEffect(() => {
    if (!selectedMedia || selectedMedia.type !== "video") return;
    const video = document.getElementById(
      "exp-detail-video"
    ) as HTMLVideoElement;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  }, [selectedIndex, selectedMedia]);

  // Auto-advance images every 4s
  useEffect(() => {
    if (!media.length) return;
    if (!selectedMedia || selectedMedia.type !== "image") return;
    const timer = setTimeout(() => {
      advanceNext();
    }, 4000);
    return () => clearTimeout(timer);
  }, [selectedIndex, media, selectedMedia]);

  // Defer early return so hooks above always run in the same order
  if (!media.length || !selectedMedia) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-800 rounded-lg overflow-hidden">
        {selectedMedia.type === "image" ? (
          <img
            src={selectedMedia.src}
            alt={selectedMedia.alt}
            className="w-full h-96 object-cover"
          />
        ) : (
          <div className="relative">
            <video
              id="exp-detail-video"
              src={selectedMedia.src}
              className="w-full h-96 object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                setIsPlaying(false);
                advanceNext();
              }}
              preload="auto"
              controls={false}
              muted
              playsInline
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition"
            >
              {isPlaying ? (
                <PauseIcon className="w-16 h-16 text-white" />
              ) : (
                <PlayIcon className="w-16 h-16 text-white" />
              )}
            </button>
          </div>
        )}
        {selectedMedia.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm">
            {selectedMedia.caption}
          </div>
        )}
      </div>
      {media.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`rounded-lg overflow-hidden ${
                i === selectedIndex
                  ? "ring-2 ring-cyan-400"
                  : "hover:ring-2 hover:ring-cyan-400/50"
              }`}
            >
              {m.type === "image" ? (
                <img
                  src={m.src}
                  alt={m.alt}
                  className="w-full h-20 object-cover"
                />
              ) : (
                <div className="w-full h-20 bg-slate-700 flex items-center justify-center relative overflow-hidden">
                  <video
                    src={m.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ExperiencesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialIndex = useMemo(() => {
    const qp = parseInt(searchParams.get("i") || "", 10);
    if (!Number.isNaN(qp))
      return Math.max(0, Math.min(EXPERIENCE_DATA.length - 1, qp));
    const state = (location.state || {}) as { selectedIndex?: number };
    return typeof state.selectedIndex === "number" ? state.selectedIndex : 0;
  }, [location.state, searchParams]);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);
  const selected = EXPERIENCE_DATA[selectedIndex];

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <button
              onClick={() => navigate("/#experience")}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Home</span>
            </button>

            <h1 className="text-3xl font-bold text-white">All Experiences</h1>

            <div className="space-y-2">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setSearchParams({ i: String(idx) });
                  }}
                  className={`w-full text-left p-4 rounded-lg transition bg-slate-800 hover:bg-slate-700 ${
                    idx === selectedIndex ? "ring-2 ring-cyan-400" : ""
                  }`}
                >
                  <p className="text-xs text-cyan-400">{exp.duration}</p>
                  <p className="text-white font-semibold">{exp.role}</p>
                  <p className="text-slate-400 text-sm">{exp.company}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {selected.role}
            </h2>
            <p className="text-cyan-400 mb-1">{selected.company}</p>
            <p className="text-slate-400 mb-4">{selected.duration}</p>
            <div className="space-y-3">
              {selected.description.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300">{point}</p>
                </div>
              ))}
            </div>
            {(selected.githubUrl || selected.liveUrl) && (
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700">
                {selected.githubUrl && selected.githubUrl !== "#" && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <GithubIcon className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                )}
                {selected.liveUrl && selected.liveUrl !== "#" && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <LinkIcon className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            )}
            {(() => {
              const embed = getYouTubeEmbedUrl(selected.liveUrl);
              if (!embed) return null;
              return (
                <div className="mt-6">
                  <div
                    className="relative w-full"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src={embed}
                      title="YouTube video player"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {selected.detailedDescription && (
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-3">
                Detailed Overview
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {selected.detailedDescription}
              </p>
            </div>
          )}

          {selected.media && selected.media.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-6">
              <MediaGallery media={selected.media} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
