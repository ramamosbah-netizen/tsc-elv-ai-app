import React from 'react';
import { 
  ShieldCheck, 
  Camera, 
  Lock, 
  Zap, 
  LayoutDashboard, 
  Network, 
  Database,
  CheckCircle,
  AlertTriangle,
  Map,
  Clock,
  ListOrdered,
  FileCheck,
  Search,
  Sparkles,
  FileText
} from 'lucide-react';
import { Issue, SolutionItem, ToBeSummaryItem, Phase, Risk, BOQItem, AssessmentItem, AccessControlSummary, DetailedFinding, SiraRequirement, SiraComplianceGrid, SiraComplianceMatrixRow, TechnicalDrawing } from './types';

export const PROPOSAL_METADATA = {
  title: "CCTV & ELV Systems Upgrade Proposal",
  client: "The Sustainable City (TSC) – Dubai",
  preparedFor: "The Sustainable City",
  preparedBy: "Eng. Mosbah Rama",
  company: "JEET Integrated Technology",
  date: "December 2025",
  version: "V1.0"
};

export const TECHNICAL_DRAWINGS: TechnicalDrawing[] = [
  { 
    id: '1', 
    title: 'CCTV System Plaza Assessment', 
    type: 'As-Built', 
    drawingNo: 'P00-PLZ', 
    description: 'Comprehensive layout of current plaza camera locations and coverage arcs.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200' 
  },
  { 
    id: '2', 
    title: 'TSC Parking CCTV Master Plan', 
    type: 'Master Plan', 
    drawingNo: 'P00-PRK', 
    description: 'Proposed coverage strategy for all residential and visitor parking zones.',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '3', 
    title: 'Ring Road & Green Field CCTV', 
    type: 'Master Plan', 
    drawingNo: 'P00-RRD', 
    description: 'Perimeter security layout covering outer ring roads and landscaping areas.',
    imageUrl: 'https://images.unsplash.com/photo-1545143333-64859a5438e1?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '4', 
    title: 'Security Control Room Layout', 
    type: 'Layout', 
    drawingNo: 'P00-SCR', 
    description: 'Ergonomic design for the modernized central command station.',
    imageUrl: 'https://images.unsplash.com/photo-1558441138-b412bc510006?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '5', 
    title: 'Video Surveillance Schematic (TO-BE)', 
    type: 'To-Be', 
    drawingNo: 'P00-TBE', 
    description: 'Logical network architecture and connectivity for the proposed upgrade.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: '6', 
    title: 'Video Surveillance Schematic (AS-BUILT)', 
    type: 'As-Built', 
    drawingNo: 'P00-ASB', 
    description: 'Baseline network schematic of existing infrastructure for migration planning.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200'
  }
];

export const CCTV_SIRA_REQUIREMENTS: SiraRequirement[] = [
  { feature: "Cameras", requirement: "SIRA-approved IP cameras, 2–8MP, WDR 120 dB, full DORI compliance for detection, observation, recognition, and identification." },
  { feature: "Camera Placement", requirement: "Full coverage of plazas, corridors, lifts, rooftops, parking areas, ring roads, and critical zones; eliminate blind spots." },
  { feature: "ANPR Integration", requirement: "All entry/exit cameras integrated with ANPR system for automated vehicle recognition and centralized logging." },
  { feature: "Motion Detection", requirement: "Integrated with VMS for automated alerts; centralized event logging in control room." },
  { feature: "Recording & Storage", requirement: "Centralized NAS/SAN, RAID 5/6 redundancy, hot-swappable disks, dual-controller failover; minimum 90-day retention." },
  { feature: "Control Room Displays", requirement: "SIRA-approved professional monitors, 55″+, anti-burn-in, 24/7 operation, minimum 500 nits brightness." },
  { feature: "Operator Workstations", requirement: "Dual-monitor ergonomic workstations; full access to CCTV, ANPR, and motion camera feeds; real-time alerts and audit logging." },
  { feature: "Network & Redundancy", requirement: "PoE+ managed switches, VLAN isolation, Fiber backbone redundancy, UPS-backed for continuous operation." },
  { feature: "Audit & Logging", requirement: "Tamper-proof logs for all video access, playback, export, and configuration changes; stored ≥90 days." },
  { feature: "Cybersecurity", requirement: "VLAN segregation, firewalls, secure authentication per SIRA & ISO/IEC 27001 standards." },
  { feature: "Environmental Compliance", requirement: "Outdoor devices IP66/IK10-rated, operate reliably under UAE temperature/humidity conditions." }
];

export const CCTV_COMPLIANCE_GRID: SiraComplianceGrid[] = [
  { area: "Plaza Blocks", required: "100%", existing: "65%", proposed: "100%" },
  { area: "Parking", required: "100%", existing: "30%", proposed: "100%" },
  { area: "Ring Road", required: "100%", existing: "10%", proposed: "100%" },
  { area: "Entrances", required: "100%", existing: "70%", proposed: "100%" }
];

export const ACSS_SIRA_REQUIREMENTS: SiraRequirement[] = [
  { feature: "Readers & Doors", requirement: "Card, RFID, or biometric readers at all entrances, staircases, rooftops, ELV rooms, and shared facilities." },
  { feature: "Centralized Server", requirement: "Full integration with CCTV, ANPR, and Gate Barriers for real-time monitoring, reporting, and centralized logging." },
  { feature: "Visitor Management", requirement: "Pre-registration with QR code, OTP, or temporary RFID access; notifications integrated with residents/security." },
  { feature: "Automation & Safety", requirement: "Automated gates and barriers integrated with ANPR/RFID, audible/visual warnings, emergency override controls, and fail-safe mechanisms." },
  { feature: "Event Logging & Audit Trail", requirement: "Tamper-proof, timestamped logs for all access events, barrier operations, and emergency activations; retention ≥90 days." },
  { feature: "Emergency & Safety Features", requirement: "Break-glass emergency buttons, override controls, audible/visual alerts, and integration with fire/alarm systems." },
  { feature: "Access Hierarchy & Policies", requirement: "Configurable access levels for residents, staff, visitors, and service personnel; real-time revocation of credentials if needed." },
  { feature: "Network & Cybersecurity", requirement: "VLAN isolation, firewall protection, secure authentication, and integration with SIRA-approved network infrastructure." },
  { feature: "Environmental Compliance", requirement: "Devices rated for UAE temperature/humidity conditions and outdoor IP66/IK10 where applicable." },
  { feature: "Maintenance & Reliability", requirement: "Systems must include redundancy, failover, and scheduled preventive maintenance to ensure continuous 24/7 operation." }
];

export const NETWORK_SIRA_REQUIREMENTS: SiraRequirement[] = [
  { feature: "Network Architecture", requirement: "Fully managed Layer-3 network, VLAN segregation for CCTV, ACSS, ANPR, and other ELV systems; fibre backbone with ring redundancy." },
  { feature: "PoE & switching", requirement: "Enterprise-grade PoE+ switches for all IP devices; redundant uplinks and managed configuration." },
  { feature: "UPS & Power Redundancy", requirement: "UPS-backed power for all critical devices; redundant power supplies to ensure 24/7 operation." },
  { feature: "Control Room Design", requirement: "Ergonomic dual-monitor operator stations, full access to CCTV, ACSS, ANPR, and gate barriers." },
  { feature: "Video Wall", requirement: "SIRA-approved professional-grade displays, anti-burn-in, ≥55″, 24/7 operation, real-time monitoring of all zones." },
  { feature: "Storage & Retention", requirement: "Centralized NAS/SAN storage with RAID 5/6, dual-controller failover, ≥90-day retention, encrypted recordings." },
  { feature: "Audit & Logging", requirement: "Tamper-proof logs for all video, access, barrier events, and configuration changes; retention ≥90 days." },
  { feature: "Cybersecurity", requirement: "Firewalls, VLAN isolation, secure authentication, and SIRA-compliant cybersecurity measures (ISO/IEC 27001 aligned)." },
  { feature: "Environmental Compliance", requirement: "24/7 HVAC, fire-rated doors, secure racks, non-reflective lighting, silent operator environment; devices rated for UAE climate." },
  { feature: "Remote Monitoring & Reporting", requirement: "Support for secure remote monitoring, centralized alerts, and reporting for operational flexibility." },
  { feature: "Scalability & Redundancy", requirement: "Network and control room must support future expansion and high availability." }
];

export const SIRA_COMPLIANCE_MATRIX: SiraComplianceMatrixRow[] = [
  { system: "CCTV", component: "Control Room – Video Wall", status: "11 screens 55″ commercial TVs", gap: "Not SIRA-compliant; lacks 24/7 operation, anti-burn-in", action: "Replace with 55 - 75″ SIRA-approved screens; add 3 extra screens", compliance: "Non-compliant" },
  { system: "CCTV", component: "Operator Workstations", status: "Partial connection to NVRs and motion cameras", gap: "Insufficient monitoring; partial integration", action: "Install dual-monitor workstations; connect all NVRs, motion, and ANPR feeds", compliance: "Non-compliant" },
  { system: "CCTV", component: "NVR Recording & Storage", status: "16–30 days retention, 4.3 TB per NVR, no redundancy", gap: "Below SIRA 90-day retention; no redundancy", action: "Upgrade to centralized NAS/SAN with RAID, retention ≥90 days", compliance: "Non-compliant" },
  { system: "CCTV", component: "Motion Cameras", status: "Partially integrated", gap: "Alerts not centralized; no audit trail", action: "Connect all motion cameras; configure automated alerts and centralized logging", compliance: "Non-compliant" },
  { system: "CCTV", component: "ANPR Cameras", status: "Managed via laptop; partially integrated", gap: "Not centralized; no SIRA-compliant tracking", action: "Integrate with central VMS, operator workstations, and barriers; log all events", compliance: "Non-compliant" },
  { system: "CCTV", component: "Logging & Audit Trail", status: "Not implemented", gap: "No centralized, tamper-proof logs", action: "Implement SIRA-compliant logging; centralized, tamper-proof, ≥90 days retention", compliance: "Non-compliant" },
  { system: "Access Control", component: "Residential Blocks A–F", status: "Standalone locks or no system", gap: "No centralized monitoring, event logs, or emergency buttons", action: "Install centralized ACSS; integrate with CCTV and gate barriers; add emergency features", compliance: "Non-compliant" },
  { system: "Access Control", component: "Staircases, Roofs, ELV Rooms", status: "No system installed", gap: "No audit trail; non-compliant", action: "ACSS installation with logging, emergency buttons, and centralized monitoring", compliance: "Non-compliant" },
  { system: "Access Control", component: "Facilities (Pools, Gym, Dog Park, Stadiums)", status: "Standalone systems, partially working", gap: "Not integrated with CCTV; no logs; no emergency", action: "Upgrade to ACSS with CCTV integration, centralized logging, emergency buttons", compliance: "Non-compliant" },
  { system: "Access Control", component: "Road Main Entrance & Parking", status: "Barrier standalone, not integrated", gap: "No ACSS integration, no RFID, no logging, no safety warnings", action: "Upgrade barriers; integrate with ACSS, RFID, CCTV, centralized logging, safety alerts", compliance: "Non-compliant" },
  { system: "ANPR / Barriers", component: "Main Entrances", status: "Barrier aging; ANPR operational", gap: "Manual operation; partial automation", action: "Replace/repair gates; integrate fully with ANPR, RFID, central VMS; enable centralized logs", compliance: "Non-compliant" },
  { system: "ANPR / Barriers", component: "Secondary / Visitor Entrances", status: "Barriers partially functional; ANPR operational", gap: "Partial automation; no visitor management", action: "Repair/replace barriers; add RFID for residents; QR/OTP for visitors; integrate with VMS", compliance: "Non-compliant" },
  { system: "ANPR / Barriers", component: "Parking Clusters", status: "Mixed conditions: arms bent/damaged", gap: "Operational delays; maintenance issues; partial compliance", action: "Repair/replace gates; routine maintenance; integrate all ANPR and barrier events with VMS", compliance: "Non-compliant" },
  { system: "Network Backbone", component: "TSC", status: "VLAN segregation insufficient", gap: "VLAN segregation insufficient", action: "Needs redesign", compliance: "Partially Compliant" }
];

export const ASSESSMENT_SUMMARY: AssessmentItem[] = [
  { area: "Control Room (Storage / Retention)", status: "Recording system operational", remarks: "Retention period is 16–30 days vs. SIRA requirement of 31 days: insufficient storage capacity for full compliance", compliance: "Non-compliant" },
  { area: "Control Room (Displays & Workstations)", status: "Video wall and operator stations functional", remarks: "No centralized, tamper-proof logging for NVR/operator/ANPR events; lacks audit trail and event tracking", compliance: "Non-compliant" },
  { area: "Existing Cluster CCTV System", status: "407 cameras installed", remarks: "All clusters covered; partial coverage of plaza, parking and roads", compliance: "Non-compliant" },
  { area: "Plaza Coverage (Lifts / Corridors / Roofs)", status: "Cameras installed, coverage incomplete", remarks: "Multiple blind spots observed; critical areas not adequately monitored", compliance: "Non-compliant" },
  { area: "Plaza Facial Recognition", status: "ID cameras partially installed", remarks: "Several cameras non-functional; facial recognition currently unavailable", compliance: "Non-compliant" },
  { area: "Parking Clusters & Public Areas", status: "CCTV partially operational", remarks: "Large blind spots: many cameras aged, non-functional, or insufficient resolution for identification", compliance: "Non-compliant" },
  { area: "Ring Road Perimeter", status: "Cameras installed along perimeter", remarks: "Many cameras non-functional; intermittent network issues affecting live feed and recording reliability", compliance: "Non-compliant" },
  { area: "ANPR Integration", status: "Gate cameras operational", remarks: "Some ANPR cameras installed but not fully integrated; events not centrally logged; limited automation for access control", compliance: "Non-compliant" }
];

export const ACCESS_CONTROL_SUMMARY: AccessControlSummary[] = [
  { location: "Residential Blocks (A–F) – Entrances", status: "Standalone locks or no system installed", remarks: "No centralized monitoring; no event logging; emergency override buttons missing" },
  { location: "Residential Blocks – Staircases, Roofs, ELV Rooms", status: "No system installed", remarks: "No ACSS; no audit trail; no emergency provisions; non-compliant for critical internal areas" },
  { location: "Swimming Pools, Gym Hall, Dog Park", status: "Standalone systems; partial functionality", remarks: "Not integrated with CCTV; no event logs; emergency buttons missing; some devices malfunctioning" },
  { location: "Football & Basketball Stadiums", status: "Standalone systems; variable functionality", remarks: "No centralized monitoring; no logging; non-compliant" },
  { location: "Substation & Block F Service Rooms", status: "No system installed", remarks: "Critical infrastructure lacks ACSS, logging, and emergency controls" },
  { location: "Road Main Entrance & Parking (Gate Barriers)", status: "Barriers operational but standalone", remarks: "No ACSS integration; manual operation required; no RFID; no logging; no safety warnings" }
];

export const ISSUES: Issue[] = [
  { area: "Storage Capacity", issue: "Insufficient for 31-day retention", status: "Critical Failure", risk: "Critical" },
  { area: "Coverage Gaps", issue: "Plaza and Parking blind spots", status: "SIRA Risk", risk: "High" },
  { area: "System Lifecycle", issue: "Hardware obsolescence", status: "Hardware Obsolescence", risk: "High" },
  { area: "Control Room", issue: "Consumer-grade displays", status: "Non-compliant", risk: "High" }
];

export const RISKS: Risk[] = [
  { category: "Coverage gaps", effect: "Undetected incidents — legal/regulatory exposure", priority: "High" },
  { category: "Non-functional cameras", effect: "Reduced evidence capture & deterrence", priority: "High" },
  { category: "Retention shortfall", effect: "Non-compliance with SIRA / potential sanctions", priority: "Critical" },
  { category: "Network & UPS failure", effect: "Loss of continuous monitoring", priority: "High" }
];

export const SOLUTION_OVERVIEW: SolutionItem[] = [
  { subSystem: "CCTV Cameras", location: "Plaza, Parking, Ring Road, Lifts", specs: "2–8MP IP, WDR 110–120 dB, IP66/IK10", compliance: "Full DORI, integrated with VMS" },
  { subSystem: "ANPR Cameras", location: "Gate barriers, Ring Roads", specs: "4MP PTZ / Bullet, License Plate Capture", compliance: "Real-time recognition; central logs" },
  { subSystem: "Access Control", location: "Residential, ELV Rooms, Roofs", specs: "Card, RFID, Biometric", compliance: "Central ACSS; emergency override" },
  { subSystem: "Visitor Management", location: "Gate barriers", specs: "QR Code / OTP / Mobile NFC", compliance: "Temporary access; centralized audit" },
  { subSystem: "Storage", location: "Central Control Room", specs: "NAS/SAN, RAID 5/6, ≥31-day retention", compliance: "Redundant, encrypted, automated" },
  { subSystem: "Control Room", location: "Centralized Monitoring", specs: "Dual-monitor stations, video wall", compliance: "SCCR-2024, ergonomic" }
];

export const TO_BE_SUMMARY: ToBeSummaryItem[] = [
  { subSystem: "CCTV Cameras", location: "Plaza, Parking, Ring Road, Lifts, Roofs", specs: "2–8MP IP, WDR 110–120 dB, IP66/IK10", compliance: "Full DORI compliance, integrated with VMS & ANPR" },
  { subSystem: "ANPR Cameras", location: "Gate barriers, Ring Roads", specs: "4MP PTZ / Bullet, License Plate Capture", compliance: "Real-time recognition; centralized logging" },
  { subSystem: "Access Control", location: "Residential Blocks, ELV Rooms, Roofs", specs: "Card, RFID, Biometric", compliance: "Centralized ACSS; emergency override; full audit" },
  { subSystem: "Visitor Management", location: "Gate barriers", specs: "QR Code / OTP / Mobile NFC", compliance: "Temporary access; centralized logging" },
  { subSystem: "Storage", location: "Centralized Control Room", specs: "NAS/SAN, RAID 5/6, ≥90-day retention", compliance: "Redundant, encrypted, automated disk failure alerts" },
  { subSystem: "Network Backbone", location: "Campus-wide", specs: "Fiber + Cat6a, Layer-3 switches, VLAN", compliance: "Redundant paths, PoE+, SIRA-compliant segregation" },
  { subSystem: "Control Room", location: "Centralized Monitoring", specs: "Dual-monitor operator stations, video wall", compliance: "24/7 operation, tamper-proof logs, ergonomic" },
  { subSystem: "Power & UPS", location: "Control Room & Field Devices", specs: "UPS 3 kVA, redundant setup", compliance: "Continuous operation; redundant power supply" }
];

export const BOQ_DATA: BOQItem[] = [
  // Phase 1: Control Room
  { 
    category: "Phase 1: Control Room", 
    description: "Enterprise HDD Seagate Exos X20 20TB", 
    unit: "Unit", 
    quantity: 11,
    partNumber: "CCTV-SCR/1",
    warranty: "5 Years Limited Warranty",
    technicalSpecs: ["3.5\" SATA, 7200 RPM", "2.5M hours MTBF", "Designed for 24/7 surveillance workloads", "Up to 550TB/year workload rating"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "DELL PowerEdge 750xs 2U Rack Server", 
    unit: "Unit", 
    quantity: 1,
    partNumber: "CCTV-SCR/2",
    warranty: "3 Years ProSupport Next Business Day",
    technicalSpecs: ["Intel Xeon Silver 4310", "16 GB RAM", "1X 1.2TB SAS HDD", "Dual hot-plug redundant power supplies"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Central VMS – Hik Central Professional Base", 
    unit: "License", 
    quantity: 1,
    partNumber: "CCTV-SCR/3",
    warranty: "1 Year Software Assurance",
    technicalSpecs: ["P-VSS-300Ch/Base/Promo", "Supports unified management of CCTV, ACSS, and ANPR", "High-availability failover support", "Advanced map & alarm management"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Hik Central Professional Additional Camera Licenses", 
    unit: "License", 
    quantity: 300,
    partNumber: "CCTV-SCR/4",
    warranty: "Software Perpetual License",
    technicalSpecs: ["HikCentral-P-VSS-1Ch", "Per camera channel expansion", "Supports recording, live view, and playback"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Hik Central ACS Base Software", 
    unit: "License", 
    quantity: 1,
    partNumber: "CCTV-SCR/5",
    warranty: "Software Perpetual License",
    technicalSpecs: ["HikCentral-P-ACS-16Door/Base", "Centralized access control management", "Supports anti-passback and multi-door interlocking"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Video Wall Controller HIKVISION DS-6912UDI", 
    unit: "Unit", 
    quantity: 1,
    partNumber: "CCTV-SCR/8",
    warranty: "3 Years Standard Warranty",
    technicalSpecs: ["Supports HDMI/DVI inputs", "4K output resolution", "Matrix control and windowing", "Integrates up to 10 screens"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "HIKVISION DS-5055UC 4K Professional Screens", 
    unit: "Unit", 
    quantity: 10,
    partNumber: "CCTV-SCR/9",
    warranty: "3 Years 24/7 Commercial Warranty",
    technicalSpecs: ["55\" Narrow-Bezel Surveillance Screen", "Brightness ≥500 nits", "Anti-burn-in technology", "SIRA-compliant professional grade"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Operator Workstation (Desk + PC + Dual Monitors)", 
    unit: "Set", 
    quantity: 1,
    partNumber: "CCTV-SCR/10",
    warranty: "3 Years On-site Service",
    technicalSpecs: ["DELL Vostro i5, 16GB RAM, 512GB SSD", "Dual 27\" ASUS VA279HG Monitors", "PTZ Joystick controller included", "Ergonomic 24/7 desk design"]
  },
  { 
    category: "Phase 1: Control Room", 
    description: "Firewall Fortinet FG-60F", 
    unit: "Unit", 
    quantity: 1,
    partNumber: "CCTV-SCR/11",
    warranty: "1 Year FortiCare Support",
    technicalSpecs: ["FortiGate 60F", "10 x GE RJ45 ports", "Secure SD-WAN and NGFW capabilities", "Threat protection throughput up to 700 Mbps"]
  },

  // Phase 1/OPT: Optional
  { 
    category: "Optional AI & ANPR", 
    description: "NVR HIKVISION DS-9664NI-M Series 8K", 
    unit: "Unit", 
    quantity: 2,
    partNumber: "CCTV-SCR-OPT/15",
    warranty: "3 Years Manufacturer Warranty",
    technicalSpecs: ["64-Ch IP inputs", "H.265+ Compression", "RAID 0,1,5,6,10 support", "Up to 32MP decoding capacity"]
  },
  { 
    category: "Optional AI & ANPR", 
    description: "AI Face Recognition Module - HikCentral", 
    unit: "License", 
    quantity: 1,
    partNumber: "CCTV-SCR-OPT/16",
    warranty: "Software Perpetual License",
    technicalSpecs: ["Real-time recognition of human faces", "AcuSeek-4Ch/Module", "Database for VIP/Blacklist management"]
  },

  // Phase 2/A: Plaza
  { 
    category: "Phase 2/A: Plaza CCTV", 
    description: "Outdoor Bullet Camera Hikvision 4MP", 
    unit: "Nos", 
    quantity: 24,
    partNumber: "CCTV-PL/01",
    warranty: "3 Years Replacement Warranty",
    technicalSpecs: ["DS-2CD2043G2-I", "Fixed 2.8mm, IR 50m", "WDR 120dB, IP67, IK10", "SIRA Approved"]
  },
  { 
    category: "Phase 2/A: Plaza CCTV", 
    description: "HIKVISION ColorVu Turret Camera 4MP", 
    unit: "Nos", 
    quantity: 8,
    partNumber: "CCTV-PL/02",
    warranty: "3 Years Standard Warranty",
    technicalSpecs: ["DS-2CD2347G2-LU", "24/7 Color Imaging", "Strobe Light & Audio Alarm", "Face ID / Recognize support"]
  },

  // Phase 2/B: Ring Road
  { 
    category: "Phase 2/B: Ring Road CCTV", 
    description: "4MP Bullet Camera Hikvision (Ring Road)", 
    unit: "Nos", 
    quantity: 64,
    partNumber: "CCTV-RR/01",
    warranty: "3 Years Manufacturer Warranty",
    technicalSpecs: ["Resolution: 2560×1440", "Night Vision up to 30m IR", "IP66 rated weatherproof", "Includes brackets and mounting hardware"]
  },
  { 
    category: "Phase 2/B: Ring Road CCTV", 
    description: "16-Port Managed PoE Switch with Fiber", 
    unit: "Nos", 
    quantity: 5,
    partNumber: "CCTV-RR/02",
    warranty: "Limited Lifetime Warranty",
    technicalSpecs: ["Hikvision DS-3E0316P-E/M", "PoE budget 250W", "2 x SFP slots for 1G/10G fibre uplink", "SNMP, QoS, VLAN support"]
  },
  { 
    category: "Phase 2/B: Ring Road CCTV", 
    description: "6-Core Single-Mode Fiber Optic Cable", 
    unit: "meters", 
    quantity: 1000,
    partNumber: "CCTV-RR/07",
    warranty: "25 Years Performance Warranty",
    technicalSpecs: ["LC-LC connectors", "9/125 µm core", "LSZH Jacket", "Inter-building backbone connectivity"]
  },

  // Phase 2/C: Parking
  { 
    category: "Phase 2/C: Parking CCTV", 
    description: "4MP Bullet Camera Hikvision (Parking)", 
    unit: "Nos", 
    quantity: 77,
    partNumber: "CCTV-PR/01",
    warranty: "3 Years Standard Warranty",
    technicalSpecs: ["High resolution 2560x1440", "SIRA compliant for identification", "Advanced H.265+ encoding", "Pole mounting kits included"]
  },

  // Phase 2/D: Access Control
  { 
    category: "Phase 2/D: Access Control", 
    description: "4-Door Controller Panel (SIRA-approved)", 
    unit: "Nos", 
    quantity: 10,
    partNumber: "ACSS-01",
    warranty: "3 Years Replacement Warranty",
    technicalSpecs: ["TCP/IP Interface", "Expandable modular design", "Supports anti-passback and interlocking", "Offline storage for 100k events"]
  },
  { 
    category: "Phase 2/D: Access Control", 
    description: "RFID Reader (Card + PIN) Hikvision", 
    unit: "Nos", 
    quantity: 54,
    partNumber: "ACSS-04",
    warranty: "2 Years Standard Warranty",
    technicalSpecs: ["DS-K1107MK", "MIFARE 13.56 MHz", "IP65 Rated", "Wiegand/OSDP communication"]
  },
  { 
    category: "Phase 2/D: Access Control", 
    description: "Electromagnetic Locks (600 lbs) + Sensors", 
    unit: "Nos", 
    quantity: 58,
    partNumber: "ACSS-07",
    warranty: "5 Years Mechanical Warranty",
    technicalSpecs: ["Fail-safe operation", "Integrated door contact status", "Low current consumption", "Aluminum anodized housing"]
  },
  { 
    category: "Phase 2/D: Access Control", 
    description: "Emergency Break Glass Units (Resettable)", 
    unit: "Nos", 
    quantity: 54,
    partNumber: "ACSS-09",
    warranty: "Project Lifetime Warranty",
    technicalSpecs: ["Green color for access control", "Resettable key operation", "Protective hinged cover included", "DPDT switch for fire integration"]
  }
];

export const CCTV_DISTRIBUTION_CHART = [
  { name: 'Plaza Area', value: 32, fill: '#10b981' },
  { name: 'Parking Areas', value: 77, fill: '#0ea5e9' },
  { name: 'Ring Road Perimeter', value: 64, fill: '#f59e0b' },
  { name: 'Control Room/Other', value: 11, fill: '#8b5cf6' }
];

export const PHASES: Phase[] = [
  {
    name: "Phase 1: Control Room Core Setup & Pre-Migration",
    duration: "21 Days",
    tasks: [
      { id: "1-core", name: "Control Room Upgrade", duration: "7 Days", description: "Install video wall, operator workstations, and servers. Connect PoE switches and fiber backbone." },
      { id: "1-vms", name: "VMS & Storage Setup", duration: "5 Days", description: "Configure Central Hik Central VMS, integrate NAS/SAN storage with RAID 5, and commission 3kVA UPS." },
      { id: "1-infra", name: "Infrastructure/Cabling (A)", duration: "4 Days", description: "Install racks, cabling, and configure VLAN/Firewall policies." },
      { id: "1-test", name: "Testing & Commissioning (D)", duration: "5 Days", description: "SIRA-compliant testing, redundancy/failover checks, and storage retention verification." }
    ]
  },
  {
    name: "Phase 2: Field Installation & Controlled Migration",
    duration: "120 Days",
    tasks: [
      { id: "2a", name: "Plaza Area CCTV", duration: "30 Days", description: "Install 4MP mini domes and ColorVu bullet cameras. Connect and verify feeds in VMS." },
      { id: "2b", name: "Parking Area CCTV", duration: "30 Days", description: "Deploy bullet cameras in parking zones with night vision and ANPR integration." },
      { id: "2c", name: "Roads / Ring Road CCTV", duration: "30 Days", description: "Install high-res bullet cameras along ring roads using fiber optic backbone backbone." },
      { id: "2e", name: "Access Control (ACSS)", duration: "30 Days", description: "Install panels, card readers, EM locks, and emergency glass units for all designated doors." }
    ]
  },
  {
    name: "Phase 3: Finalization, Training & Handover",
    duration: "14 Days",
    tasks: [
      { id: "3a", name: "System Validation", duration: "7 Days", description: "End-to-end testing of CCTV, ACSS, and Gate Barriers in the new unified management environment." },
      { id: "3b", name: "Operator Training", duration: "7 Days", description: "On-site training for security staff on dashboards, ANPR logs, and visitor management workflows." }
    ]
  },
  {
    name: "Phase 4: Handover & Documentation",
    duration: "7 Days",
    tasks: [
      { id: "4-docs", name: "Documentation Delivery", duration: "4 Days", description: "Provide as-built drawings, operation manuals, and maintenance schedules." },
      { id: "4-fallback", name: "Rollback Readiness", duration: "3 Days", description: "Verification of manual fallback procedures and final system sign-off." }
    ]
  }
];

export const NAVIGATION = [
  { id: 'cover', label: 'Cover', icon: <ShieldCheck size={18} /> },
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'compliance', label: 'Regulatory Framework', icon: <FileCheck size={18} /> },
  { id: 'assessment', label: 'As-Is Assessment', icon: <Search size={18} /> },
  { id: 'solution', label: 'Solution', icon: <Camera size={18} /> },
  { id: 'visualizer', label: 'AI Visualizer', icon: <Sparkles size={18} /> },
  { id: 'boq', label: 'BOQ', icon: <ListOrdered size={18} /> },
  { id: 'reference', label: 'Technical Reference', icon: <FileText size={18} /> },
  { id: 'implementation', label: 'Implementation', icon: <Clock size={18} /> },
  { id: 'benefits', label: 'Benefits', icon: <CheckCircle size={18} /> }
];