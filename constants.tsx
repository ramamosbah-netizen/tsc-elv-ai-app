
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
  ListOrdered
} from 'lucide-react';
import { Issue, SolutionItem, Phase, Risk, BOQItem, AssessmentItem } from './types';

export const PROPOSAL_METADATA = {
  title: "CCTV & ELV Systems Upgrade Proposal",
  client: "The Sustainable City (TSC) – Dubai",
  preparedFor: "The Sustainable City",
  preparedBy: "Eng. Mosbah Rama",
  company: "JEET Integrated Technology",
  date: "December 2025",
  version: "V1.0"
};

export const ASSESSMENT_SUMMARY: AssessmentItem[] = [
  { 
    area: "Control Room (Storage / Retention)", 
    status: "Recording system operational", 
    remarks: "Retention period is 16–30 days vs. SIRA requirement of 31 days: insufficient storage capacity for full compliance", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Control Room (Displays & Workstations)", 
    status: "Video wall and operator stations functional", 
    remarks: "No centralized, tamper-proof logging for NVR/operator/ANPR events; lacks audit trail and event tracking", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Existing Cluster CCTV System", 
    status: "407 cameras installed", 
    remarks: "All clusters covered; partial coverage of plaza, parking and roads", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Plaza Coverage (Lifts / Corridors / Roofs)", 
    status: "Cameras installed, coverage incomplete", 
    remarks: "Multiple blind spots observed; critical areas not adequately monitored", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Plaza Facial Recognition", 
    status: "ID cameras partially installed", 
    remarks: "Several cameras non-functional; facial recognition currently unavailable", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Parking Clusters & Public Areas", 
    status: "CCTV partially operational", 
    remarks: "Large blind spots: many cameras aged, non-functional, or insufficient resolution for identification", 
    compliance: "Non-compliant" 
  },
  { 
    area: "Ring Road Perimeter", 
    status: "Cameras installed along perimeter", 
    remarks: "Many cameras non-functional; intermittent network issues affecting live feed and recording reliability", 
    compliance: "Non-compliant" 
  },
  { 
    area: "ANPR Integration", 
    status: "Gate cameras operational", 
    remarks: "Some ANPR cameras installed but not fully integrated; events not centrally logged; limited automation for access control", 
    compliance: "Non-compliant" 
  }
];

export const ISSUES: Issue[] = [
  { area: "Plaza (8 Blocks) - Annex A", issue: "Samsung cameras failing; blind spots", status: "Non-functional", risk: "High" },
  { area: "Plaza Coverage", issue: "Entrances, corridors, lifts partially monitored", status: "Incomplete", risk: "High" },
  { area: "Residential & Public Parking - Annex B", issue: "Partially non-functional; corners and stairways uncovered", status: "Failing", risk: "High" },
  { area: "Ring Road Perimeter - Annex C", issue: "Partial coverage; some offline", status: "Critical Gaps", risk: "High" },
  { area: "Network Backbone", issue: "Limited fibre connectivity", status: "Outdated", risk: "Medium" },
  { area: "Control Room - Annex D", issue: "Consumer TVs being used for professional monitoring", status: "Substandard", risk: "High" },
  { area: "Storage Retention", issue: "16–30 days retention capacity", status: "Non-compliant", risk: "Critical" },
  { area: "Logging & Ops", issue: "No centralized tamper-proof logs; limited workstations", status: "Manual", risk: "High" }
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

export const BOQ_DATA: BOQItem[] = [
  // CCTV System
  { category: "CCTV System", description: "8MP 4K IP Dome Camera with AI Analytics", unit: "Nos", quantity: 120 },
  { category: "CCTV System", description: "4MP IP Bullet Camera (WDR 120dB) - Perimeter", unit: "Nos", quantity: 85 },
  { category: "CCTV System", description: "2MP IP Lift Cameras - Wide Angle", unit: "Nos", quantity: 32 },
  { category: "CCTV System", description: "Enterprise VMS License (Per Channel)", unit: "Nos", quantity: 237 },
  
  // ANPR & Barriers
  { category: "ANPR & Vehicle Access", description: "4MP ANPR License Plate Capture Camera", unit: "Nos", quantity: 12 },
  { category: "ANPR & Vehicle Access", description: "High-Speed Gate Barriers (3.5m Arm)", unit: "Nos", quantity: 8 },
  { category: "ANPR & Vehicle Access", description: "Inductive Loop Detectors & Sensors", unit: "Set", quantity: 8 },
  
  // Access Control
  { category: "Access Control", description: "IP-Based Multi-Door ACSS Controller", unit: "Nos", quantity: 24 },
  { category: "Access Control", description: "Multi-Tech RFID/Bluetooth Readers", unit: "Nos", quantity: 96 },
  { category: "Access Control", description: "Electro-Magnetic Locks (600lbs)", unit: "Nos", quantity: 96 },
  { category: "Access Control", description: "Break Glass Units (Emergency)", unit: "Nos", quantity: 48 },
  
  // Control Room & Infrastructure
  { category: "Control Room", description: "55\" LED Professional Video Wall Display", unit: "Nos", quantity: 9 },
  { category: "Control Room", description: "High-Performance Workstation (Dual GPU)", unit: "Nos", quantity: 4 },
  { category: "Control Room", description: "Enterprise Storage Server (RAID 6, 256TB Raw)", unit: "Nos", quantity: 2 },
  { category: "Control Room", description: "Online Double Conversion UPS (10kVA)", unit: "Nos", quantity: 2 },
  
  // Network
  { category: "Network Backbone", description: "Layer 3 24-Port PoE+ Managed Switch", unit: "Nos", quantity: 18 },
  { category: "Network Backbone", description: "Cat6a LSZH Data Cable (305m Roll)", unit: "Rolls", quantity: 45 },
  { category: "Network Backbone", description: "Single-Mode Fiber Optic Cable (12 Core)", unit: "Mtrs", quantity: 2500 }
];

export const PHASES: Phase[] = [
  {
    name: "Phase 1: Control Room Setup",
    duration: "14 Days",
    tasks: [
      { id: "1a", name: "Infrastructure & Cabling", duration: "5 Days", description: "Structured cabling for control center" },
      { id: "1b", name: "Server & VMS Setup", duration: "5 Days", description: "VMS server installation and software config" },
      { id: "1c", name: "Video Wall", duration: "5 Days", description: "Installation of professional display matrix" }
    ]
  },
  {
    name: "Phase 2: Field Installation",
    duration: "120 Days",
    tasks: [
      { id: "2a", name: "CCTV Plaza", duration: "30 Days", description: "Deployment across 8 blocks" },
      { id: "2b", name: "CCTV Ring Road", duration: "30 Days", description: "Perimeter and road coverage" },
      { id: "2c", name: "CCTV Parking", duration: "30 Days", description: "Public and residential coverage" },
      { id: "2e", name: "Access Control", duration: "30 Days", description: "RFID and biometric reader installation" }
    ]
  },
  {
    name: "Phase 3: Integration & Testing",
    duration: "14 Days",
    tasks: [
      { id: "3", name: "FAT/SAT", duration: "14 Days", description: "Factory and Site Acceptance Testing" }
    ]
  }
];

export const NAVIGATION = [
  { id: 'cover', label: 'Cover', icon: <ShieldCheck size={18} /> },
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { id: 'issues', label: 'Issues', icon: <AlertTriangle size={18} /> },
  { id: 'standards', label: 'Standards', icon: <ShieldCheck size={18} /> },
  { id: 'solution', label: 'Solution', icon: <Camera size={18} /> },
  { id: 'boq', label: 'BOQ', icon: <ListOrdered size={18} /> },
  { id: 'implementation', label: 'Implementation', icon: <Clock size={18} /> },
  { id: 'benefits', label: 'Benefits', icon: <CheckCircle size={18} /> }
];
