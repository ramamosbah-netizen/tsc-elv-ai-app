
import React from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, subtitle, children }) => {
  return (
    <section id={id} className="min-h-screen py-16 px-12 border-b border-slate-800/50 flex flex-col">
      <div className="mb-10">
        <h2 className="text-4xl font-bold tracking-tight mb-2 text-slate-100">{title}</h2>
        {subtitle && <p className="text-lg text-slate-400 max-w-2xl">{subtitle}</p>}
        <div className="h-1 w-20 bg-emerald-500 mt-4 rounded-full"></div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
