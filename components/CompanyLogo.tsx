
import React from 'react';

interface CompanyLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ className = "", variant = 'dark' }) => {
  return (
    <div className={`flex items-center gap-0 select-none ${className}`}>
      {/* Left side: JEET INTECH */}
      <div className="flex flex-col leading-none">
        <span className={`text-[24px] font-bold font-serif tracking-tight ${variant === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
          JEET
        </span>
        <span className="text-[12px] font-bold font-sans tracking-[0.2em] text-cyan-600 -mt-1">
          INTECH
        </span>
      </div>

      {/* Right side: SEE' ENGINEERING Box */}
      <div className="ml-3 border-l border-slate-700 pl-3">
        <div className="bg-slate-800 px-2 py-1 rounded-sm flex flex-col items-start leading-tight">
          <span className="text-[6px] uppercase tracking-widest text-slate-400 font-bold">
            A SUBSIDIARY OF
          </span>
          <span className="text-[10px] uppercase font-bold text-white tracking-tighter">
            SEE' <span className="text-slate-300">ENGINEERING</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogo;
