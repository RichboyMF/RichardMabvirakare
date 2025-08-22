import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-12 animate-fade-in-up animation-delay-200 animation-fill-backwards">
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/60 rounded-xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {title}
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        {children}
      </div>
    </section>
  );
};