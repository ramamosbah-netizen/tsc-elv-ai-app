import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import AIConsultant from './components/AIConsultant';
import SectionWrapper from './components/SectionWrapper';
import CompanyLogo from './components/CompanyLogo';
import { GoogleGenAI } from "@google/genai";
import { 
  PROPOSAL_METADATA, 
  ISSUES, 
  RISKS, 
  SOLUTION_OVERVIEW, 
  TO_BE_SUMMARY,
  PHASES,
  BOQ_DATA,
  ASSESSMENT_SUMMARY,
  ACCESS_CONTROL_SUMMARY,
  CCTV_DISTRIBUTION_CHART,
  CCTV_SIRA_REQUIREMENTS,
  CCTV_COMPLIANCE_GRID,
  ACSS_SIRA_REQUIREMENTS,
  NETWORK_SIRA_REQUIREMENTS,
  SIRA_COMPLIANCE_MATRIX,
  TECHNICAL_DRAWINGS
} from './constants';
import { 
  ChevronRight, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  ArrowRight, 
  Camera, 
  Lock, 
  CheckCircle, 
  Search, 
  Network, 
  Database, 
  Globe, 
  AlertTriangle, 
  Server, 
  Monitor, 
  Maximize2, 
  Layers, 
  Sparkles, 
  Map as MapIcon, 
  Workflow, 
  Eye, 
  FileCode, 
  Plus, 
  Minus, 
  Wand2, 
  Image as ImageIcon,
  FileText,
  Clock,
  ExternalLink,
  Settings,
  FileSearch,
  Zap,
  Download,
  FileBox,
  X
} from 'lucide-react';
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { TechnicalDrawing } from './types';

const DrawingModal: React.FC<{ drawing: TechnicalDrawing | null; onClose: () => void }> = ({ drawing, onClose }) => {
  if (!drawing) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-7xl h-full max-h-[90vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1 block">{drawing.type}</span>
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              {drawing.title}
              <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">{drawing.drawingNo}</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto bg-slate-950 p-4 flex items-center justify-center">
          <img 
            src={drawing.imageUrl} 
            alt={drawing.title} 
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
        </div>
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex flex-col md:flex-row gap-6 items-center justify-between">
          <p className="text-sm text-slate-400 max-w-2xl">{drawing.description}</p>
          <div className="flex gap-4">
            <button 
              onClick={() => window.open(drawing.imageUrl, '_blank')}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
            >
              <Download size={18} /> Download High-Res
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIDiagramGenerator: React.FC = () => {
  const examples = [
    { label: "Centralized VMS Hub", prompt: "A professional architectural diagram of a centralized security VMS hub with multiple monitoring stations, enterprise servers, and 4K displays." },
    { label: "RAID 6 Storage Cluster", prompt: "Technical cutaway diagram of a high-availability RAID 6 storage server rack with redundant power supplies and enterprise SAS drives." },
    { label: "Network Integration", prompt: "Logical schematic of a Layer 3 security network integration involving fiber-optic backbone, PoE managed switches, and isolated VLANs for CCTV." }
  ];

  const [prompt, setPrompt] = useState(examples[0].prompt);
  const [generating, setGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateDiagram = async () => {
    setGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `${prompt}. Style: technical engineering blueprint, architectural 3D render, dark tech aesthetic, professional, clean lines, high contrast, labeled components.` }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
            break;
          }
        }
      }
    } catch (err) {
      console.error("Diagram Generation Error:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Wand2 size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-2xl font-bold text-white">AI System Architect</h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Use Gemini AI to generate conceptual system diagrams for the proposal. Select an example or enter a custom prompt.
            </p>
          </div>

          <div className="space-y-4">
             <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Quick Examples</p>
             <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPrompt(ex.prompt)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${prompt === ex.prompt ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    {ex.label}
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Visualization Prompt</p>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-40 resize-none transition-all focus:border-emerald-500/50"
              placeholder="Describe the system architecture..."
            />
          </div>

          <button 
            onClick={generateDiagram}
            disabled={generating}
            className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-black transition-all w-full justify-center shadow-lg shadow-emerald-900/20 active:scale-[0.98]"
          >
            {generating ? <Activity className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {generating ? 'Architecting Visual...' : 'Generate Architecture Diagram'}
          </button>
        </div>

        <div className="lg:w-3/5 aspect-video bg-slate-950 rounded-3xl border-2 border-slate-800 flex items-center justify-center relative overflow-hidden group shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_transparent_70%)] opacity-30"></div>
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="AI Generated Architecture" className="w-full h-full object-contain relative z-10 p-4" />
              <div className="absolute inset-0 bg-slate-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                 <div className="flex flex-col items-center gap-4">
                    <button onClick={() => window.open(imageUrl)} className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold flex items-center gap-2 transition-all">
                      <Maximize2 size={18} /> Full Screen View
                    </button>
                 </div>
              </div>
            </>
          ) : (
            <div className="text-center relative z-10 p-12">
              <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-800">
                <ImageIcon size={40} className="text-slate-700" />
              </div>
              <p className="text-sm text-slate-500 font-mono uppercase tracking-widest max-w-xs mx-auto">
                {generating ? "Synthesizing Engineering Visual..." : "Architecture canvas awaiting your command"}
              </p>
              {generating && (
                <div className="mt-8 flex justify-center">
                   <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-emerald-500 animate-loading-shimmer"></div>
                   </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cover');
  const [assessmentTab, setAssessmentTab] = useState<'cctv' | 'acss' | 'matrix'>('matrix');
  const [boqSearch, setBoqSearch] = useState('');
  const [selectedBoqCategory, setSelectedBoqCategory] = useState<string>('All');
  const [expandedBoqItem, setExpandedBoqItem] = useState<number | null>(null);
  const [viewingDrawing, setViewingDrawing] = useState<TechnicalDrawing | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(BOQ_DATA.map(item => item.category)));
    return ['All', ...cats];
  }, []);

  const filteredBOQ = useMemo(() => {
    return BOQ_DATA.filter(item => {
      const matchesSearch = item.description.toLowerCase().includes(boqSearch.toLowerCase());
      const matchesCategory = selectedBoqCategory === 'All' || item.category === selectedBoqCategory;
      return matchesSearch && matchesCategory;
    });
  }, [boqSearch, selectedBoqCategory]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['cover', 'overview', 'compliance', 'assessment', 'solution', 'visualizer', 'boq', 'reference', 'implementation', 'benefits'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pieData = [
    { name: 'Non-compliant', value: 85, fill: '#ef4444' },
    { name: 'Partial', value: 15, fill: '#f59e0b' }
  ];

  const proposalString = JSON.stringify({ 
    PROPOSAL_METADATA, 
    AS_IS_CCTV_ASSESSMENT: ASSESSMENT_SUMMARY,
    SIRA_COMPLIANCE_MATRIX,
    SOLUTION_OVERVIEW, 
    PHASES,
    BOQ_DATA,
    TECHNICAL_DRAWINGS
  });

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
      
      <main className="flex-1 relative overflow-x-hidden">
        <section id="cover" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920&grayscale=true" 
              alt="Dubai TSC" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center px-6">
            <div className="mb-12 flex flex-col items-center">
               <CompanyLogo className="scale-150 mb-4" />
               <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6 tracking-wider uppercase">
              Official Engineering Proposal
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              CCTV & ELV Systems <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-serif">Upgrade Proposal</span>
            </h1>
            <p className="text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Modernizing infrastructure for <span className="text-slate-100 font-semibold italic">The Sustainable City (TSC)</span>, Dubai.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-slate-800 pt-12">
              <div className="text-left"><p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Prepared For</p><p className="font-semibold text-slate-200">The Sustainable City</p></div>
              <div className="text-left"><p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Lead Engineer</p><p className="font-semibold text-slate-200">Eng. Mosbah Rama</p></div>
              <div className="text-left"><p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Compliance</p><p className="font-semibold text-slate-200">SIRA STR-2024</p></div>
              <div className="text-left"><p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Date Issued</p><p className="font-semibold text-slate-200">Dec 2025</p></div>
            </div>
          </div>
        </section>

        <SectionWrapper id="overview" title="Executive Overview" subtitle="Modernizing ELV infrastructure for the smart city era.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-slate-300">
              <p>This proposal outlines the assessment and proposed modernization of the ELV infrastructure at <span className="text-emerald-400 font-semibold underline underline-offset-4">The Sustainable City (TSC)</span>.</p>
              <p>The assessment covers CCTV, Access Control (ACSS), ANPR, and the Central Control Room, conducted in accordance with <span className="font-mono text-sm bg-slate-800 px-2 py-1 rounded">SIRA STR-2024</span> requirements.</p>
              <p className="bg-slate-900 border-l-4 border-emerald-500 p-6 rounded-r-xl italic">"Our objective is to ensure full regulatory compliance, operational reliability, and enhanced situational awareness across the community."</p>
            </div>
            <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cpu className="text-emerald-400" /> Current Tech Stack Components</h3>
              <ul className="space-y-4">
                {[
                  'PLAZA CCTV system', 
                  'Ring Road & perimeter CCTV', 
                  'Parking CCTV system', 
                  'ANPR (Number Plate Recognition)', 
                  'Access Control System (ACSS)', 
                  'Central Control Room (CCR)', 
                  'Network & Storage Redundancy'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="compliance" title="Regulatory Framework" subtitle="Ensuring adherence to mandatory local and international security engineering standards.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><ShieldCheck className="text-emerald-400" /> SIRA Regulations</h3>
              <ul className="space-y-5">
                {[
                  { code: 'STR-CCTV-2024', label: 'CCTV Technical Requirements' },
                  { code: 'SCCR-2024', label: 'Security Command & Control Rooms' },
                  { code: 'STR-ANPR-2024', label: 'LPR/ANPR Compliance' },
                  { code: 'STR-ACSS-2024', label: 'Access Control Standards' },
                  { code: 'STR-NET-2024', label: 'Security Network Architecture' },
                  { code: 'SIRA PS-02', label: 'General System Guidelines' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="text-emerald-500 font-mono text-xs font-bold pt-1 min-w-[120px]">{item.code}</div>
                    <div className="text-slate-300 text-sm font-medium">{item.label}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Globe className="text-cyan-400" /> International Standards</h3>
              <ul className="space-y-5">
                {[
                  { code: 'UAE Fire Code', label: 'Life Safety Standards (2024 Edition)' },
                  { code: 'ISO/IEC 27001', label: 'Information Security Management' },
                  { code: 'ISO 22301', label: 'Business Continuity Management' },
                  { code: 'ANSI/TIA-568', label: 'Structured Cabling Standards' },
                  { code: 'IEC/EN 62676', label: 'Video Surveillance Standards' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="text-cyan-500 font-mono text-xs font-bold pt-1 min-w-[120px]">{item.code}</div>
                    <div className="text-slate-300 text-sm font-medium">{item.label}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="assessment" title="As-Is System Assessment" subtitle="Current status audit of existing CCTV and Access Control infrastructure.">
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center">
                <h4 className="text-sm uppercase font-bold text-slate-500 mb-4">Overall Compliance</h4>
                <div className="h-48 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div><span className="text-xs">Non-compliant</span></div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div><span className="text-xs">Partial</span></div>
                </div>
              </div>
              <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl flex items-center gap-8">
                 <div className="p-4 bg-red-500/10 rounded-full shrink-0"><AlertTriangle className="text-red-500" size={40} /></div>
                 <div>
                    <h4 className="text-xl font-bold text-red-400 mb-2">Critical Finding: Storage Shortfall</h4>
                    <p className="text-slate-400 leading-relaxed">The current retention period (16-30 days) fails to meet the <span className="text-slate-100 font-bold underline">SIRA mandated 31 days</span> for high-scale residential campus monitoring. This is a level 1 compliance failure requiring immediate hardware upgrade with <span className="text-emerald-400 font-bold">RAID for redundancy</span>.</p>
                 </div>
              </div>
            </div>

            <div className="flex border-b border-slate-800 overflow-x-auto">
              <button 
                onClick={() => setAssessmentTab('matrix')}
                className={`px-8 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${assessmentTab === 'matrix' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}
              >
                SIRA Compliance Matrix
              </button>
              <button 
                onClick={() => setAssessmentTab('cctv')}
                className={`px-8 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${assessmentTab === 'cctv' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}
              >
                CCTV Assessment
              </button>
              <button 
                onClick={() => setAssessmentTab('acss')}
                className={`px-8 py-4 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${assessmentTab === 'acss' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}
              >
                Access Control
              </button>
            </div>

            {assessmentTab === 'matrix' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                 <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400"><AlertTriangle size={20} /> High-Level SIRA Compliance Matrix</h4>
                 <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
                    <table className="w-full text-left table-fixed min-w-[1200px]">
                      <thead className="bg-slate-950 text-[10px] uppercase tracking-widest text-slate-500">
                        <tr>
                          <th className="px-4 py-4 w-28">System</th>
                          <th className="px-4 py-4 w-48">Component</th>
                          <th className="px-4 py-4 w-48">Current Status</th>
                          <th className="px-4 py-4 w-64">Non-Compliance / Gap</th>
                          <th className="px-4 py-4 w-64">Recommended Action</th>
                          <th