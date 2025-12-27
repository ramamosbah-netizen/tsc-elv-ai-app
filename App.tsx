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
  X,
  ChevronDown,
  Calendar
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
              onClick={() => window.open(drawing.fileUrl || drawing.imageUrl, '_blank')}
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
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: `${prompt}. Style: technical blueprint, architectural 3D render, dark tech aesthetic, professional, clean lines, high contrast, labeled components.` }]
        },
        config: {
          imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
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
              <h4 className="text-2xl font-bold text-white">AI Visualizer</h4>
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
            {generating ? 'Visualizing...' : 'Generate Architecture Diagram'}
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
  const [expandedRoadmapPhase, setExpandedRoadmapPhase] = useState<number | null>(0);
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
              Official Proposal
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
              <div className="text-left"><p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Lead</p><p className="font-semibold text-slate-200">{PROPOSAL_METADATA.preparedBy}</p></div>
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

        <SectionWrapper id="compliance" title="Regulatory Framework" subtitle="Ensuring adherence to mandatory local and international security standards.">
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
                  { code: 'SIRA PS-02', label: 'General Security System Guidelines' }
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
                          <th className="px-4 py-4 w-32">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-xs">
                        {SIRA_COMPLIANCE_MATRIX.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                            <td className="px-4 py-4 font-bold text-slate-300">{row.system}</td>
                            <td className="px-4 py-4 text-slate-200">{row.component}</td>
                            <td className="px-4 py-4 text-slate-400">{row.status}</td>
                            <td className="px-4 py-4 text-red-400 italic">{row.gap}</td>
                            <td className="px-4 py-4 text-emerald-400/80">{row.action}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border ${row.compliance === 'Non-compliant' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                                {row.compliance}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>
            )}

            {assessmentTab === 'cctv' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-500"><Camera size={20} /> CCTV Assessment Summary</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30">
                    <table className="w-full text-left min-w-[800px]">
                      <thead className="bg-slate-950 text-[10px] uppercase tracking-widest text-slate-500">
                        <tr>
                          <th className="px-6 py-4">Area</th>
                          <th className="px-6 py-4">Status / Observation</th>
                          <th className="px-6 py-4">Remarks</th>
                          <th className="px-6 py-4">Compliance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-xs">
                        {ASSESSMENT_SUMMARY.map((item, i) => (
                          <tr key={i} className="hover:bg-slate-800/50 transition-colors group">
                            <td className="px-6 py-4 font-bold text-slate-200">{item.area}</td>
                            <td className="px-6 py-4 text-slate-400">{item.status}</td>
                            <td className="px-6 py-4 text-slate-500 italic leading-relaxed">{item.remarks}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/20 font-bold uppercase text-[9px]">
                                {item.compliance}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </SectionWrapper>

        <SectionWrapper id="solution" title="Modernization Solution" subtitle="Integrated, redundant, and SIRA-compliant smart city infrastructure.">
          <div className="space-y-16">
            
            {/* 1.1 CCTV System Requirements */}
            <div className="space-y-8">
              <div className="border-l-4 border-emerald-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-white mb-2">1.1 CCTV System Requirements – SIRA Compliant</h3>
                <p className="text-slate-400 text-sm">Mandatory technical specifications based on STR-CCTV-2024 standards.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/30">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
                      <tr>
                        <th className="px-6 py-4 w-40">Feature</th>
                        <th className="px-6 py-4">SIRA-Compliant Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {CCTV_SIRA_REQUIREMENTS.map((req, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-3 font-bold text-emerald-400">{req.feature}</td>
                          <td className="px-6 py-3 text-slate-300 leading-relaxed">{req.requirement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="space-y-6">
                   <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
                      <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><MapIcon size={18} className="text-emerald-500" /> CCTV Placement Compliance Grid (SIRA)</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-slate-800 text-slate-500 font-bold">
                            <tr>
                              <th className="py-2">Area</th>
                              <th className="py-2">Required</th>
                              <th className="py-2">Existing</th>
                              <th className="py-2 text-emerald-400">Proposed</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/50">
                            {CCTV_COMPLIANCE_GRID.map((row, i) => (
                              <tr key={i}>
                                <td className="py-3 font-medium">{row.area}</td>
                                <td className="py-3">{row.required}</td>
                                <td className="py-3 text-red-400">{row.existing}</td>
                                <td className="py-3 font-bold text-emerald-400">{row.proposed}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                   </div>
                   <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20">
                      <h4 className="text-sm uppercase font-black tracking-widest text-emerald-400 mb-4">Design Objectives (SIRA Compliant)</h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                         {["Replace all outdated cameras with SIRA-approved IP cameras.", "Ensure full DORI coverage across all areas.", "Expand coverage in plazas, parking, ring roads, and critical facilities.", "Integrate all cameras into central VMS with audit logging and cybersecurity hardening.", "Upgrade storage to centralized NAS/SAN with RAID, failover, encryption, and ≥90-day retention."].map((obj, i) => (
                           <li key={i} className="flex gap-3"><CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" /> {obj}</li>
                         ))}
                      </ul>
                   </div>
                </div>
              </div>
            </div>

            {/* 1.2 Access Control System */}
            <div className="space-y-8">
              <div className="border-l-4 border-amber-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-white mb-2">1.2 Access Control & Gate Barriers – SIRA Compliant</h3>
                <p className="text-slate-400 text-sm">Technical standards for automated perimeter and facility access (STR-ACSS-2024).</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/30">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
                      <tr>
                        <th className="px-6 py-4 w-40">Feature</th>
                        <th className="px-6 py-4">SIRA-Compliant Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {ACSS_SIRA_REQUIREMENTS.map((req, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-3 font-bold text-amber-400">{req.feature}</td>
                          <td className="px-6 py-3 text-slate-300 leading-relaxed">{req.requirement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-amber-500/5 p-8 rounded-2xl border border-amber-500/20 flex flex-col justify-center">
                   <h4 className="text-sm uppercase font-black tracking-widest text-amber-400 mb-6">Design Objectives (SIRA Compliant)</h4>
                   <ul className="space-y-4 text-sm text-slate-300">
                      {[
                        "Install centralized ACSS controllers at all critical access points.",
                        "Integrate all residential, facility, and service access into a unified platform.",
                        "Enable automated vehicle and visitor access via ANPR, RFID, QR/OTP.",
                        "Ensure full audit logging with tamper-proof retention and reporting.",
                        "Provide emergency override capabilities and fail-safe mechanisms at all critical points.",
                        "Enable future scalability and seamless integration with other smart city systems."
                      ].map((obj, i) => (
                        <li key={i} className="flex gap-4"><CheckCircle size={18} className="text-amber-500 shrink-0 mt-0.5" /> {obj}</li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>

            {/* 1.3 Network & Control Room */}
            <div className="space-y-8">
              <div className="border-l-4 border-cyan-500 pl-6 py-2">
                <h3 className="text-2xl font-bold text-white mb-2">1.3 Network & Control Room – SIRA Compliant</h3>
                <p className="text-slate-400 text-sm">Enterprise infrastructure for secure operations and redundancy (SCCR-2024).</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/30">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
                      <tr>
                        <th className="px-6 py-4 w-40">Feature</th>
                        <th className="px-6 py-4">SIRA-Compliant Requirement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {NETWORK_SIRA_REQUIREMENTS.map((req, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-6 py-3 font-bold text-cyan-400">{req.feature}</td>
                          <td className="px-6 py-3 text-slate-300 leading-relaxed">{req.requirement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-cyan-500/5 p-8 rounded-2xl border border-cyan-500/20 flex flex-col justify-center">
                   <h4 className="text-sm uppercase font-black tracking-widest text-cyan-400 mb-6">Design Objectives (SIRA Compliant)</h4>
                   <ul className="space-y-4 text-sm text-slate-300">
                      {[
                        "Implement fully centralized and segregated network for all ELV systems.",
                        "Ensure redundant power and network infrastructure for uninterrupted 24/7 operation.",
                        "Deploy ergonomic control room with dual-monitor workstations and professional video wall.",
                        "Enable secure, tamper-proof logging of all events and system changes.",
                        "Ensure future scalability for system expansions and integrations."
                      ].map((obj, i) => (
                        <li key={i} className="flex gap-4"><CheckCircle size={18} className="text-cyan-500 shrink-0 mt-0.5" /> {obj}</li>
                      ))}
                   </ul>
                </div>
              </div>
            </div>

            {/* TO-BE Summary Section */}
            <div className="pt-12">
               <div className="flex items-center gap-3 mb-8">
                 <FileCode size={32} className="text-emerald-500" />
                 <h2 className="text-3xl font-bold">TO-BE Summary</h2>
               </div>
               <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/40 shadow-2xl">
                 <table className="w-full text-left min-w-[1000px]">
                   <thead className="bg-slate-950/80 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                     <tr>
                       <th className="px-6 py-5">Sub-System</th>
                       <th className="px-6 py-5">Location / Coverage</th>
                       <th className="px-6 py-5">Device Type / Specification</th>
                       <th className="px-6 py-5">SIRA Compliance Notes</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-800 text-xs">
                     {TO_BE_SUMMARY.map((item, i) => (
                       <tr key={i} className="hover:bg-slate-800/40 transition-all group">
                         <td className="px-6 py-4 font-black text-emerald-400 tracking-tight">{item.subSystem}</td>
                         <td className="px-6 py-4 text-slate-300 font-medium">{item.location}</td>
                         <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">{item.specs}</td>
                         <td className="px-6 py-4">
                            <div className="flex items-start gap-2">
                               <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                               <span className="text-slate-400 italic leading-relaxed">{item.compliance}</span>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Summary of Required Enhancements */}
            <div className="bg-gradient-to-r from-emerald-600/10 to-transparent p-10 rounded-3xl border border-emerald-500/20">
               <h4 className="text-2xl font-bold mb-8 flex items-center gap-3"><Zap className="text-emerald-400" /> Summary of Required Enhancements</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Replace outdated cameras with SIRA-approved models",
                    "Add new cameras to achieve full coverage",
                    "Upgrade storage to meet 30-day retention",
                    "Deploy new ANPR cameras and safety accessories",
                    "Upgrade access control controllers & monitoring sensors",
                    "Establish dedicated Surveillance Network (Security VLAN)",
                    "Upgrade Control Room with new VMS server + video wall",
                    "Provide full BOQ for each subsystem"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-xl border border-white/5 shadow-lg">
                       <CheckCircle className="text-emerald-500" size={18} />
                       <span className="text-sm font-medium text-slate-200">{item}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="visualizer" title="AI Visualizer" subtitle="Harness Gemini Generative AI to visualize complex ELV system architectures in real-time.">
           <AIDiagramGenerator />
        </SectionWrapper>

        <SectionWrapper id="boq" title="Bill of Quantities (BOQ)" subtitle="Detailed technical breakdown of proposed hardware and infrastructure.">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: "CCTV Cameras", value: "184 Units", icon: <Camera className="text-emerald-400" /> },
                 { label: "Access Points", value: "54 Readers", icon: <Lock className="text-emerald-400" /> },
                 { label: "Backbone Fiber", value: "1.0 KM", icon: <Network className="text-emerald-400" /> },
                 { label: "Storage", value: "220 TB Raw", icon: <Database className="text-emerald-400" /> }
               ].map((card, i) => (
                 <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">{card.icon}</div>
                    <div><p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{card.label}</p><p className="text-xl font-bold">{card.value}</p></div>
                 </div>
               ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" placeholder="Search BOQ items..." className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50" value={boqSearch} onChange={(e) => setBoqSearch(e.target.value)}/>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setSelectedBoqCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${selectedBoqCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                  <thead className="bg-slate-950/50 text-xs uppercase tracking-widest text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-4 w-12"></th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Unit</th>
                      <th className="px-6 py-4 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-sm">
                    {filteredBOQ.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <tr 
                          onClick={() => setExpandedBoqItem(expandedBoqItem === idx ? null : idx)}
                          className={`hover:bg-slate-800/30 transition-colors cursor-pointer group ${expandedBoqItem === idx ? 'bg-emerald-500/5' : ''}`}
                        >
                          <td className="px-6 py-4 text-slate-500">
                             {expandedBoqItem === idx ? <Minus size={14} className="text-emerald-500" /> : <Plus size={14} />}
                          </td>
                          <td className="px-6 py-4">
                             <span className="text-[10px] font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase">{item.category}</span>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                          <td className="px-6 py-4 text-right font-mono font-bold text-slate-300">{item.quantity}</td>
                        </tr>
                        {expandedBoqItem === idx && (
                          <tr className="bg-slate-950/40 border-l-4 border-emerald-500">
                            <td colSpan={5} className="p-0 overflow-hidden">
                               <div className="px-12 py-8 space-y-8 animate-in slide-in-from-top-4 duration-300">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                     <div className="space-y-6">
                                        <div>
                                           <p className="text-[10px] uppercase font-black text-emerald-500 tracking-[0.2em] mb-4">Manufacturer Info</p>
                                           <div className="space-y-3">
                                              <div>
                                                 <p className="text-[9px] text-slate-500 uppercase font-bold">Part Number</p>
                                                 <p className="text-xs font-mono text-slate-300 p-2 bg-slate-900 rounded border border-slate-800 mt-1">{item.partNumber || 'Refer to Submittal'}</p>
                                              </div>
                                              <div>
                                                 <p className="text-[9px] text-slate-500 uppercase font-bold">Standard Warranty</p>
                                                 <p className="text-xs text-slate-300 p-2 bg-slate-900 rounded border border-slate-800 mt-1">{item.warranty || 'Project Standard 2Y'}</p>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                     <div className="md:col-span-2">
                                        <p className="text-[10px] uppercase font-black text-emerald-500 tracking-[0.2em] mb-4">Technical Specifications Detail</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                                           {item.technicalSpecs?.map((spec, si) => (
                                             <div key={si} className="flex items-start gap-3 text-xs text-slate-400">
                                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                               <span>{spec}</span>
                                             </div>
                                           ))}
                                           {!item.technicalSpecs && <p className="text-xs text-slate-600 italic">Detailed datasheets provided in Volume II of the technical submittal.</p>}
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="reference" title="Technical Reference" subtitle="Access detailed architectural drawings, master plans, and network schematics.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_DRAWINGS.map((doc) => (
              <div key={doc.id} className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-2xl hover:shadow-emerald-900/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-800 rounded-2xl group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                    <FileBox size={24} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 bg-slate-800 text-slate-400 rounded uppercase tracking-widest border border-slate-700">
                    {doc.drawingNo}
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-[9px] uppercase font-black tracking-[0.2em] text-emerald-500/70 mb-1 block">
                    {doc.type}
                  </span>
                  <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {doc.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setViewingDrawing(doc)}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-700"
                  >
                    <Eye size={14} /> View
                  </button>
                  <a 
                    href={doc.fileUrl || doc.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 py-2.5 rounded-xl text-xs font-bold transition-all border border-emerald-500/20"
                  >
                    <Download size={14} /> PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-br from-emerald-900/20 to-transparent p-10 rounded-3xl border border-emerald-500/20 flex flex-col md:flex-row items-center gap-8">
            <div className="p-6 bg-emerald-500/20 rounded-full">
              <FileSearch size={48} className="text-emerald-400" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Full Document Package</h4>
              <p className="text-slate-400 max-w-2xl mb-6">
                Download the complete set of technical submittals, including full-resolution SIRA layouts and site acceptance protocols.
              </p>
              <button 
                onClick={() => window.open("https://drive.google.com/file/d/10z2M0WXHRvK4qPbtYrD64Az0ASIlArZw/view?usp=drive_link", "_blank")}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-3 active:scale-[0.98]"
              >
                <FileText size={20} /> Download Master Reference PDF
              </button>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="implementation" title="Implementation Roadmap" subtitle="A structured phased approach to minimize operational downtime and ensure SIRA compliance at every milestone.">
          <div className="max-w-5xl mx-auto space-y-4">
            {PHASES.map((phase, idx) => (
              <div 
                key={idx} 
                className={`group relative border rounded-3xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                  expandedRoadmapPhase === idx 
                    ? 'bg-slate-900 border-emerald-500/50 shadow-2xl shadow-emerald-900/10' 
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
                onClick={() => setExpandedRoadmapPhase(expandedRoadmapPhase === idx ? null : idx)}
              >
                {/* Header Section */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl border transition-all duration-300 ${
                      expandedRoadmapPhase === idx 
                        ? 'bg-emerald-500 border-emerald-400 text-white rotate-3 shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-800 border-slate-700 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className={`text-xl md:text-2xl font-bold transition-colors ${
                        expandedRoadmapPhase === idx ? 'text-white' : 'text-slate-300'
                      }`}>
                        {phase.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400/80">
                          <Clock size={12} /> {phase.duration}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
                          {phase.tasks.length} Major Milestones
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      expandedRoadmapPhase === idx ? 'bg-emerald-500/20 text-emerald-400 rotate-180' : 'bg-slate-800 text-slate-500'
                    }`}>
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedRoadmapPhase === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-8 md:px-24 border-t border-slate-800/50 pt-8 bg-slate-950/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {phase.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="group/task relative pl-8 border-l border-slate-800 hover:border-emerald-500/50 transition-colors pb-4">
                          {/* Task Indicator Dot */}
                          <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 group-hover/task:bg-emerald-500 transition-colors"></div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-slate-200 group-hover/task:text-emerald-400 transition-colors">
                              {task.name}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                              {task.duration}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed group-hover/task:text-slate-400 transition-colors">
                            {task.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                          <Calendar size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Estimated Commencement</p>
                          <p className="text-xs text-slate-400">Post-Contract Signature + 14 Days Mobilization</p>
                        </div>
                      </div>
                      <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2">
                        <ArrowRight size={14} /> Schedule Consultation
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Background Elements */}
                {expandedRoadmapPhase === idx && (
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Activity size={200} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper id="benefits" title="Final Recommendation" subtitle="Ensuring safety, efficiency, and future-readiness for TSC.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Projected Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Elimination of SIRA Fines", "100% Coverage Confidence", "Reduced Response Times", "Automated Access Control", "Higher Property Value", "Lower Maintenance Costs"].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl"><ShieldCheck className="text-emerald-500 shrink-0" size={18} /><span className="text-sm font-medium">{benefit}</span></div>
                ))}
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border-t-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-4">Strategic Value</h3>
                <p className="text-slate-400 leading-relaxed mb-6">The proposed upgrade ensures that <span className="text-slate-100">The Sustainable City</span> remains a leader in urban sustainability and security. By integrating advanced optics with enterprise-grade storage, we provide a platform ready for the smart city innovations of 2030 and beyond.</p>
                <button onClick={() => alert("Printing Full Technical Specs PDF...")} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all"><ExternalLink size={18} /> Download Detailed Technical Specs</button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 p-1 rounded-3xl shadow-2xl shadow-emerald-900/20">
                <div className="bg-slate-950 p-10 rounded-[calc(1.5rem-2px)] text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} className="text-emerald-400" /></div>
                  <h3 className="text-3xl font-bold mb-4">Ready for SIRA Approval?</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">This proposal is fully vetted for 2024 compliance. Contact our team to finalize the Site Survey and begin Phase 1 deployment.</p>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">Contact Representative</p>
                    <p className="text-xl font-bold text-slate-100">{PROPOSAL_METADATA.preparedBy}</p>
                    <p className="text-emerald-400 font-mono text-sm">JEET Integrated Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="mt-20 py-12 border-t border-slate-900 flex flex-col items-center gap-6">
            <CompanyLogo className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-default scale-110" />
            <div className="flex justify-between w-full max-w-6xl items-center text-slate-600 text-[10px] font-mono tracking-widest uppercase px-12"><div>© 2025 JEET INTEGRATED TECHNOLOGY</div><div>STRICTLY CONFIDENTIAL - TSC DUBAI</div><div>VERSION 1.0</div></div>
          </footer>
        </SectionWrapper>
      </main>

      <DrawingModal 
        drawing={viewingDrawing} 
        onClose={() => setViewingDrawing(null)} 
      />

      <AIConsultant proposalContent={proposalString} />

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes loading-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-shimmer {
          animation: loading-shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default App;