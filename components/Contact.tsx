import React from "react";
import { Section } from "./Section";
import { SOCIAL_LINKS } from "../constants";

export const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-slate-400 mb-12">
          I'm currently seeking graduate opportunities and am open to new
          challenges. If you have a role that might be a good fit, or just want
          to connect, please feel free to reach out. Let's build something
          amazing together!
        </p>

        <div className="bg-slate-800 rounded-lg p-8 shadow-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-6">
            Connect With Me
          </h3>
          <p className="text-slate-300 mb-8">
            Feel free to reach out through any of these channels:
          </p>

          <div className="flex justify-center items-center gap-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="flex flex-col items-center gap-3 text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 group"
              >
                <div className="p-4 bg-slate-700 rounded-full group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <link.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
