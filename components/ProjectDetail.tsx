import React, { useState } from "react";
import {
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  GithubIcon,
  LinkIcon,
} from "./Icons";
import type { ProjectItem } from "../types";

interface ProjectDetailProps {
  project: ProjectItem;
  onBack: () => void;
}

const MediaGallery: React.FC<{ media: ProjectItem["media"] }> = ({ media }) => {
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
      <h3 className="text-2xl font-bold text-white mb-4">Project Gallery</h3>

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

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
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
            <span>Back to Projects</span>
          </button>

          <div className="bg-slate-800 rounded-lg p-6">
            <h1 className="text-3xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-slate-700 text-cyan-300 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-4">
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <GithubIcon className="w-5 h-5" />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.certificateUrl && (
                <a
                  href={project.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
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
                  <span>Certificate</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {project.detailedDescription && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Project Details
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {project.detailedDescription}
            </p>
          </div>
        )}

        {/* Media Gallery */}
        {project.media && project.media.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6">
            <MediaGallery media={project.media} />
          </div>
        )}
      </div>
    </div>
  );
};
