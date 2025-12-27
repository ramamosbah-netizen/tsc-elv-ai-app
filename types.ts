export interface Issue {
  area: string;
  issue: string;
  status: string;
  risk: 'High' | 'Medium' | 'Critical';
}

export interface AssessmentItem {
  area: string;
  qty: string;
  status: string;
  remarks: string;
  compliance: string;
}

export interface DetailedFinding {
  area: string;
  findings: string[];
  recommendations: string[];
}

export interface AccessControlSummary {
  location: string;
  qty: string;
  status: string;
  remarks: string;
}

export interface SolutionItem {
  subSystem: string;
  location: string;
  specs: string;
  compliance: string;
}

export interface ToBeSummaryItem {
  subSystem: string;
  location: string;
  specs: string;
  compliance: string;
}

export interface PhaseTask {
  id: string;
  name: string;
  duration: string;
  description: string;
}

export interface Phase {
  name: string;
  duration: string;
  tasks: PhaseTask[];
}

export interface Risk {
  category: string;
  effect: string;
  priority: 'High' | 'Medium' | 'Critical';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface BOQItem {
  category: string;
  description: string;
  unit: string;
  quantity: number;
  partNumber?: string;
  warranty?: string;
  technicalSpecs?: string[];
}

export interface SiraRequirement {
  feature: string;
  requirement: string;
}

export interface SiraComplianceGrid {
  area: string;
  required: string;
  existing: string;
  proposed: string;
}

export interface SiraComplianceMatrixRow {
  system: string;
  component: string;
  status: string;
  gap: string;
  action: string;
  compliance: string;
}

export interface TechnicalDrawing {
  id: string;
  title: string;
  type: 'As-Built' | 'To-Be' | 'Master Plan' | 'Layout';
  drawingNo: string;
  description: string;
  imageUrl: string;
  fileUrl?: string;
}