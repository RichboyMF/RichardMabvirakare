import React from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "./Section";
import { EXPERIENCE_DATA } from "../constants";
import type { ExperienceItem } from "../types";
import { BriefcaseIcon } from "./Icons";

const ExperienceCard: React.FC<{
  item: ExperienceItem;
  index: number;
}> = ({ item, index }) => {
  const isRightAligned = index % 2 === 0;
  const navigate = useNavigate();

  const card = (
    <div
      className={`bg-slate-800 rounded-lg shadow-xl w-5/12 px-6 py-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/20 cursor-pointer ${
        isRightAligned ? "text-left" : "text-right"
      }`}
      onClick={() =>
        navigate("/experiences", { state: { selectedIndex: index } })
      }
    >
      <p className="text-sm text-cyan-400">{item.duration}</p>
      <h3 className="mb-2 font-bold text-white text-xl">{item.role}</h3>
      <h4 className="mb-3 font-semibold text-slate-400 text-md">
        {item.company}
      </h4>
      <ul className="list-disc list-inside text-slate-300 text-sm text-left">
        {item.description.map((point, i) => (
          <li key={i} className="mb-1">
            {point}
          </li>
        ))}
      </ul>
      {item.media && item.media.length > 0 && (
        <div className="mt-3 text-xs text-cyan-400">
          📷 View Media ({item.media.length} items)
        </div>
      )}
    </div>
  );

  const icon = (
    <div className="z-20 flex items-center bg-slate-800 shadow-xl w-12 h-12 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">
        <BriefcaseIcon className="h-6 w-6 text-cyan-400 transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_theme(colors.cyan.400)]" />
      </h1>
    </div>
  );

  const spacer = <div className="w-5/12"></div>;

  return (
    <div className="mb-8 flex justify-between items-center w-full group">
      {isRightAligned ? spacer : card}
      {icon}
      {isRightAligned ? card : spacer}
    </div>
  );
};

export const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="relative">
        <div className="absolute top-0 border-slate-700 h-full border left-1/2 -translate-x-1/2"></div>
        {EXPERIENCE_DATA.map((item, index) => (
          <ExperienceCard key={index} item={item} index={index} />
        ))}
      </div>
    </Section>
  );
};
