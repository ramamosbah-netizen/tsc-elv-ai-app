import React from 'react';
import { NAVIGATION, PROPOSAL_METADATA } from '../constants';
import CompanyLogo from './CompanyLogo';

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <div className="mb-4">
          <CompanyLogo className="scale-90 origin-left" />
        </div>
        <div className="pt-2 border-t border-slate-800/50">
          <h1 className="font-bold text-sm leading-tight text-slate-300">
            TSC ELV <span className="text-emerald-400">Proposal</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono mt-1">{PROPOSAL_METADATA.version} | 2025</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              activeSection === item.id 
                ? 'bg-emerald-500/10 text-emerald-400 border-r-4 border-emerald-500' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Lead</p>
        <p className="text-sm font-semibold text-slate-300">{PROPOSAL_METADATA.preparedBy}</p>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">ELV Engineer</p>
      </div>
    </div>
  );
};

export default Sidebar;