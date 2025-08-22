import React from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "./Section";
import { PROJECTS_DATA } from "../constants";
import type { ProjectItem } from "../types";
import { GithubIcon, LinkIcon } from "./Icons";

// Helper component to find and link the "Cars4Mars" text
const TextWithLink: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(Cars4Mars)/gi);
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === "cars4mars" ? (
          <a
            key={index}
            href="https://cars4mars.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
            onClick={(e) => e.stopPropagation()} // Prevents the card's onClick from firing
          >
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem; index: number }> = ({
  project,
  index,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer"
      onClick={() => navigate("/projects", { state: { selectedIndex: index } })}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">
          <TextWithLink text={project.title} />
        </h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow">
          <TextWithLink text={project.description} />
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-700 text-cyan-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-slate-700 flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <GithubIcon className="w-5 h-5" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
        {project.media && project.media.length > 0 && (
          <div className="mt-3 text-xs text-cyan-400">
            📷 View Media ({project.media.length} items)
          </div>
        )}
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  return (
    <Section id="projects" title="My Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};
