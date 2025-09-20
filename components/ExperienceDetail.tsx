import React, { useState } from "react";
import { ArrowLeftIcon, PlayIcon, PauseIcon } from "./Icons";
import type { ExperienceItem } from "../types";

interface ExperienceDetailProps {
  experience: ExperienceItem;
  onBack: () => void;
}

const MediaGallery: React.FC<{ media: ExperienceItem["media"] }> = ({
  media,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!media || media.length === 0) return null;

  const selectedMedia = media[selectedIndex];

  const handleVideoPlayPause = () => {
    const video = document.getElementById("detail-video") as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white mb-4">Media Gallery</h3>

      {/* Main media display */}
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
              id="detail-video"
              src={selectedMedia.src}
              className="w-full h-96 object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={handleVideoPlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"
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
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
            <p className="text-sm">{selectedMedia.caption}</p>
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {media.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                index === selectedIndex
                  ? "ring-2 ring-cyan-400"
                  : "hover:ring-2 hover:ring-cyan-400/50"
              }`}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-20 object-cover"
                />
              ) : (
                <div className="relative w-full h-20 bg-slate-700 flex items-center justify-center">
                  <PlayIcon className="w-6 h-6 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const ExperienceDetail: React.FC<ExperienceDetailProps> = ({
  experience,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 mb-6"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Experience</span>
          </button>

          <div className="bg-slate-800 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {experience.role}
            </h1>
            <h2 className="text-xl text-cyan-400 mb-2">{experience.company}</h2>
            <p className="text-slate-400 mb-4">{experience.duration}</p>

            <div className="space-y-3">
              {experience.description.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300">{point}</p>
                </div>
              ))}
            </div>

            {experience.certificateUrl && (
              <div className="mt-6 pt-4 border-t border-slate-700">
                <a
                  href={experience.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>View Certificate</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Description */}
        {experience.detailedDescription && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Detailed Overview
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {experience.detailedDescription}
            </p>
          </div>
        )}

        {/* Media Gallery */}
        {experience.media && experience.media.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6">
            <MediaGallery media={experience.media} />
          </div>
        )}
      </div>
    </div>
  );
};
