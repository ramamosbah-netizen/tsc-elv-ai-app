
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import AIConsultant from './components/AIConsultant';
import SectionWrapper from './components/SectionWrapper';
import CompanyLogo from './components/CompanyLogo';
import { 
  PROPOSAL_METADATA, 
  ISSUES, 
  RISKS, 
  SOLUTION_OVERVIEW, 
  PHASES,
  BOQ_DATA,
  ASSESSMENT_SUMMARY
} from './constants';
import { 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck, 
  Settings, 
  TrendingUp,
  ExternalLink,
  Cpu,
  Activity,
  ArrowRight,
  Camera,
  Lock,
  LayoutDashboard,
  Zap,
  CheckCircle,
  ListOrdered,
  Search,
  Filter,
  Network,
  Database,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('cover');
  const [boqSearch, setBoqSearch] = useState('');
  const [selectedBoqCategory, setSelectedBoqCategory] = useState<string>('All');

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
      const sections = ['cover', 'overview', 'issues', 'standards', 'solution', 'boq', 'implementation', 'benefits'];
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

  const riskData = [
    { name: 'Coverage Gaps', value: 85, color: '#ef4444' },
    { name: 'Old Hardware', value: 90, color: '#ef4444' },
    { name: 'SIRA Compliance', value: 100, color: '#dc2626' },
    { name: 'Network Health', value: 65, color: '#f59e0b' }
  ];

  const proposalString = JSON.stringify({ 
    PROPOSAL_METADATA, 
    DETAILED_CCTV_ASSESSMENT: ASSESSMENT_SUMMARY,
    CRITICAL_RISKS: RISKS, 
    SOLUTION_OVERVIEW, 
    PHASES,
    BILL_OF_QUANTITIES: BOQ_DATA 
  });

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
      
      <main className="flex-1 relative overflow-x-hidden">
        {/* Slide 1: Cover */}
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
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Prepared For</p>
                <p className="font-semibold text-slate-200">The Sustainable City</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Lead Engineer</p>
                <p className="font-semibold text-slate-200">Eng. Mosbah Rama</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Compliance</p>
                <p className="font-semibold text-slate-200">SIRA STR-2024</p>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Date Issued</p>
                <p className="font-semibold text-slate-200">Dec 2025</p>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2: Executive Overview */}
        <SectionWrapper id="overview" title="Executive Overview" subtitle="Modernizing ELV infrastructure for the smart city era.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-slate-300">
              <p>
                This proposal outlines the assessment and proposed modernization of the Extra-Low Voltage (ELV) infrastructure at <span className="text-emerald-400 font-semibold underline underline-offset-4">The Sustainable City (TSC)</span>.
              </p>
              <p>
                The assessment covers CCTV, Access Control (ACSS), ANPR, Gate Barriers, and the Central Control Room, conducted in accordance with <span className="font-mono text-sm bg-slate-800 px-2 py-1 rounded">SIRA STR-2024</span> requirements.
              </p>
              <p className="bg-slate-900 border-l-4 border-emerald-500 p-6 rounded-r-xl italic">
                "Our objective is to ensure full regulatory compliance, operational reliability, and enhanced situational awareness across the community."
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Activity size={120} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Cpu className="text-emerald-400" /> Current Tech Stack Components
              </h3>
              <ul className="space-y-4">
                {['CCTV Surveillance System', 'ANPR (Number Plate Recognition)', 'Access Control System (ACSS)', 'Gate Barriers & Access Systems', 'Central Control Room (CCR)', 'Network & Storage Redundancy'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* Updated Slide 3 & 5: Issues & Assessment Summary */}
        <SectionWrapper id="issues" title="Assessment Findings" subtitle="Detailed audit of existing CCTV and ELV systems vs SIRA requirements.">
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950/50 text-xs uppercase tracking-widest text-slate-400">
                      <tr>
                        <th className="px-6 py-4 font-bold">Area / System</th>
                        <th className="px-6 py-4 font-bold">Status / Observation</th>
                        <th className="px-6 py-4 font-bold">Technical Remarks</th>
                        <th className="px-6 py-4 font-bold">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                      {ASSESSMENT_SUMMARY.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-900 transition-colors group">
                          <td className="px-6 py-4 font-bold text-slate-200 w-1/5">{item.area}</td>
                          <td className="px-6 py-4 text-slate-400 w-1/5">{item.status}</td>
                          <td className="px-6 py-4 text-slate-500 leading-relaxed text-xs italic">{item.remarks}</td>
                          <td className="px-6 py-4 w-40">
                            <div className="flex flex-col gap-1">
                              <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold uppercase text-center">
                                {item.compliance}
                              </span>
                              <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                                <div className="bg-red-500 h-full w-[20%]"></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="text-red-500" /> Critical Gap Analysis
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskData} layout="vertical" margin={{ left: -20, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/20">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-red-500 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-red-200 mb-1">Retention Alert</h4>
                      <p className="text-xs text-red-400/80 leading-relaxed">
                        The current 16–30 day retention is a critical failure point. SIRA PS-02 strictly mandates 31 days of continuous recording for campus-scale environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Slide 6 & 7: Standards */}
        <SectionWrapper id="standards" title="Regulatory Framework" subtitle="Aligning with mandatory UAE and international standards.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'STR-CCTV-2024', title: 'CCTV Requirements', desc: 'Mandatory technical standards for image resolution and storage.', icon: <Camera className="text-emerald-400" /> },
              { id: 'STR-ANPR-2024', title: 'ANPR Compliance', desc: 'Rules for automated plate recognition and vehicle data logging.', icon: <ExternalLink className="text-emerald-400" /> },
              { id: 'STR-ACSS-2024', title: 'Access Control', desc: 'Encryption and audit trail requirements for security doors.', icon: <Lock className="text-emerald-400" /> },
              { id: 'SCCR-2024', title: 'Command Center', desc: 'Layout, redundancy, and ergonomics for control room ops.', icon: <LayoutDashboard className="text-emerald-400" /> },
              { id: 'UAE Fire Code', title: 'Life Safety (2024)', desc: 'Integration between ACSS and fire alarm systems for emergency exits.', icon: <Zap className="text-emerald-400" /> },
              { id: 'ISO 27001', title: 'Cybersecurity', desc: 'Information security management and data protection protocols.', icon: <ShieldCheck className="text-emerald-400" /> }
            ].map((std, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all hover:translate-y-[-4px] group">
                <div className="mb-4">{std.icon}</div>
                <h4 className="text-xs font-mono text-emerald-400 mb-1 tracking-widest">{std.id}</h4>
                <h3 className="text-xl font-bold mb-3">{std.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Slide 10: Proposed Solution */}
        <SectionWrapper id="solution" title="Modernization Solution" subtitle="Integrated, redundant, and smart-city-ready infrastructure.">
          <div className="space-y-12">
            <div className="bg-emerald-500/5 rounded-3xl p-10 border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Settings size={200} className="animate-spin-slow" />
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Strategy Pillars</h3>
                  <div className="space-y-6">
                    {[
                      { title: "Full SIRA Compliance", desc: "All systems designed to meet STR-2024 standards." },
                      { title: "Zero Blind Spots", desc: "Enhanced 2-8MP optics to cover 100% of plazas and roads." },
                      { title: "31-Day Retention", desc: "Redundant RAID 5/6 storage clusters for legal durability." },
                      { title: "Smart Integration", desc: "One dashboard for CCTV, ANPR, and Access Control." }
                    ].map((p, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                          <CheckCircle className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-100">{p.title}</h4>
                          <p className="text-slate-400 text-sm">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Device Specification Highlights</h4>
                  {SOLUTION_OVERVIEW.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between border border-white/5">
                      <div>
                        <p className="font-bold text-emerald-400 text-sm">{item.subSystem}</p>
                        <p className="text-xs text-slate-400">{item.specs}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* New BOQ Section */}
        <SectionWrapper id="boq" title="Bill of Quantities (BOQ)" subtitle="Detailed technical breakdown of proposed hardware and infrastructure.">
          <div className="space-y-8">
            {/* BOQ Header/Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                 { label: "CCTV Cameras", value: "237 Units", icon: <Camera className="text-emerald-400" /> },
                 { label: "Access Points", value: "96 Readers", icon: <Lock className="text-emerald-400" /> },
                 { label: "Backbone Fiber", value: "2.5 KM", icon: <Network className="text-emerald-400" /> },
                 { label: "Storage", value: "512 TB Raw", icon: <Database className="text-emerald-400" /> }
               ].map((card, i) => (
                 <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{card.label}</p>
                      <p className="text-xl font-bold">{card.value}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search BOQ items..." 
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  value={boqSearch}
                  onChange={(e) => setBoqSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedBoqCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedBoqCategory === cat 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* BOQ Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950/50 text-xs uppercase tracking-widest text-slate-500 font-bold">
                    <tr>
                      <th className="px-6 py-4">System Category</th>
                      <th className="px-6 py-4">Item Description</th>
                      <th className="px-6 py-4">Unit</th>
                      <th className="px-6 py-4 text-right">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-sm">
                    {filteredBOQ.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-mono px-2 py-1 bg-slate-800 text-slate-300 rounded uppercase">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 text-slate-500">{item.unit}</td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-slate-300">
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                    {filteredBOQ.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center text-slate-500">
                          <div className="flex flex-col items-center gap-2">
                             <Search size={32} className="opacity-20" />
                             <p>No items match your search criteria.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Slide 15: Implementation */}
        <SectionWrapper id="implementation" title="Implementation Roadmap" subtitle="A structured phased approach to minimize operational downtime.">
          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {PHASES.map((phase, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 text-emerald-400 text-sm font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl">{phase.name}</h3>
                    <span className="text-xs font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md">{phase.duration}</span>
                  </div>
                  <div className="space-y-3">
                    {phase.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex gap-3 text-sm">
                        <ArrowRight size={14} className="mt-1 text-slate-500 shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-300">{task.name}</span>
                          <p className="text-slate-500 text-xs">{task.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Slide 16 & 17: Benefits & Recommendation */}
        <SectionWrapper id="benefits" title="Final Recommendation" subtitle="Ensuring safety, efficiency, and future-readiness for TSC.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Projected Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Elimination of SIRA Fines",
                  "100% Coverage Confidence",
                  "Reduced Response Times",
                  "Automated Access Control",
                  "Higher Property Value",
                  "Lower Maintenance Costs"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <ShieldCheck className="text-emerald-500 shrink-0" size={18} />
                    <span className="text-sm font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-900 p-8 rounded-2xl border-t-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-4">Strategic Value</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  The proposed ELV modernization program ensures that <span className="text-slate-100">The Sustainable City</span> remains a leader in urban sustainability and security. By integrating advanced 8MP optics with enterprise-grade AI-ready storage, we provide a platform that is not just compliant for 2025, but ready for the smart city innovations of 2030 and beyond.
                </p>
                <button 
                   onClick={() => alert("Printing Full Technical Specs PDF...")}
                   className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <ExternalLink size={18} /> Download Detailed Technical Specs
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 p-1 rounded-3xl shadow-2xl shadow-emerald-900/20">
                <div className="bg-slate-950 p-10 rounded-[calc(1.5rem-2px)] text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} className="text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Ready for SIRA Approval?</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    This proposal is fully vetted for 2024 compliance. Contact our engineering team to finalize the Site Survey and begin Phase 1 deployment.
                  </p>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">Contact Representative</p>
                    <p className="text-xl font-bold text-slate-100">Eng. Mosbah Rama</p>
                    <p className="text-emerald-400 font-mono text-sm">JEET Integrated Technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <footer className="mt-20 py-12 border-t border-slate-900 flex flex-col items-center gap-6">
            <CompanyLogo className="opacity-50 grayscale hover:grayscale-0 transition-all cursor-default scale-110" />
            <div className="flex justify-between w-full max-w-6xl items-center text-slate-600 text-[10px] font-mono tracking-widest uppercase px-12">
              <div>© 2025 JEET INTEGRATED TECHNOLOGY</div>
              <div>STRICTLY CONFIDENTIAL - TSC DUBAI</div>
              <div>VERSION 1.0</div>
            </div>
          </footer>
        </SectionWrapper>
      </main>

      <AIConsultant proposalContent={proposalString} />

      {/* Persistent Navigation Bubble (Mobile/Floating) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex gap-2 bg-slate-900/80 backdrop-blur-lg border border-slate-800 p-2 rounded-full shadow-2xl">
         {['overview', 'issues', 'boq'].map(id => (
           <button 
             key={id}
             onClick={() => navigateTo(id)}
             className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${activeSection === id ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
           >
             {id}
           </button>
         ))}
      </div>
    </div>
  );
};

export default App;
